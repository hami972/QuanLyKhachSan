import React, { useState, useEffect, useRef } from "react";
import "./mistyles.css";
import api from "../api/Api";
import moment from "moment";
import ExcelJS from "exceljs"

const XemBaoCaoChiNhanhTheoNam = (props) => {
  const [table, setTable] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    moment().format("YYYY")
  );
  const [bills, setBills] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getBills();
        updateTable();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getBills = async () => {
    const billsFromDb = await api.getAllBills();
    setBills(billsFromDb);
  };
  
  useEffect(() => {
    updateTable();
  }, [bills])

  const updateTable = async () => {
    const revenueTable = [];
    bills.forEach(async (bill) => {
          if (bill.ngayLap?.startsWith(selectedYear)) {
            revenueTable.push({
              chiNhanh: bill.chiNhanh,
              soLuotThuePhong: 1,
              tienTT: parseInt(bill.ThanhTienSauGiamGia),
            });
          }
        });

      const revenueSummary = {};

      const tongDoanhThu = revenueTable.reduce(
        (total, row) => total + row.tienTT,
        0
      );
      revenueTable.forEach((item) => {
        const { chiNhanh, tienTT } =
          item;

        if (!revenueSummary[chiNhanh]) {
          revenueSummary[chiNhanh] = {
            chiNhanh: chiNhanh,
            soLuotThuePhong: 0,
            tienTT: 0,
            tyLe: 0,
          };
        }

        revenueSummary[chiNhanh].soLuotThuePhong += 1;
        revenueSummary[chiNhanh].tienTT += tienTT;
        revenueSummary[chiNhanh].tyLe =
          (revenueSummary[chiNhanh].tienTT * 100) / tongDoanhThu;
        revenueSummary[chiNhanh].tyLe = parseFloat(
          revenueSummary[chiNhanh].tyLe.toFixed(1)
        );
      });

      // Chuyển đối tượng thành mảng
      const result = Object.values(revenueSummary);
      console.log(result);

      setTable(result);
      setTotalRevenue(tongDoanhThu);
    
  };
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo");
    sheet.columns = [
      { header: "STT", key: "stt", width: 10 },
      { header: "Chi nhánh", key: "chiNhanh", width: 30 },
      { header: "Số lượt thuê phòng", key: "soLuongCaThucHien", width: 20, },
      { header: "Doanh thu", key: "doanhThu", width: 20 },
      { header: "Tỉ lệ(%)", key: "tyLe", width: 20 },
    ];
    sheet.getRow(1).font = { bold: true }
    for (let i = 1; i <= 7; i++) {
      if (i !== 6)
        sheet.getColumn(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    }
    sheet.getColumn(6).numFmt = '#,##0'
    sheet.getCell('F1').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    const promise = Promise.all(table.map((item, index) => {
      sheet.addRow({
        stt: index + 1,
        chiNhanh: item?.chiNhanh,
        soLuotThuePhong: item?.soLuotThuePhong,
        tienTT: item?.tienTT,
        tyLe: item?.tyLe,
      })
    })
    );
    promise.then(() => {
      sheet.addRow({
        stt: "",
        soLuotThuePhong: "",
        doanhThu: totalRevenue,
        tyLe: "",
      })
      sheet.getCell('F' + (table.length + 2)).font = { bold: true }
      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "Báo cáo theo chi nhánh " + moment(new Date(selectedYear)).format("MM/YYYY") + ".xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="mb-2">
            <b>Chọn tháng, năm</b>
          </div>
          <input
            type="number"
            min="2010"
            max="2024"
            step="1"
            value={selectedYear}
            id="year"
            placeholder="Chọn năm bắt đầu"
            name="year"
            onChange={(e) => setSelectedYear(e.target.value)}
            className="form-control pb-2 pt-2 mb-3"
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
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table class="table" >
        <thead style={{ verticalAlign: "middle" }}>
          <tr class="table-secondary">
            <th>STT</th>
            <th>Chi nhánh</th>
            <th>Số lượt thuê phòng</th>
            <th>Doanh thu</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.chiNhanh}</td>
              <td>{item.soLuotThuePhong}</td>
              <td>{new Intl.NumberFormat("en-DE").format(
                item.tienTT
              )}</td>
              <td>{new Intl.NumberFormat("en-DE").format(
                item.tyLe
              )}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h1 class="noteVND" style={{ fontWeight: "bold", fontSize: "17px" }}>
          Tổng doanh thu: {totalRevenue ? new Intl.NumberFormat("en-DE").format(totalRevenue) : null}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoChiNhanhTheoNam;
