import React, { useState, useEffect, useRef } from "react";
import "./mistyles.css";
import api from "../api/Api";
import moment from "moment";
import ExcelJS from "exceljs"

const XemBaoCaoTheoPhongTheoThang = (props) => {
  const [table, setTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [bills, setBills] = useState([]);
  const [kindOfRoom, setKindOfRoom] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getBills();
        await getKindOfRoom();
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
  const getKindOfRoom = async () => {
    const kindOfRoom = await api.getAllKindOfRoom();
    setKindOfRoom(kindOfRoom);
  };
  useEffect(() => {
    getKindOfRoom();
    updateTable();
  }, [bills], [kindOfRoom])

  const updateTable = async () => {
    const revenueTable = [];
    
    bills.forEach(async (bill) => {
        kindOfRoom.forEach((item)=> {
            // Kiểm tra nếu bill.donGia là một phần tử trong mảng donGiaArray
            if (item.donGia === bill.donGia) {
                bill.tenLoaiPhong = item.tenLoaiPhong;
                  // Dừng vòng lặp khi tìm thấy giá trị phù hợp
            }
        });
          if (bill.ngayLap?.startsWith(selectedMonth)) {
            revenueTable.push({
              tenLoaiPhong: bill.tenLoaiPhong,
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
        const { tenLoaiPhong, tienTT } =
          item;

        if (!revenueSummary[tenLoaiPhong]) {
          revenueSummary[tenLoaiPhong] = {
            tenLoaiPhong: item.tenLoaiPhong,
            soLuotThuePhong: 0,
            tienTT: 0,
            tyLe: 0,
          };
        }

        revenueSummary[tenLoaiPhong].soLuotThuePhong += 1;
        revenueSummary[tenLoaiPhong].tienTT += tienTT;
        revenueSummary[tenLoaiPhong].tyLe =
          (revenueSummary[tenLoaiPhong].tienTT * 100) / tongDoanhThu;
        revenueSummary[tenLoaiPhong].tyLe = parseFloat(
          revenueSummary[tenLoaiPhong].tyLe.toFixed(1)
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
      { header: "Loại phòng", key: "tenLoaiPhong", width: 30 },
      { header: "Số lượt thuê phòng", key: "soLuotThuePhong", width: 20, },
      { header: "Doanh thu", key: "tienTT", width: 20 },
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
        loaiPhong: item?.loaiPhong,
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
        anchor.download = "Báo cáo theo chi nhánh " + moment(new Date(selectedMonth)).format("MM/YYYY") + ".xlsx";
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
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table class="table" >
        <thead style={{ verticalAlign: "middle" }}>
          <tr class="table-secondary">
            <th>STT</th>
            <th>Tên loại phòng</th>
            <th>Số lượt thuê phòng</th>
            <th>Doanh thu</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.tenLoaiPhong}</td>
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

export default XemBaoCaoTheoPhongTheoThang;
