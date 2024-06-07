import React, { useState, useEffect, useRef, useContext } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";
import ExcelJS from "exceljs"

const XemBaoCaoCPKSTheoThang = (props) => {
  const { user } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );

  const [totalExpenses, setTotalExpenses] = useState();
  const [materials, setMaterials] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(
    user?.Loai === "ChuHeThong" ? "Tất cả" : user?.chinhanh
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.Loai === "ChuHeThong") await getBranches();

        await getMaterials();
        CHAMCONG.current = await Api.getDocs(
          "/StaffManagement/getAll/ChamCong"
        );
        updateTable();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getBranches = async () => {
    const branches = await Api.getAllBranchs();
    setBranches([{ tenChiNhanh: "Tất cả" }, ...branches]);
  };



  const getMaterials = async () => {
    const branches = await Api.getAllBranchs();
    const materials = await Api.getAllMaterials()
    if (user?.Loai !== 'ChuHeThong') {
      const fil = materials.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setMaterials(fil);
    }
    else {
      const fil = materials.filter((item) => item.chiNhanh === branches[0].tenChiNhanh);
      setMaterials(fil);
    }
  };

  const updateTable = async () => {
    if (user?.Loai === "ChuHeThong") {
      await getMaterials();
    }

    const salaries = await calSalary();
    const totalSalaryExpense = salaries.reduce((sum, salary) => {
      return sum + parseInt(salary.TongLuong);
    }, 0);

    const totalMaterialExpense = materials.current.reduce((sum, material) => {
      if (material.ngayNhap.startsWith(selectedMonth)) {
        return (
          sum + parseInt(material.donGiaNhap) * parseInt(material.soLuongNhap)
        );
      }
      return sum;
    }, 0);

    const totalExpenses =
      totalMaterialExpense + totalSalaryExpense;
    const expenseTable = [
      {
        tenChiPhi: "Tiền vật tư thiết bị",
        soTien: totalMaterialExpense,
        tyLe: parseFloat(
          ((totalMaterialExpense * 100) / totalExpenses).toFixed(1)
        ),
      },
      {
        tenChiPhi: "Tiền lương nhân viên",
        soTien: totalSalaryExpense,
        tyLe: parseFloat(
          ((totalSalaryExpense * 100) / totalExpenses).toFixed(1)
        ),
      },
    ];
    setTable(expenseTable);
    setTotalExpenses(totalExpenses);
  };

  const CHAMCONG = useRef();

  const calSalary = async () => {
    const parsedDate = moment(selectedMonth, "YYYY-MM");
    const selectedyear = parsedDate.format("YYYY");
    const selectedmonth = parsedDate.format("M");

    const isFilterBranch =
      user?.Loai === "ChuHeThong" && selectedBranch === "Tất cả";

    const currentWorkTimesTable = CHAMCONG.current.find(
      (item) =>
        item.Thang == selectedmonth &&
        item.Nam == selectedyear &&
        (!isFilterBranch ? item.ChiNhanh === selectedBranch : 1)
    );
    //console.log(currentWorkTimesTable);
    if (currentWorkTimesTable) {
      const totalHoursPerEmployee = [];
      Object.keys(currentWorkTimesTable)
        .filter(
          (key) =>
            key !== "Thang" && key !== "Nam" && key != "Id" && key != "ChiNhanh"
        )
        .forEach((date) => {
          currentWorkTimesTable[date].forEach((employee) => {
            const { MaNV, TenNV, SoGioLam } = employee;

            const existingEmployee = totalHoursPerEmployee.find(
              (item) => item.MaNV === MaNV
            );

            if (!existingEmployee) {
              totalHoursPerEmployee.push({
                MaNV,
                TenNV,
                SoGioLam: parseInt(SoGioLam),
              });
            } else {
              existingEmployee.SoGioLam += parseInt(SoGioLam);
            }
          });
        });

      const staffs = await Api.getAllStaffs();
      const bonuses = await Api.getDocs("/StaffManagement/getAll/LuongThuong");
      bonuses.filter(
        (item) => item.Thang == selectedmonth && item.Nam == selectedyear
      );
      const result = totalHoursPerEmployee
        .map((employee) => {
          const { MaNV, TenNV, SoGioLam } = employee;
          const employeeInfo = staffs.find((e) => e.maNhanVien === MaNV);

          if (employeeInfo) {
            const bonus = bonuses.filter(
              (item) =>
                item.LoaiNhanVien === "Tất cả" ||
                item.LoaiNhanVien === employeeInfo.chucVu ||
                item.MaNV === MaNV
            );
            const totalBonus = bonus.reduce(
              (sum, bonus) => sum + parseInt(bonus.Tien),
              0
            );
            return {
              ...employee,
              LuongGio: employeeInfo.luongCoBan,
              LuongThuong: totalBonus,
              TongLuong:
                parseInt(employeeInfo.luongCoBan) * parseInt(SoGioLam) +
                parseInt(totalBonus),
            };
          }
          return null;
        })
        .filter(Boolean);
      return result;
    } else return [];
  };
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo");
    sheet.columns = [
      { header: "Tên chi phí", key: "tenChiPhi", width: 20 },
      { header: "Số tiền đã chi trả", key: "soTien", width: 20 },
      { header: "Tỷ lệ", key: "tyLe", width: 20, }
    ];
    sheet.getRow(1).font = { bold: true }
    for (let i = 1; i <= 3; i++) {
      if (i !== 2)
        sheet.getColumn(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    }
    sheet.getColumn(2).numFmt = '#,##0'
    sheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    const promise = Promise.all(table.map((item, index) => {
      sheet.addRow({
        tenChiPhi: item?.tenChiPhi,
        soTien: item?.soTien,
        tyLe: item?.tyLe,
      })
    })
    );
    promise.then(() => {
      sheet.addRow({
        tenChiPhi: "",
        soTien: totalExpenses,
        tyLe: "",
      })
      sheet.getCell('B' + (table.length + 2)).font = { bold: true }
      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "Báo cáo theo chi phí phòng khám " + moment(new Date(selectedMonth)).format("MM/YYYY") + " của " + (selectedBranch === "Tất cả" ? "tất cả chi nhánh" : selectedBranch) + ".xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    })
  }

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
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}>
              Xuất Excel
              <i className="fa fa-download ms-2"></i>
            </button>
            <button
              type="submit"
              className="btn pb-2 pt-2 mb-3"
              style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
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
      <table class="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr class="table-secondary">
            <th>Tên chi phí</th>
            <th>Số tiền đã chi trả</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              <td>{item.tenChiPhi}</td>
              <td>{new Intl.NumberFormat("en-DE").format(
                item.soTien
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
          Tổng chi phí: {totalExpenses ? new Intl.NumberFormat("en-DE").format(totalExpenses) : null}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoCPKSTheoThang;
