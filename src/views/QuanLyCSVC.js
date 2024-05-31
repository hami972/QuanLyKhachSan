import React from 'react'
import './mistyles.css'
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FormCSVC } from '../components/FormCSVC';
import { useEffect, useState, useContext } from 'react';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'

const QuanLyCSVC = (props) => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [branches, setBranches] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    maCSVC: '',
    tenCSVC: '',
    slNhap: '',
    slTonKho: '',
    chiNhanh: '',
  })

  useEffect(() => {
    getMaterials();
    getBranches()
  }, []);
  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches([{ tenChiNhanh: "Tất cả" }, ...branches]);
  };

  const getMaterials = async () => {
    const materials = await api.getAllMaterials()
    if (user?.Loai !== 'ChuHeThong') {
      const fil = materials.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setMaterials(fil);
    }
    else {
      setMaterials(materials)
    }
  }

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa vật tư thiết bị này không?');
    if (shouldDelete) {
      setMaterials(materials.filter((_, idx) => idx !== targetIndex));
      api.deleteMaterial(materials[targetIndex].Id);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    console.log(newRow);
    if (rowToEdit == null) {
      if (user?.Loai === 'ChuHeThong') {
        const id = await api.addMaterial(newRow);
        newRow.Id = id;
        setMaterials([...materials, newRow]);
      }
      else {
        const id = await api.addMaterial({ ...newRow, chiNhanh: user?.chinhanh });
        newRow.Id = id;
        setMaterials([...materials, newRow]);
      }

    }
    else {
      api.updateMaterial(newRow, newRow.Id);
      let updatedMaterials = materials.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      })
      setMaterials(updatedMaterials);
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    console.log(searchCriteria)

    const searchResults = await api.getMaterialsBySeacrh(searchCriteria);
    console.log(searchResults);
    if (user?.Loai !== 'ChuHeThong') {
      const fil = searchResults.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setMaterials(fil);
    }
    else {
      setMaterials(searchResults)
    }
  }
  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-lg-4 col-md-6'>
            <input
              className="form-control pb-2 pt-2 mb-2"
              type="text"
              id="maVatTu"
              placeholder="Mã CSVC"
              name="maVatTu"
              onChange={handleChange}
            />
          </div>
          <div className='col-lg-4 col-md-6'>
            <input
              className="form-control pb-2 pt-2 mb-2"
              type="text"
              id="tenVatTu"
              placeholder="Tên CSVC"
              name="tenVatTu"
              onChange={handleChange}
            />
          </div>
        </div>
        <table className='container-fluid'>
          <tr>
            <td>
              <b>Số lượng nhập</b>
            </td>
            <td>
              <div div className='row'>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Từ</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="number"
                    placeholder="0"
                    name="slnDau"
                    onChange={handleChange}
                  />
                </div>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Đến</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="number"
                    placeholder="1000000000"
                    name="slnCuoi"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <b>Số lượng tồn kho: </b>
            </td>
            <td>
              <div div className='row'>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Từ</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="number"
                    placeholder="0"
                    name="sltkDau"
                    onChange={handleChange}
                  />
                </div>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Đến</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="number"
                    placeholder="1000000000"
                    name="sltkCuoi"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <b>Chi nhánh: </b>
            </td>
            <td>
              <div className='col-lg-5 col-md-8'>
                <select
                  className="form-select pb-2 pt-2 mt-2"
                  id="type"
                  name="chiNhanh"
                  onChange={handleChange}
                >
                  {user?.Loai === 'ChuHeThong' ? branches.map((item, index) => (
                    <option key={index} value={item.tenChiNhanh}>
                      {item.tenChiNhanh}
                    </option>
                  )) :
                    <option value={user?.chinhanh}>
                      {user?.chinhanh}
                    </option>
                  }
                </select>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <button
        type="submit"
        className="btn pb-2 pt-2 mb-3 me-3 mt-3"
        style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
        onClick={onSearch}
      >
        Tìm kiếm
      </button>
      <button
        onClick={() => setModalOpen(true)}
        className="btn pb-2 pt-2 mb-3 me-3 mt-3"
        style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
      >
        Thêm
      </button>

      <div className="text-end">
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>Mã CSVC</th>
            <th>Tên CSVC</th>
            <th>Số lượng nhập</th>
            <th>Số lượng tồn kho</th>
            <th></th>
          </tr>
        </thead>
        {materials.map((row, idx) => {
          return (
            <tr key={row.Id}>
              <td>{row.maVatTu}</td>
              <td>{row.tenVatTu}</td>
              <td>{row.soLuongNhap}</td>
              <td>{row.soLuongTonKho}</td>
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
        <tbody></tbody>
      </table>
      {
        modalOpen && (
          <FormCSVC
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && materials[rowToEdit]}
            branches={branches}
          />
        )
      }
    </div >
  );
}
export default QuanLyCSVC;