import React from 'react'
import './mistyles.css'
import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from '../api/Api';
import { FormLoaiPhong } from '../components/FormLoaiPhong';

const QuanLyLoaiPhong = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [kindOfRoom, setKindOfRoom] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState({
        maLoaiPhong: '',
        ten: '',
        donGia: '',
        soLuongNguoiToiDa: '',
        viewPhong: '',
        coSoVatChat: [],
    })

    useEffect(() => {
        getAllKindOfRoom();
    }, []);

    const getAllKindOfRoom = async () => {
        const kindOfRoom = await api.getAllKindOfRoom();
        setKindOfRoom(kindOfRoom);
    }

    const handleDeleteRow = (targetIndex) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa loại phòng này không?');
        if (shouldDelete) {
            setKindOfRoom(kindOfRoom.filter((_, idx) => idx !== targetIndex));
            api.deleteKindOfRoom(kindOfRoom[targetIndex].Id);
        }
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = async (newRow) => {
        console.log(newRow);
        if (rowToEdit == null) {
            const id = await api.addKindOfRoom(newRow);
            newRow.Id = id;
            setKindOfRoom([...kindOfRoom, newRow]);
        }
        else {
            api.updateKindOfRoom(newRow, newRow.Id);
            let updateKindOfRoom = kindOfRoom.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return newRow;
            })
            setKindOfRoom(updateKindOfRoom);
        }
    };

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    const onSearch = async () => {
        console.log(searchCriteria)

    }
    return (
        <div>
            <div className='row'>
                <div className='col-lg-4 col-md-6'>
                    <input className="form-control pb-2 pt-2 mb-3" type="text" id="maLoaiPhong" placeholder="Nhập mã loại phòng" name="maLoaiPhong"
                        onChange={handleChange} />
                </div>
                <div className='col-lg-4 col-md-6'>
                    <input className="form-control pb-2 pt-2" type="text" id="tenLoaiPhong" placeholder="Nhập tên loại phòng" name="tenLoaiPhong"
                        onChange={handleChange} />
                </div>
            </div>
            <div className='col-auto row align-items-center'>
                <div className='col-lg-4 col-md-6'>
                    <input className="form-control pb-2 pt-2" type="number" id="soLuongNguoiToiDa" placeholder="Nhập số lượng người tối đa" name="soLuongNguoiToiDa"
                        onChange={handleChange} />
                </div>
            </div>
            <button type="submit"
                className="btn pb-2 pt-2 me-3 mt-3 mb-3"
                style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
                onClick={onSearch}>
                Tìm kiếm
            </button>
            <button onClick={() => setModalOpen(true)}
                className="btn pb-2 pt-2 me-3 mt-3 mb-3"
                style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>
                Thêm
            </button>
            <div className="text-end">
                <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
            </div>
            <table className="table" >
                <thead style={{ verticalAlign: "middle" }}>
                    <tr className="table-secondary">
                        <th>STT</th>
                        <th>Mã loại phòng</th>
                        <th>Tên loại phòng</th>
                        <th>Đơn giá</th>
                        <th>Số lượng người ở tối đa</th>
                        <th></th>
                    </tr>
                </thead>
                {kindOfRoom.map((row, idx) => {
                    return (
                        <tr key={row.Id}>
                            <td>{idx + 1}</td>
                            <td>{row.maLoaiPhong}</td>
                            <td>{row.ten}</td>
                            <td>{row.donGia}</td>
                            <td>{row.soLuongNguoiToiDa}</td>
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
            {
                modalOpen && (
                    <FormLoaiPhong
                        closeModal={() => {
                            setModalOpen(false);
                            setRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={rowToEdit !== null && kindOfRoom[rowToEdit]}
                        kindOfRoom={kindOfRoom}
                    />
                )
            }
        </div >
    );
}
export default QuanLyLoaiPhong;