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
  const [slTonKho, setSLTonKho] = useState([]);
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

  const handleDeleteRow = async (targetIndex) => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa lịch sư hư này không?');
    if (shouldDelete) {
      await api.deleteDamagedMaterial(damagedMaterial[targetIndex].Id);

      setDamagedMaterial(damagedMaterial.filter((_, idx) => idx !== targetIndex));

      const result = materials.filter((item1, idx) => item1.maCSVC === damagedMaterial[targetIndex].maCSVC);
      if (result.length > 0) {
        const ton = parseInt(result[0].slTon) + parseInt(damagedMaterial[targetIndex].slHu);
        const updatedMaterials = materials.map((item, idx) => {
          if (item.maCSVC !== damagedMaterial[targetIndex].maCSVC) return item;
          return { ...item, slTon: ton.toString() };
        });
        setMaterials(updatedMaterials);
        await api.updateMaterial({ slTon: ton.toString() }, result[0].Id);
        //onSearch()
      }
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
    setSLTonKho(materials.find(item => item.maCSVC === damagedMaterial[idx].maCSVC)?.slTon)
  };

  const checkError = () => {
    if (parseInt(searchCriteria.slnDau) >= parseInt(searchCriteria.slnCuoi)) {
      alert("Số lượng nhập 'Từ' phải nhỏ hơn 'Đến'");
      return false;
    }
    
    if (searchCriteria.ngayDau && searchCriteria.ngayCuoi && searchCriteria.ngayCuoi <= searchCriteria.ngayDau) {
      alert("Ngày nhập 'Từ' phải nhỏ hơn ngày nhập 'Đến'");
      return false;
    }
    return true;
  }

  const handleSubmit = async (newRow) => {
    if (rowToEdit == null) {
      if (user?.Loai === 'ChuHeThong') {
        const id = await api.addDamagedMaterial(newRow);
        newRow.Id = id.docId;
        onSearch()
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
      await api.updateDamagedMaterial(newRow, newRow.Id);
      const updateDamagedMaterial = [...damagedMaterial];
      updateDamagedMaterial[rowToEdit] = newRow;
      setDamagedMaterial(updateDamagedMaterial);

      const result = materials.filter((item1, idx) => item1.maCSVC === newRow.maCSVC);
      if (result.length > 0) {
        const previousSlHu = parseInt(damagedMaterial[rowToEdit].slHu);
        const nhapDifference = parseInt(newRow.slHu) - previousSlHu;
        const updatedMaterials = materials.map((item, idx) => {
          if (item.maCSVC !== newRow.maCSVC) return item;
          const newSlTon = parseInt(item.slTon) - nhapDifference;
          return { ...item, slTon: newSlTon.toString() };
        });
        setMaterials(updatedMaterials);
        await api.updateMaterial(updatedMaterials.find(material => material.maCSVC === newRow.maCSVC), result[0].Id);
      }
    }
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onSearch = async () => {
    if (checkError()) {
    console.log(searchCriteria)

    const searchResults = await api.getDamagedMaterialBySearch(searchCriteria);
    console.log(searchResults);
    if (user?.Loai !== 'ChuHeThong') {
      const fil = searchResults.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setDamagedMaterial(fil);
    }
    else {
      setDamagedMaterial(searchResults)
    }
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
            slTonKho={slTonKho}
          />
        )
      }
    </div >
  );
}
export default QuanLyCSVCHu;