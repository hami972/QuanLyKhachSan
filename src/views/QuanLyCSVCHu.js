import React from 'react'
import './mistyles.css'
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FormCSVCHu } from '../components/FormCSVCHu';
import { useEffect, useState, useContext } from 'react';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'

const QuanLyCSVCHu = (props) => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [damagedMaterial, setDamagedMaterial] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [branches, setBranches] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    maCSVC: '',
    tenCSVC: '',
    slnDau: '',
    slnCuoi: '',
    ngayDau: '',
    ngayCuoi: '',
    chiNhanh: '',
  })

  useEffect(() => {
    getDamagedMaterial();
    getBranches();
    getMaterials();
  }, []);
  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches(branches);
  };

  const getDamagedMaterial = async () => {
    const branches = await api.getAllBranchs();
    const damagedMaterial = await api.getAllDamagedMaterial()
    if (user?.Loai !== 'ChuHeThong') {
      const fil = damagedMaterial.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setDamagedMaterial(fil);
    }
    else {
      const fil = damagedMaterial.filter((item) => item.chiNhanh === branches[0].tenChiNhanh);
      setDamagedMaterial(fil);
    }
  }

  const getMaterials = async () => {
    const materials = await api.getAllMaterials()
    if (user?.Loai !== 'ChuHeThong') {
      const fil = materials.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setMaterials(fil);
    }
    else {
      setMaterials(materials);
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
    if (rowToEdit == null) {
      if (user?.Loai === 'ChuHeThong') {
        const id = await api.addDamagedMaterial(newRow);
        newRow.Id = id.docId;
        getDamagedMaterial();
      }
      else {
        const id = await api.addDamagedMaterial({ ...newRow, chiNhanh: user.chinhanh });
        newRow.Id = id.docId;
        setDamagedMaterial([newRow, ...damagedMaterial]);
      }
      const result = materials.filter((item1, idx) => item1.maCSVC === newRow.maCSVC)
      let ton = parseInt(result[0].slTon) - parseInt(newRow.slHu)
      let updated2 = materials.map((item, idx) => {
        if (item.maCSVC !== newRow.maCSVC) return item;
        return { ...item, slTon: ton.toString() };
      })
      setMaterials(updated2)
      await api.updateMaterial({ slTon: ton.toString() }, result[0].Id)
    }
    else {
      //await api.updateMaterialUsed(newRow, newRow.Id);
      //let updated = materialsUsed.map((currRow, idx) => {
      //if (idx !== rowToEdit) return currRow;
      //return newRow;
      //})
      //const result = materials.filter((item1, idx) => item1.maVatTu === newRow.maVatTu)
      //let x = parseInt(khoiphucSL) - parseInt(newRow.SL)
      //console.log('x' + x)
      //let updated2 = materials.map((item, idx) => {
      //if (item.maVatTu !== newRow.maVatTu) return item;
      //return { ...item, soLuongTonKho: x };
      //})
      //setMaterials(updated2)
      //await api.updateMaterial({ soLuongTonKho: x.toString() }, result[0].Id)
      //setMaterialUsed(updated)
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    console.log(searchCriteria)

    const searchResults = await api.getMaterialsBySearch(searchCriteria);
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
    <div >
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
              <b>Số lượng</b>
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
              <b>Ngày nhập:</b>
            </td>
            <td>
              <div className='row'>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Từ</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="date"
                    name="ngayDau"
                    onChange={handleChange}
                  />
                </div>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Đến</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="date"
                    name="ngayCuoi"
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
        onClick={onSearch}
        style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
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
            <th>Số lượng hư</th>
            <th>Ngày ghi nhận</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {damagedMaterial.map((row, idx) => {
            return (
              <tr key={row.Id}>
                <td>{row.maCSVC}</td>
                <td>{row.tenCSVC}</td>
                <td>{row.slHu}</td>
                <td>{moment(new Date(row.ngayGhiNhan)).format("DD/MM/YYYY")}</td>
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
      {
        modalOpen && (
          <FormCSVCHu
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && damagedMaterial[rowToEdit]}
            branches={branches}
            materials={materials}
          />
        )
      }
    </div >
  );
}
export default QuanLyCSVCHu;