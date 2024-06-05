import React, { useEffect, useState, useContext } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from '../api/Api';
import { FormTang } from '../components/FormTang';
import { AuthContext } from '../hook/AuthProvider'
import { BarController } from 'chart.js';

const QuanLyTang = (props) => {
    const [blocks, setBlocks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const { user } = useContext(AuthContext);
    const [searchCriteria, setSearchCriteria] = useState({
        slDau: '',
        slCuoi: '',
    });

    useEffect(() => {
        getBlocks();
    }, []);

    const getBlocks = async () => {
        const blocks = await api.getAllBlocks();
        const fil = blocks.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        setBlocks(fil);
    };

    const handleDeleteRow = (blockIndex, floorIndex) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa vật tư thiết bị này không?');
        if (shouldDelete) {
            const updatedBlocks = [...blocks];
            updatedBlocks[blockIndex].tang.splice(floorIndex, 1);
            setBlocks(updatedBlocks);
        }
    };

    const handleEditRow = (blockIndex, floorIndex) => {
        setRowToEdit({ blockIndex, floorIndex });
        setModalOpen(true);
    };

    const handleSubmit = async (newRow) => {
        const { blockIndex, floorIndex } = rowToEdit;
        const updatedBlocks = [...blocks];
        const updatedTangList = [...updatedBlocks[blockIndex].tang];
        updatedTangList[floorIndex] = {
            ...updatedTangList[floorIndex],
            maTang: newRow.maTang,
            tenTang: newRow.tenTang,
            tenLoaiPhong: newRow.tenLoaiPhong,
            dsPhong: newRow.dsPhong,
        };
        updatedBlocks[blockIndex].tang = updatedTangList;
        setBlocks(updatedBlocks);
        setModalOpen(false);
        setRowToEdit(null);
    };

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    const onSearch = () => {
        // Perform search based on search criteria
    };

    return (
        <div>
            <div className='row'>
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
                {blocks.map((toa, blockIndex) => (
                    toa?.tang?.map((tang, floorIndex) => (
                        <tr key={`${toa.maToa}-${tang.maTang}`}>
                            <td>{tang.maTang}</td>
                            <td>{tang.tenTang}</td>
                            <td>{toa.tenToa}</td>
                            <td>{tang.tenLoaiPhong}</td>
                            <td>{tang.dsPhong ? tang.dsPhong.split('-').length : 0}</td>
                            <td className="fit">
                                <span className="actions">
                                    <BsFillTrashFill
                                        className="delete-btn"
                                        onClick={() => handleDeleteRow(blockIndex, floorIndex)}
                                    />
                                    <BsFillPencilFill
                                        className="edit-btn"
                                        onClick={() => handleEditRow(blockIndex, floorIndex)}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))
                ))}
            </table>
            {modalOpen && (
                <FormTang
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && blocks[rowToEdit.blockIndex].tang[rowToEdit.floorIndex]}
                    blocks={blocks}
                />
            )}
        </div>
    );
}

export default QuanLyTang;
