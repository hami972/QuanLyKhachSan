import React from 'react'
import './mistyles.css'
import { useEffect, useState, useContext } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from '../api/Api';
import { FormPhong } from '../components/FormPhong';
import { AuthContext } from '../hook/AuthProvider'

const QuanLyTangPhong = (props) => {
    const [blocks, setBlocks] = useState([]);
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
        getBlocks();
    }, []);

    const getBlocks = async () => {
        const blocks = await api.getAllBlocks();
        const fil = blocks.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        setBlocks(fil);
    };

    const getFloors = async () => {
        const floors = await api.getAllFloors();
        const fil = floors.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        setFloors(fil);
    };

    const handleDeleteRow = (targetIndex) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa vật tư thiết bị này không?');
        if (shouldDelete) {
            setFloors(floors.filter((_, idx) => idx !== targetIndex));
            api.deleteFloor(floors[targetIndex].Id);
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
            const result = blocks.filter((item1, idx) => item1.tenToa === newRow.toa)
            await api.updateBlock(
                {
                    tang: [...result[0].tang, {
                        Id: newRow.Id, maTang: newRow.maTang, tenTang: newRow.tenTang,
                        tenLoaiPhong: newRow.tenLoaiPhong, dsPhong: ""
                    }]
                },
                result[0].Id)
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
                        <th>Mã phòng</th>
                        <th>Tầng</th>
                        <th>Tòa</th>
                        <th>Loại phòng</th>
                        <th></th>
                    </tr>
                </thead>
                {floors.map((row, idx) => {
                    return (
                        <tr key={row.Id}>
                            <td>{row.maPhong}</td>
                            <td>{row.tang}</td>
                            <td>{row.toa}</td>
                            <td>{row.tenLoaiPhong}</td>
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
                    <FormPhong
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

export default QuanLyTangPhong;