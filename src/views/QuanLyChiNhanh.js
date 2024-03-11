import React from 'react'
import './mistyles.css'
import { useEffect, useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route,Switch } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormChiNhanh } from '../components/FormChiNhanh';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
const QuanLyChiNhanh= (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [chinhanh, setRows] = useState([
        {
            maChiNhanh: '001',
            tenChiNhanh: 'Chi nhánh Thủ Đức',
            diaChi: 'khu phố 6, Linh Trung, Thủ Đức,HCM',
            soLuongPhong: '78',
        },
        {
            maChiNhanh: '002',
            tenChiNhanh: 'Chi nhánh Quận 8',
            diaChi: 'Huỳnh Tấn Phát, Quận 8, HCM',
            soLuongPhong: '5',
        },
        {
            maChiNhanh: '003',
            tenChiNhanh: 'Chi nhánh Quận 7',
            diaChi: 'Lâm Văn Bền, Quận 7, HCM',
            soLuongPhong: '9',
        },
        ]);
        const [rowToEdit, setRowToEdit] = useState(null);
        const [addMGG, setaddMGG] = useState(true);
        const handleDeleteRow = (targetIndex) => {
            setRows(chinhanh.filter((_, idx) => idx !== targetIndex));
        };
    
        const handleEditRow = (idx) => {
            setRowToEdit(idx);
            setModalOpen(true);
        };
    
        const handleSubmit = (newRow) => {
            rowToEdit === null
            ? setRows([...chinhanh, newRow])
            : setRows(
                chinhanh.map((currRow, idx) => {
                    if (idx !== rowToEdit) return currRow;
    
                    return newRow;
                })
                );
        };
        
return (
    <div>

            <div className="mb-3 mt-3">
            <input className="block m-2 px-4 customBox" type="text" id="maChiNhanh" placeholder="Nhập mã chi nhánh" name="maChiNhanh"/>
            <input className="block m-2 px-4 customBox" type="text" id="tenChiNhanh" placeholder="Nhập tên chi nhánh" name="tenChiNhanh"/>
            </div>
            <button type="submit" className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Tìm kiếm</button>
            <button onClick={() => setModalOpen(true)} className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Thêm
            </button>
        <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
        <table className="table" >
            <thead>
                <tr className="table-secondary">
                <th>Mã chi nhánh</th>
                <th>Tên chi nhánh</th>
                <th>Địa chỉ</th>
                <th>Số lượng phòng</th>
                <th></th>
                </tr>
            </thead>
            {chinhanh.map((row, idx) => {
                    return (
                    <tr key={row}>
                        <td>{row.maChiNhanh}</td>
                        <td>{row.tenChiNhanh}</td>
                        <td>{row.diaChi}</td>
                        <td>{row.soLuongPhong}</td>
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
            <tbody>    
            </tbody>
        </table>
        {modalOpen &&(
        <FormChiNhanh
        closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && chinhanh[rowToEdit]}
        />
      )}
    </div>
);
}
export default QuanLyChiNhanh;