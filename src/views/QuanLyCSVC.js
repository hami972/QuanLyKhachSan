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
    slnDau: '',
    slnCuoi: '',
    sltkDau: '',
    sltkCuoi: '',
    chiNhanh: '',
  })

  useEffect(() => {
    getMaterials();
    getBranches()
  }, []);
  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches(branches);
  };

  const getMaterials = async () => {
    const branches = await api.getAllBranchs();
    const materials = await api.getAllMaterials()
    if (user?.Loai !== 'ChuHeThong') {
      const fil = materials.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setMaterials(fil);
    }
    else {
      const fil = materials.filter((item) => item.chiNhanh === branches[0].tenChiNhanh);
      setMaterials(fil);
      setSearchCriteria({ ...searchCriteria, chiNhanh: branches[0].tenChiNhanh })
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
        onSearch()
      }
      else {
        const id = await api.addMaterial({ ...newRow, chiNhanh: user?.chinhanh });
        newRow.Id = id;
        setMaterials([...materials, newRow]);
      }

    }
    else {
      await api.updateMaterial(newRow, newRow.Id);
      onSearch()
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });

  };

  const checkError = () => {
    if (parseInt(searchCriteria.slnDau) >= parseInt(searchCriteria.slnCuoi)) {
      alert("Số lượng nhập 'Từ' phải nhỏ hơn 'Đến'");
      return false;
    }
    if (parseInt(searchCriteria.sltkDau) >= parseInt(searchCriteria.sltkCuoi)) {
      alert("Số lượng tồn kho 'Từ' phải nhỏ hơn 'Đến'");
      return false;
    }
    if (parseInt(searchCriteria.slnCuoi) < parseInt(searchCriteria.sltkDau)) {
      alert("Số lượng tồn kho phải nhỏ hơn hoặc bằng số lượng nhập");
      return false;
    }
    return true;
  }

  const onSearch = async () => {

    if (checkError()) {
      console.log(searchCriteria);
      const searchResults = await api.getMaterialsBySearch(searchCriteria);
      console.log(searchResults);
      if (user?.Loai !== 'ChuHeThong') {
        const fil = searchResults.filter((item, idx) => item.chiNhanh === user?.chinhanh);
        setMaterials(fil);
      }
      else {
        setMaterials(searchResults);
      }
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
              id="maCSVC"
              placeholder="Mã CSVC"
              name="maCSVC"
              onChange={handleChange}
            />
          </div>
          <div className='col-lg-4 col-md-6'>
            <input
              className="form-control pb-2 pt-2 mb-2"
              type="text"
              id="tenCSVC"
              placeholder="Tên CSVC"
              name="tenCSVC"
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
                    min={1}
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
                    min={1}
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
                    min={1}
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
                    min={1}
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
      <div className="text-end">
        <button
          type="submit"
          className="btn pb-2 pt-2 me-2 mt-3 "
          style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
          onClick={onSearch}
        >
          Tìm kiếm
        </button>
        <button
          onClick={() => setModalOpen(true)}
          className="btn pb-2 pt-2 mt-3"
          style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
        >
          Thêm
        </button>
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
              <td>{row.maCSVC}</td>
              <td>{row.tenCSVC}</td>
              <td>{row.slNhap}</td>
              <td>{row.slTon}</td>
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
            existingMaterials={materials}
          />
        )
      }
    </div >
  );
}
export default QuanLyCSVC;