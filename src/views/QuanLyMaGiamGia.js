import React from 'react'
import './mistyles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useContext } from 'react';
import { FormMaGiamGia } from '../components/FormMaGiamGia';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import AddMaGiamGia from '../components/AddMaGiamGia';
const QuanLyMaGiamGia = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [magiamgia, setRows] = useState([
        {
            idMa: 'NEWMEMBER',
            phanTram: '10',
            thoiGianBatDau: '2023-10-03',
            thoiGianKetThuc: '2023-10-03',
            dichVuApDung: 'Tất cả',
        },
        {
            idMa: 'MEMBER20/10',
            phanTram: '20',
            thoiGianBatDau: '2023-10-03',
            thoiGianKetThuc: '2023-10-03',
            dichVuApDung: 'Tất cả',
        },
        {
            idMa: 'NEWMEMBER112',
            phanTram: '10',
            thoiGianBatDau: '2023-10-03',
            thoiGianKetThuc: '2023-10-03',
            dichVuApDung: 'Tất cả',
        },
    ]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [addMGG, setaddMGG] = useState(true);
    const handleDeleteRow = (targetIndex) => {
        setRows(magiamgia.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
        ? setRows([...magiamgia, newRow])
        : setRows(
            magiamgia.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;

                return newRow;
            })
            );
    };
    
    return (
        <div >
            <div className="mb-3 mt-3">
                <input className="block m-2 px-4 customBox" type="text" id="idMaGiamGia" placeholder="Nhập id mã giảm giá" name="idMaGiamGia" />
                <input className="block m-2 px-4 customBox" type="text" id="noidungMaGiamGia" placeholder="Nhập nội dung mã giảm giá" name="noidungMaGiamGia" />
            </div>
            <button
                onClick={props.toggleShow}
                className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Tìm kiếm
            </button>
            <button onClick={() => setModalOpen(true)} className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Thêm
            </button>
            <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>ID mã giảm giá</th>
                        <th>Phần trăm giảm</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Dịch vụ áp dụng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {magiamgia.map((row, idx) => {
                    return (
                    <tr key={row}>
                        <td>{row.idMa}</td>
                        <td>{row.phanTram}</td>
                        <td>{row.thoiGianBatDau}</td>
                        <td>{row.thoiGianKetThuc}</td>
                        <td>{row.dichVuApDung}</td>
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
    
      {modalOpen &&(
        <FormMaGiamGia
        closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && magiamgia[rowToEdit]}
        />
      )}
          
        </div>
    );
}
export default QuanLyMaGiamGia;