import './mistyles.css'
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FormCSVC } from '../components/FormCSVC';
import { useEffect, useState, useContext } from 'react';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'
import { FormPhong } from '../components/FormPhong';

const QuanLyDSPhong = (props) => {
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [branches, setBranches] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({

        toa: '',
        chiNhanh: '',
    })

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    const onSearch = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <div className="row">
                <div className='col-lg-4 col-md-6'>
                    <select
                        className="form-select pb-2 pt-2 mb-2"
                        id="type"
                        name="toa"
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
                <div className='col-lg-4 col-md-6'>
                    <select
                        className="form-select pb-2 pt-2 mb-2"
                        id="type"
                        name="toa"
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
                <div className='col-lg-4 col-md-6'>
                    <select
                        className="form-select pb-2 pt-2 mb-2"
                        id="type"
                        name="toa"
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
                <div className='col-lg-4 col-md-6'>
                    <div className='form-control pb-2 pt-2 mb-2'>
                        {user?.chinhanh}
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="btn pb-2 pt-2 mb-3 me-3 mt-2"
                style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
                onClick={onSearch}
            >
                Tìm kiếm
            </button>
            <button
                onClick={() => setModalOpen(true)}
                className="btn pb-2 pt-2 mb-3 me-3 mt-2"
                style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
            >
                Thêm
            </button>
            {
                modalOpen && (
                    <FormPhong
                        closeModal={() => {
                            setModalOpen(false);
                            setRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={rowToEdit !== null && materials[rowToEdit]}
                        branches={branches}
                        existingMaterials={materials}
                    />
                )
            }
        </div>
    );
}

export default QuanLyDSPhong;