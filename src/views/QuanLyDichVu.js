import React from "react";
import "./mistyles.css";
import { useEffect, useState } from "react";
import { FormMaGiamGia } from "../components/FormMaGiamGia";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from "../api/Api";
import moment from "moment";
import {FormDichVu} from "../components/FormDichVu"

const QuanLyDichVu = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [washingMachine, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    date: "",
  });

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa không?'
    );
    if (shouldDelete) {
      setRows(washingMachine.filter((_, idx) => idx !== targetIndex));
      api.deleteWashingMachine(washingMachine[targetIndex].Id);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit == null) {
      const id = await api.addWashingMachine(newRow);
      newRow.Id = id;
      setRows([...washingMachine, newRow]);
    } else {
      api.updateWashingMachine(newRow, newRow.Id);
      let updateWashingMachine = washingMachine.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
      setRows(updateWashingMachine);
    }
  };

  const getWashingMachine = async () => {
    const washingMachine = await api.getWashingMachine();
    setRows(washingMachine);
  };

  const onSearch = async () => {
    const searchResults = await api.getWashingMachineUsedBySearch(searchCriteria);
    setRows(searchResults);
  };

  const handleChange = (e) => {
    getWashingMachine();
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getWashingMachine();
  }, []);

  return (
    <div>
      <div className="row">
      <div className="col-lg-4 col-md-8">
        <div className="mb-2"><b>Thời gian</b></div>
        <input
          className="form-control pb-2 pt-2 mb-2"
          type="date"
          name="date"
          value={searchCriteria.date}
          onChange={handleChange}
          
        />
      </div>
        <div className="text-end">
          <button
            onClick={onSearch}
            className="btn pb-2 pt-2 mt-3 mb-3 me-3"
            style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>
            Tìm kiếm
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="btn pb-2 pt-2 mt-3 mb-3"
            style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>
            Thêm
          </button>
        </div>
      </div>
      <div className="text-end">
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>số điện thoại</th>
            <th>Email</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Máy</th>
            <th>Giá tiền</th>
            <th>Tình trạng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {washingMachine.map((row, idx) => {
            return (
              <tr key={row.Id}>
                <td>{idx + 1}</td>
                <td>{row.TenKhachHang}</td>
                <td>{row.SDT}</td>
                <td>{row.email}</td>
                <td>{row.date}</td>
                <td>{row.Gio}</td>
                <td>{row.name}</td>
                <td>{row.giaTien}</td>
                <td>{row.tinhTrang}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => handleDeleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => handleEditRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalOpen && (
        <FormDichVu
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && washingMachine[rowToEdit]}
          washingMachine={washingMachine}
        />
      )}
    </div>
  );
};
export default QuanLyDichVu;
