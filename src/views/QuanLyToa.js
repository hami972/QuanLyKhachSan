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
        maToa: '',
        tenToa: '',
        slPhongDau: '',
        slPhongCuoi: '',
        slTangDau: '',
        slTangCuoi: '',
        chiNhanh: ''
    })


    useEffect(() => {
        getBlocks();
    }, []);

    const getBlocks = async () => {
        const blocks = await api.getAllBlocks();
        if (user?.Loai !== 'ChuHeThong') {
            const fil = blocks.filter((item, idx) => item.chiNhanh === user?.chinhanh)

            const _fil = fil.map(block => ({
                ...block,
                slTang: block.tang.length,
                slPhong: block.tang.reduce((total, tang) => total + (tang.dsPhong ? tang.dsPhong.split('-').length : 0), 0)
            }));

            setBlocks(_fil);
        }
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
            if (user?.Loai !== 'ChuHeThong') {
                const id = await api.addBlock({ ...newRow, chiNhanh: user?.chinhanh });
                newRow.Id = id;
                setBlocks([...blocks, {
                    ...newRow,
                    slTang: 0,
                    slPhong: 0
                }]);
            }
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

    const checkError = () => {
        if (parseInt(searchCriteria.slPhongDau) >= parseInt(searchCriteria.slPhongCuoi)) {
            alert("Số lượng phòng 'Từ' phải nhỏ hơn 'Đến'");
            return false;
        }

        if (parseInt(searchCriteria.slTangDau) >= parseInt(searchCriteria.slTangCuoi)) {
            alert("Số lượng tầng 'Từ' phải nhỏ hơn 'Đến'");
            return false;
        }
        return true;
    }

    const onSearch = async () => {
        if (checkError()) {
            console.log(searchCriteria)

            const searchResults = await api.getBlocksBySearch(searchCriteria);
            console.log(searchResults);
            if (user?.Loai !== 'ChuHeThong') {
                const fil = searchResults.filter((item, idx) => item.chiNhanh === user?.chinhanh)
                const _fil = fil.map(block => ({
                    ...block,
                    slTang: block.tang.length,
                    slPhong: block.tang.reduce((total, tang) => total + (tang.dsPhong ? tang.dsPhong.split('-').length : 0), 0)
                }));
                setBlocks(_fil);
            }
        }
    }

    return (
        <div>
            <div>
                <div div className='row'>
                    <div className='col-lg-4 col-md-6'>
                        <input
                            className="form-control pb-2 pt-2 mb-2"
                            type="text"
                            id="maToa"
                            placeholder="Mã Tòa"
                            name="maToa"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <input
                            className="form-control pb-2 pt-2 mb-2"
                            type="text"
                            id="tenToa"
                            placeholder="Tên tòa"
                            name="tenToa"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <table className='container-fluid'>
                    <tr>
                        <td>
                            <b>Số lượng tầng</b>
                        </td>
                        <td>
                            <div div className='row'>
                                <div className='col-lg-4 col-md-6'>
                                    <text style={{ fontWeight: 600 }}>Từ</text>
                                    <input
                                        className="form-control pb-2 pt-2 mb-2"
                                        type="number"
                                        placeholder="0"
                                        name="slTangDau"
                                        min={1}
                                        onChange={handleChange}
                                        value={searchCriteria.slTangDau}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-6'>
                                    <text style={{ fontWeight: 600 }}>Đến</text>
                                    <input
                                        className="form-control pb-2 pt-2 mb-2"
                                        type="number"
                                        placeholder="10"
                                        name="slTangCuoi"
                                        min={1}
                                        value={searchCriteria.slTangCuoi}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Số lượng phòng</b>
                        </td>
                        <td>
                            <div className='row'>
                                <div className='col-lg-4 col-md-6'>
                                    <text style={{ fontWeight: 600 }}>Từ</text>
                                    <input
                                        className="form-control pb-2 pt-2 mb-2"
                                        type="number"
                                        placeholder="0"
                                        name="slPhongDau"
                                        min={1}
                                        value={searchCriteria.slPhongDau}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-6'>
                                    <text style={{ fontWeight: 600 }}>Đến</text>
                                    <input
                                        className="form-control pb-2 pt-2"
                                        type="number"
                                        placeholder="200"
                                        name="slPhongCuoi"
                                        value={searchCriteria.slPhongCuoi}
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

                                    <option value={user?.chinhanh}>
                                        {user?.chinhanh}
                                    </option>

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