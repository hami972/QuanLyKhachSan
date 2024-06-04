import React from 'react'
import './mistyles.css'
import { useEffect, useState, useContext } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from '../api/Api';
import { FormTang } from '../components/FormTang';
import { AuthContext } from '../hook/AuthProvider'

const QuanLyTang = (props) => {
    const [floors, setFloors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const { user } = useContext(AuthContext);
    const [searchCriteria, setSearchCriteria] = useState({
        slDau: '',
        slCuoi: '',
    })


    useEffect(() => {
        getFloors();
    }, []);

    const getFloors = async () => {
        const floors = await api.getAllFloors();
        setFloors(floors);
    };

    const handleDeleteRow = (targetIndex) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa vật tư thiết bị này không?');
        if (shouldDelete) {
            setFloors(floors.filter((_, idx) => idx !== targetIndex));
            //api.deleteMaterial(Floors[targetIndex].Id);
        }
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = async (newRow) => {
        console.log(newRow);
        if (rowToEdit == null) {
            const id = await api.addFloor({ ...newRow, chiNhanh: user?.chinhanh });
            newRow.Id = id;
            setFloors([...floors, newRow]);
        }
        else {
            api.updateFloor(newRow, newRow.Id);
            let updated_floor = floors.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return newRow;
            })
            setFloors(updated_floor);
        }
    };

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    const onSearch = () => {

    }

    return (
        <div>
            <div div className='row'>
                <div className='col-auto m-auto'><b>Số lượng</b></div>
                <div className="row col">
                    <div className='col-lg-4 col-md-6'>
                        <text style={{ fontWeight: 600 }}>Từ</text>
                        <input
                            className="form-control pb-2 pt-2 mb-2"
                            type="number"
                            placeholder="0"
                            name="slDau"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <text style={{ fontWeight: 600 }}>Đến</text>
                        <input
                            className="form-control pb-2 pt-2 mb-2"
                            type="number"
                            placeholder="200"
                            name="slCuoi"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="btn pb-2 pt-2 mb-3 me-3 mt-3"
                style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
                onClick={onSearch}
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

            <table className="table">
                <thead style={{ verticalAlign: "middle" }}>
                    <tr className="table-secondary">
                        <th>Mã tầng</th>
                        <th>Tên tầng</th>
                        <th>Tòa</th>
                        <th>Loại phòng</th>
                        <th>Số lượng phòng</th>
                        <th></th>
                    </tr>
                </thead>
                {floors.map((row, idx) => {
                    return (
                        <tr key={row.Id}>
                            <td>{row.maTang}</td>
                            <td>{row.tenTang}</td>
                            <td>{row.toa}</td>
                            <td>{row.tenLoaiPhong}</td>
                            <td>{row.slPhong}</td>
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
                    <FormTang
                        closeModal={() => {
                            setModalOpen(false);
                            setRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={rowToEdit !== null && floors[rowToEdit]}
                        tang={floors}
                    />
                )
            }
        </div >
    );
}

export default QuanLyTang;