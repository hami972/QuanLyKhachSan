import React, { useState, useEffect, useContext } from "react";
import "./mistyles.css";
import Api from "../api/Api";
import moment from "moment";
import { AuthContext } from "../hook/AuthProvider";

const XemBaoCaoCPKSTheoNam = () => {
  const { user } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY-MM"));
  const [totalExpenses, setTotalExpenses] = useState('282000000');
  const [branches, setBranches] = useState([]);
  const [cphd, setCPHD] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(
    user?.Loai === "ChuHeThong" ? "Tất cả" : user?.chinhanh
  );

  useEffect(() => {
    getCPHD();
    getBranches();
  }, []);

  const getBranches = async () => {
    const branches = await Api.getAllBranchs();
    setBranches([{ tenChiNhanh: "Tất cả" }, ...branches]);
  };

  const getCPHD = async () => {
    const cphdData = await Api.getCPHD();
    const correctCphdData = Array.isArray(cphdData) ? cphdData : [];
    setCPHD(correctCphdData);
  };

  const handleExport = () => {
    // Hàm xử lý xuất Excel
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
            <th>Tên chi phí</th>
            <th>Số tiền đã chi trả</th>
            <th>Tỷ lệ (%)</th>
          </tr>
        </thead>
        <tbody>
        {cphd.map((item, index) => (
              <tr>
                <td>{item.luongnhanvien}</td>
                <td>{new Intl.NumberFormat("en-DE").format(item.tienluongnhanvien)}</td>
                <td>{Math.round(parseInt(item.tienluongnhanvien)/parseInt(totalExpenses)*100).toFixed(1)}</td>
              </tr>
          ))}
        {cphd.map((item, index) => (
                <tr>
                <td>{item.CSVC}</td>
                <td>{new Intl.NumberFormat("en-DE").format(item.tienCSVC)}</td>
                <td>{Math.round(parseInt(item.tienCSVC)/parseInt(totalExpenses)*100).toFixed(1)}</td> 
              </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h1 className="noteVND" style={{ fontWeight: "bold", fontSize: "17px" }}>
          Tổng chi phí: {totalExpenses ? new Intl.NumberFormat("en-DE").format(totalExpenses) : null}
        </h1>
      </div>
    </div>
  );
};

export default XemBaoCaoCPKSTheoNam;
