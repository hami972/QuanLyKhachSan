import React from 'react'
import './mistyles.css'
import { useEffect, useState, useContext } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from '../api/Api';
import { FormLoaiPhong } from '../components/FormLoaiPhong';
import { AuthContext } from '../hook/AuthProvider'

const QuanLyLoaiPhong = (props) => {
    const { user } = useContext(AuthContext);
    const [branches, setBranches] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [kindOfRoom, setKindOfRoom] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState({
        maLoaiPhong: '',
        tenLoaiPhong: '',
        donGiaDau: '',
        donGiaCuoi: '',
        slnMaxDau: '',
        slnMaxCuoi: '',
        chiNhanh: '',
    })

    const getBranches = async () => {
        const branches = await api.getAllBranchs();
        setBranches(branches);
    };

    useEffect(() => {
        getAllKindOfRoom();
        getBranches();
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
            if (user?.Loai === 'ChuHeThong') {
                const id = await api.addKindOfRoom({
                    ...newRow,
                    soSao: "0",
                    slDanhGia: "0",
                    clickArr: []
                });
                newRow.Id = id;
                onSearch()
            }
            else {
                const id = await api.addKindOfRoom({
                    ...newRow, chiNhanh: user?.chinhanh, soSao: "0",
                    slDanhGia: "0",
                    clickArr: []
                });
                newRow.Id = id;
                setKindOfRoom([...kindOfRoom, newRow]);
            }
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
        const searchResults = await api.getKindOfRoomBySearch(searchCriteria);
        setKindOfRoom(searchResults);
    }
    return (
        <div>
            <div>
                <div className='row'>
                    <div className='col-lg-4 col-md-6'>
                        <input className="form-control pb-2 pt-2 mb-2" type="text" id="maLoaiPhong" placeholder="Nhập mã loại phòng"
                            name="maLoaiPhong"
                            onChange={handleChange} />
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <input className="form-control pb-2 pt-2 mb-2" type="text" id="tenLoaiPhong" placeholder="Nhập tên loại phòng"
                            name="tenLoaiPhong"
                            onChange={handleChange} />
                    </div>
                </div>
                <table className='container-fluid'>
                    <tr>
                        <td>
                            <b>Lượng người tối đa</b>
                        </td>
                        <td>
                            <div div className='row'>
                                <div className='col-lg-4 col-md-6'>
                                    <text style={{ fontWeight: 600 }}>Từ</text>
                                    <input
                                        className="form-control pb-2 pt-2 mb-2"
                                        type="number"
                                        placeholder="0"
                                        name="slnMaxDau"
                                        value={searchCriteria.slnMaxDau}
                                        min={1}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-6'>
                                    <text style={{ fontWeight: 600 }}>Đến</text>
                                    <input
                                        className="form-control pb-2 pt-2 mb-2"
                                        type="number"
                                        placeholder="20"
                                        name="slnMaxCuoi"
                                        value={searchCriteria.slnMaxCuoi}
                                        min={1}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Đơn giá: </b>
                        </td>
                        <td>
                            <div div className='row'>
                                <div className='col-lg-4 col-md-6'>
                                    <text style={{ fontWeight: 600 }}>Từ</text>
                                    <input
                                        className="form-control pb-2 pt-2 mb-2"
                                        type="number"
                                        placeholder="0"
                                        name="donGiaDau"
                                        value={searchCriteria.donGiaDau}
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
                                        value={searchCriteria.donGiaCuoi}
                                        name="donGiaCuoi"
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
            <div className="text-end mt-2">
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
                            <td>{row.tenLoaiPhong}</td>
                            <td>{new Intl.NumberFormat("en-DE").format(row.donGia)}</td>
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
                        branches={branches}
                    />
                )
            }
        </div >
    );
}
export default QuanLyLoaiPhong;