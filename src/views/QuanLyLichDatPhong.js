import React from 'react'
import './mistyles.css'
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from 'react';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'
import { FormDatPhong } from '../components/FormDatPhong';

const QuanLyLichDatPhong = (props) => {
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [bookedRooms, setBookedRooms] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        tenKhachHang: '',
        CCCD: '',
        SDT: ''
    })

    useEffect(() => {
        getBookedRooms();
    }, []);

    const getBookedRooms = async () => {
        const bookedRooms = await api.getAllBookedRoom();
        const filteredBookedRooms = bookedRooms.filter(b => {
            return b.chiNhanh === user?.chinhanh && new Date(b.ngayKetThuc) >= new Date() && b.tinhTrang !== "Check-in";
        });
        setBookedRooms(filteredBookedRooms)
    };

    const handleDeleteRow = (targetIndex) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa vật tư thiết bị này không?');
        if (shouldDelete) {
            setBookedRooms(bookedRooms.filter((_, idx) => idx !== targetIndex));
            api.deleteBookedRooms(bookedRooms[targetIndex].Id);
        }
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = async (newRow) => {
        console.log(newRow);
        if (rowToEdit !== null) {
            api.updateMaterial(newRow, newRow.Id);
            let updatedBookedRooms = bookedRooms.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return newRow;
            })
            setBookedRooms(updatedBookedRooms);
        }
    };

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    const onSearch = async () => {
        console.log(searchCriteria)

        const searchResults = await api.getBookedRoomBySearch(searchCriteria);
        console.log(searchResults);
        const filteredBookedRooms = bookedRooms.filter(b => {
            return b.chiNhanh === user?.chinhanh && new Date(b.ngayKetThuc) >= new Date() && b.tinhTrang !== "Check-in";
        });
        setBookedRooms(filteredBookedRooms)

    }
    return (
        <div>
            <div>
                <div className='row'>
                    <div className='col-lg-4 col-md-6'>
                        <input
                            className="form-control pb-2 pt-2 mb-2"
                            type="text"
                            placeholder="Tên khách hàng"
                            name="tenKhachHang"
                            onChange={handleChange}
                            value={searchCriteria.tenKhachHang}
                        />
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <input
                            className="form-control pb-2 pt-2 mb-2"
                            type="text"
                            placeholder="CCCD"
                            name="CCCD"
                            value={searchCriteria.CCCD}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <input
                            className="form-control pb-2 pt-2 mb-3"
                            type="text"
                            placeholder="Số điện thoại"
                            name="SDT"
                            value={searchCriteria.SDT}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </div>
            <button
                type="submit"
                className="btn pb-2 pt-2 mb-3 me-3"
                style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
                onClick={onSearch}
            >
                Tìm kiếm
            </button>

            <div className="text-end">
                <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
            </div>
            <table className="table">
                <thead style={{ verticalAlign: "middle" }}>
                    <tr className="table-secondary">
                        <th>Họ tên khách</th>
                        <th>Số điện thoại</th>
                        <th>CCCD</th>
                        <th>Mã phòng</th>
                        <th>Loại phòng</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th></th>
                    </tr>
                </thead>
                {bookedRooms.map((row, idx) => {
                    return (
                        <tr key={row.Id}>
                            <td>{row.tenKhachHang}</td>
                            <td>{row.soDienThoai}</td>
                            <td>{row.CCCD}</td>
                            <td>{row.maPhong}</td>
                            <td>{row.tenLoaiPhong}</td>
                            <td>{row.ngayBatDau}</td>
                            <td>{row.ngayKetThuc}</td>
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
            {modalOpen && (
                <FormDatPhong
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && bookedRooms[rowToEdit]}
                    ngayBatDau=""
                    ngayKetThuc=""
                />
            )}
        </div >
    );
}
export default QuanLyLichDatPhong;