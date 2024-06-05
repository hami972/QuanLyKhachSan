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
    const [rowToEdit, setRowToEdit] = useState(null);
    const [branches, setBranches] = useState([]);
    const [rooms, setRooms] = useState([]);
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

    const getBlocks = async () => {
        const blocks = await api.getAllBlocks();
        const filteredBlocks = blocks.filter(block => block.chiNhanh === user?.chinhanh);
        const allRooms = filteredBlocks.reduce((accumulator, currentBlock) => {
            currentBlock.tang.forEach(floor => {
                floor.dsPhong && floor.dsPhong.split('-').forEach(room => {
                    accumulator.push(room.trim());
                });
            });
            return accumulator;
        }, []);
        setRooms(allRooms);
    }

    useEffect(() => {
        getBlocks();
    }, []);


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
            </div>

            <div className="row g-2">
                {rooms.map((room, index) => (
                    <div key={index} className="col-auto">
                        <div className='room-square'>
                            {room}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuanLyDSPhong;