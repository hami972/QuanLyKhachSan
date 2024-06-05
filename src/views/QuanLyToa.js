import React from 'react'
import './mistyles.css'
import { useEffect, useState, useContext } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import api from '../api/Api';
import { FormToa } from '../components/FormToa';
import { AuthContext } from '../hook/AuthProvider'

const QuanLyToa = (props) => {
    const [blocks, setBlocks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const { user } = useContext(AuthContext);
    const [searchCriteria, setSearchCriteria] = useState({
        slDau: '',
        slCuoi: '',
    })


    useEffect(() => {
        getBlocks();
    }, []);

    const getBlocks = async () => {
        const blocks = await api.getAllBlocks();
        const fil = blocks.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        const _fil = fil.map(block => ({
            ...block,
            slTang: block.tang.length,
            slPhong: block.tang.reduce((total, tang) => total + (tang.dsPhong ? tang.dsPhong.split('-').length : 0), 0)
        }));

        setBlocks(_fil);
    };

    const handleDeleteRow = async (targetIndex) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa tòa này không?');
        if (shouldDelete) {
            const toaToDelete = blocks[targetIndex];
            setBlocks(blocks.filter((_, idx) => idx !== targetIndex));
            api.deleteBlock(toaToDelete.Id);

        }
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = async (newRow) => {
        console.log(newRow);
        if (rowToEdit == null) {
            const id = await api.addBlock({ ...newRow, chiNhanh: user?.chinhanh });
            newRow.Id = id;
            setBlocks([...blocks, newRow]);
        }
        else {
            api.updateBlock(newRow, newRow.Id);
            let updated_block = blocks.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return newRow;
            })
            setBlocks(updated_block);
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
                        <th>Mã tòa</th>
                        <th>Tên tòa</th>
                        <th>Số lượng tầng</th>
                        <th>Số lượng phòng</th>
                        <th></th>
                    </tr>
                </thead>
                {blocks.map((row, idx) => {
                    return (
                        <tr key={row.Id}>
                            <td>{row.maToa}</td>
                            <td>{row.tenToa}</td>
                            <td>{row.slTang}</td>
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
                    <FormToa
                        closeModal={() => {
                            setModalOpen(false);
                            setRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={rowToEdit !== null && blocks[rowToEdit]}
                        toa={blocks}
                    />
                )
            }
        </div >
    );
}

export default QuanLyToa;