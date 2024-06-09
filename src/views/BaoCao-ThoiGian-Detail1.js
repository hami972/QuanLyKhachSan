import React, { useState, useEffect, useRef, useContext } from "react";
import "./mistyles.css";
import api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";
import ExcelJS from "exceljs";

const XemBaoCaoTheoThang = (props) => {
  const { user } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [bills, setBills] = useState([]);
  // const bills = useRef([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(
    user?.Loai === "ChuHeThong" ? "Tất cả" : user?.chinhanh
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.Loai === "ChuHeThong") await getBranches();
        await getBills();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBranch, selectedMonth]);

  const getBills = async () => {
    const billsFromDb = await api.getAllBills();
    setBills(billsFromDb);
  };

  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches([{ tenChiNhanh: "Tất cả" }, ...branches]);
  };

  useEffect(() => {
    updateTable();
  }, [bills])

  const updateTable = () => {
    const revenueTable = [];
    if (bills.length !== 0) {
      bills.forEach((bill) => {
        if (bill.tinhTrang === "Đã thanh toán") {
            if (bill.ngayLap?.startsWith(selectedMonth)) {
              revenueTable.push({
                ngay: bill.ngayLap,
                soLuotThuePhong: 1,
                tienTT: parseInt(bill.ThanhTienSauGiamGia),
              });
            }
        }
      });

      const revenueSummary = {};
      const tongDoanhThu = revenueTable.reduce(
        (total, row) => total + row.tienTT,
        0
      );
      revenueTable.forEach((item) => {
        const { ngay, tienTT } = item;
        if (!revenueSummary[ngay]) {
          revenueSummary[ngay] = {
            ngay: ngay,
            soLuotThuePhong: 0,
            tienTT: 0,
            tyLe: 0,
          };
        }

        revenueSummary[ngay].soLuotThuePhong += 1;
        revenueSummary[ngay].tienTT += tienTT;
        revenueSummary[ngay].tyLe =
          (revenueSummary[ngay].tienTT * 100) / tongDoanhThu;
        revenueSummary[ngay].tyLe = parseFloat(
          revenueSummary[ngay].tyLe.toFixed(1)
        );
      });

      const result = Object.values(revenueSummary);
      setTable(result);
      setTotalRevenue(tongDoanhThu);
    } else {
      setTable([]);
      setTotalRevenue(0);
    }
  };

  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo");
    sheet.columns = [
      { header: "Ngày", key: "ngay", width: 20 },
      { header: "Số lượt thuê phòng", key: "soLuotThuePhong", width: 20 },
      { header: "Doanh thu", key: "doanhThu", width: 20 },
      { header: "Tỉ lệ(%)", key: "tyLe", width: 20 },
    ];
    sheet.getRow(1).font = { bold: true };
    for (let i = 1; i <= 4; i++) {
      sheet.getColumn(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }
    sheet.getColumn(4).numFmt = '#,##0';
    sheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    const promise = Promise.all(table.map((item) => {
      sheet.addRow({
        ngay: moment(new Date(item.ngay)).format("DD/MM/YYYY"),
        soLuotThuePhong: item.soLuotThuePhong,
        tienTT: item.tienTT,
        tyLe: item.tyLe,
      });
    }));
    promise.then(() => {
      sheet.addRow({
        ngay: "",
        soLuotThuePhong: "",
        doanhThu: totalRevenue,
        tyLe: "",
      });
      sheet.getCell('D' + (table.length + 2)).font = { bold: true };
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `Báo cáo ${moment(new Date(selectedMonth)).format("MM/YYYY")} của ${(selectedBranch === "Tất cả" ? "tất cả chi nhánh" : selectedBranch)}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-5 col-md-8">
          <div className="mb-2">
            <b>Chi nhánh</b>
          </div>
          <select
            className="form-select pb-2 pt-2 mb-3"
            id="type"
            name="chiNhanh"
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            {user?.Loai === "ChuHeThong" ? (
              branches.map((item, index) => (
                <option key={index} value={item.tenChiNhanh}>
                  {item.tenChiNhanh}
                </option>
              ))
            ) : (
              <option value={user?.chinhanh}>{user?.chinhanh}</option>
            )}
          </select>
        </div>

        <div className="col-md-4">
          <div className="mb-2">
            <b>Chọn tháng, năm</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            type="month"
            id="month"
            placeholder="Chọn tháng năm"
            name="month"
            max={moment().format("YYYY-MM")}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <div className="text-end">
            <button onClick={handleExport}
              className="btn pb-2 pt-2 mb-3 me-3"
              style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>
              Xuất Excel
              <i className="fa fa-download ms-2"></i>
            </button>
            <button
              type="submit"
              className="btn pb-2 pt-2 mb-3"
              style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
              onClick={updateTable}
            >
              Xem
            </button>
          </div>
        </div>
      </div>
      <div className="text-end">
        <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>Ngày</th>
            <th>Số lượt thuê phòng</th>
            <th>Doanh thu</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{moment(new Date(item.ngay)).format("DD/MM/YYYY")}</td>
              <td>{item.soLuotThuePhong}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.tienTT)}</td>
              <td>{new Intl.NumberFormat("en-DE").format(item.tyLe)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h1 className="noteVND" style={{ fontWeight: "bold", fontSize: "17px" }}>
          Tổng doanh thu: {totalRevenue ? new Intl.NumberFormat("en-DE").format(totalRevenue) : null}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoTheoThang;
