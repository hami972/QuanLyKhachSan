import React, { useState, useEffect, useContext } from 'react'
import './mistyles.css'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import moment from 'moment';


const QuanLyKhoDaSuDung = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [chuaSuDungThietBi, setchuaSuDungThietBi] = useState([
    {
      maThietBi: '001',
      tenThietBi: 'Giường 1m6',
      slNhapThietBi: '3',
      giaThietBi: '700000',
  },
  {
      maThietBi: '002',
      tenThietBi: 'Giường 1m4',
      slNhapThietBi: '3',
      giaThietBi: '500000',
  },
  {
      maThietBi: '002',
      tenThietBi: 'Giường 1m8',
      slNhapThietBi: '3',
      giaThietBi: '800000',
  },
  ]);
  
  const [rowToEdit, setRowToEdit] = useState(null);
  const [branches, setBranches] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    maThietBi: '',
    tenThietBi: '',
    slNhapThietBi: '',
    giaThietBi: '',
  })

  // useEffect(() => {
  //   getchuaSuDungThietBi();
  //   getBranches();
  // }, []);
  const getBranches = async () => {

    setBranches([{ tenChiNhanh: "Tất cả" }, ...branches]);
  };
  const getchuaSuDungThietBi = async () => {
    
  }

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa thiết bị này không?');
    if (shouldDelete) {
      setchuaSuDungThietBi(chuaSuDungThietBi.filter((_, idx) => idx !== targetIndex));

    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    

    
  };

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  // const onSearch = async () => {
  //   console.log(searchCriteria)

  //   console.log();
  //   if (user?.Loai !== 'ChuHeThong') {
      
  //   }
  //   else {
  //     setchuaSuDungThietBi()
  //   }
  // }
  return (
    <div>
      
      <button
        type="submit"
        className="btn pb-2 pt-2 mb-3 me-3 mt-3"
        style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
        //onClick={onSearch}
      >
        Tìm kiếm
      </button>
      <button
        onClick={() => setModalOpen(true)}
        className="btn pb-2 pt-2 mb-3 mt-3"
        style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
      >
        Thêm
      </button>

      <div className='text-end'>
        <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>Mã thiết bị</th>
            <th>Tên thiết bị</th>
            <th>Số lượng nhập</th>
            <th>Giá thiết bị</th>
            <th></th>
          </tr>
        </thead>
        {chuaSuDungThietBi.map((row, idx) => {
          return (
            <tr key={row.Id}>
              <td>{row.maThietBi}</td>
              <td>{row.tenThietBi}</td>
              <td>{row.slNhapThietBi}</td>
              <td>{row.giaThietBi}</td>
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
      
    </div>
  );
}
export default QuanLyKhoDaSuDung;