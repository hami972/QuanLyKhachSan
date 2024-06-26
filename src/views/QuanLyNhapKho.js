import React from 'react'
import './mistyles.css'
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FormNhapKho } from '../components/FormNhapKho.js';
import { useEffect, useState, useContext } from 'react';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'

const QuanLyNhapKho = (props) => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [receivingStock, setReceivingStock] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [branches, setBranches] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    maCSVC: '',
    tenCSVC: '',
    slnDau: '',
    slnCuoi: '',
    giaNhapDau: '',
    giaNhapCuoi: '',
    ngayDau: '',
    ngayCuoi: '',
    chiNhanh: '',
  })

  useEffect(() => {
    getReceivingStocks();
    getBranches();
    getMaterials();
  }, []);
  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches(branches);
  };

  const getReceivingStocks = async () => {
    const branches = await api.getAllBranchs();
    const receivingStock = await api.getAllReceivingStock()
    if (user?.Loai !== 'ChuHeThong') {
      const fil = receivingStock.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setReceivingStock(fil);
    }
    else {
      const fil = receivingStock.filter((item) => item.chiNhanh === branches[0].tenChiNhanh);
      setReceivingStock(fil);
      setSearchCriteria({ ...searchCriteria, chiNhanh: branches[0].tenChiNhanh })
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
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa lịch sử nhập kho này không?');
    if (shouldDelete) {
      await api.deleteReceivingStock(receivingStock[targetIndex].Id);

      setReceivingStock(receivingStock.filter((_, idx) => idx !== targetIndex));

      const result = materials.filter((item1, idx) => item1.maCSVC === receivingStock[targetIndex].maCSVC);
      if (result.length > 0) {
        const nhap = parseInt(result[0].slNhap) - parseInt(receivingStock[targetIndex].slNhap);
        const ton = parseInt(result[0].slTon) - parseInt(receivingStock[targetIndex].slNhap);
        const updatedMaterials = materials.map((item, idx) => {
          if (item.maCSVC !== receivingStock[targetIndex].maCSVC) return item;
          return { ...item, slNhap: nhap.toString(), slTon: ton.toString() };
        });
        setMaterials(updatedMaterials);
        await api.updateMaterial({ slNhap: nhap.toString(), slTon: ton.toString() }, result[0].Id);
        //onSearch()
      }
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit == null) {
      if (user?.Loai === 'ChuHeThong') {
        const id = await api.addReceivingStock(newRow);
        newRow.Id = id.docId;
        onSearch()
      }
      else {
        const id = await api.addReceivingStock({ ...newRow, chiNhanh: user.chinhanh });
        newRow.Id = id.docId;
        setReceivingStock([newRow, ...receivingStock]);
      }
      const result = materials.filter((item1, idx) => item1.maCSVC === newRow.maCSVC)
      let nhap = parseInt(result[0].slNhap) + parseInt(newRow.slNhap)
      let ton = parseInt(result[0].slTon) + parseInt(newRow.slNhap)
      let updated2 = materials.map((item, idx) => {
        if (item.maCSVC !== newRow.maCSVC) return item;
        return { ...item, slNhap: nhap.toString(), slTon: ton.toString() };
      })
      setMaterials(updated2)
      await api.updateMaterial({ slNhap: nhap.toString(), slTon: ton.toString() }, result[0].Id)
    }
    else {
      await api.updateReceivingStock(newRow, newRow.Id);
      const updatedReceivingStock = [...receivingStock];
      updatedReceivingStock[rowToEdit] = newRow;
      setReceivingStock(updatedReceivingStock);

      const result = materials.filter((item1, idx) => item1.maCSVC === newRow.maCSVC);
      if (result.length > 0) {
        const previousSlNhap = parseInt(receivingStock[rowToEdit].slNhap);
        const nhapDifference = parseInt(newRow.slNhap) - previousSlNhap;
        const updatedMaterials = materials.map((item, idx) => {
          if (item.maCSVC !== newRow.maCSVC) return item;
          const newSlNhap = parseInt(item.slNhap) + nhapDifference;
          const newSlTon = parseInt(item.slTon) + nhapDifference;
          return { ...item, slNhap: newSlNhap.toString(), slTon: newSlTon.toString() };
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

      const searchResults = await api.getReceivingStockBySearch(searchCriteria);
      console.log(searchResults);
      if (user?.Loai !== 'ChuHeThong') {
        const fil = searchResults.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        setReceivingStock(fil);
      }
      else {
        setReceivingStock(searchResults)
      }
    }
  }

  const checkError = () => {
    if (parseInt(searchCriteria.slnDau) >= parseInt(searchCriteria.slnCuoi)) {
      alert("Số lượng nhập 'Từ' phải nhỏ hơn 'Đến'");
      return false;
    }
    if (parseInt(searchCriteria.giaNhapDau) >= parseInt(searchCriteria.giaNhapCuoi)) {
      alert("Giá nhập 'Từ' phải nhỏ hơn 'Đến'");
      return false;
    }
    if (searchCriteria.ngayDau && searchCriteria.ngayCuoi && searchCriteria.ngayCuoi <= searchCriteria.ngayDau) {
      alert("Ngày nhập 'Từ' phải nhỏ hơn ngày nhập 'Đến'");
      return false;
    }
    return true;
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
              <b>Giá nhập:</b>
            </td>
            <td>
              <div className='row'>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Từ</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="number"
                    placeholder="0"
                    name="giaNhapDau"
                    onChange={handleChange}
                    min={1}
                  />
                </div>
                <div className='col-lg-4 col-md-6'>
                  <text style={{ fontWeight: 600 }}>Đến</text>
                  <input
                    className="form-control pb-2 pt-2 mb-2"
                    type="number"
                    placeholder="1000000000"
                    name="giaNhapCuoi"
                    onChange={handleChange}
                    min={1}
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

      <div className="text-end mt-2">
        <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>Mã CSVC</th>
            <th>Tên CSVC</th>
            <th>Số lượng nhập</th>
            <th>Đơn giá nhập</th>
            <th>Ngày nhập</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {receivingStock.map((row, idx) => {
            return (
              <tr key={row.Id}>
                <td>{row.maCSVC}</td>
                <td>{row.tenCSVC}</td>
                <td>{row.slNhap}</td>
                <td>{new Intl.NumberFormat("en-DE").format(row.giaNhap)}</td>
                <td>{moment(new Date(row.ngayNhap)).format("DD/MM/YYYY")}</td>
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
          <FormNhapKho
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && receivingStock[rowToEdit]}
            branches={branches}
            materials={materials}
          />
        )
      }
    </div >
  );
}
export default QuanLyNhapKho;