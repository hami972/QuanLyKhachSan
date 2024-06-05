import './mistyles.css';
import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider';
import { FormDatPhong } from '../components/FormDatPhong';

const QuanLyDSPhong = (props) => {
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [branches, setBranches] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [floors, setFloors] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [kindOfRoom, setKindOfRoom] = useState([]);
    const [bookedRooms, setBookedRooms] = useState([]);
    const [initialRooms, setInitialRooms] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        toa: 'Tất cả',
        tang: 'Tất cả',
        ngayBatDau: '',
        ngayKetThuc: '',
        tenLoaiPhong: 'Tất cả'
    });

    const handleChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (newRow) => {
        const id = await api.addBookedRoom(newRow);
        newRow.Id = id;
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const getBookedRooms = async () => {
        const bookedRooms = await api.getAllBookedRoom();
        const filteredBookedRooms = bookedRooms.filter(b => b.chiNhanh === user?.chiNhanh);
        setRooms(prevRooms => prevRooms.map(room => {
            if (filteredBookedRooms.find(bookedRoom => bookedRoom.maPhong === room.maPhong)) {
                return { ...room, booked: true };
            }
            return room;
        }));
        setInitialRooms(prevRooms => prevRooms.map(room => {
            if (filteredBookedRooms.find(bookedRoom => bookedRoom.maPhong === room.maPhong)) {
                return { ...room, booked: true };
            }
            return room;
        }));
        setBookedRooms(filteredBookedRooms)
    };

    const getAllKindOfRoom = async () => {
        const kindOfRoom = await api.getAllKindOfRoom();
        setKindOfRoom(['Tất cả', ...kindOfRoom.map(typeRoom => typeRoom.tenLoaiPhong)]);
    }

    const getBlocks = async () => {
        const blocks = await api.getAllBlocks();
        const filteredBlocks = blocks.filter(block => block.chiNhanh === user?.chinhanh);
        if (filteredBlocks.length > 0) {
            const allFloors = [];
            filteredBlocks.forEach(block => {
                block.tang.forEach(floor => {
                    if (!allFloors.includes(floor.tenTang)) {
                        allFloors.push(floor.tenTang);
                    }
                });
            });
            setFloors(["Tất cả", ...allFloors]);
            const allRooms = filteredBlocks.reduce((accumulator, currentBlock) => {
                currentBlock.tang.forEach(floor => {
                    floor.dsPhong && floor.dsPhong.split('-').forEach(roomName => {
                        const roomInfo = {
                            CCCD: '',
                            tang: floor.tenTang,
                            toa: currentBlock.tenToa,
                            email: '',
                            ngayBatDau: '',
                            ngayKetThuc: '',
                            soDienThoai: '',
                            tenKhachHang: '',
                            maPhong: roomName.trim(),
                            tenLoaiPhong: floor.tenLoaiPhong,
                            tinhTrang: "Đã đặt",
                            chiNhanh: user?.chiNhanh,
                            booked: false
                        };
                        accumulator.push(roomInfo);
                    });
                });
                return accumulator;
            }, []);
            setRooms(allRooms);
            setInitialRooms(allRooms);
            setBlocks(['Tất cả', ...filteredBlocks.map(block => block.tenToa)]);
        }
    };

    const onSearch = () => {
        let filteredRooms = initialRooms;

        if (searchCriteria.toa !== 'Tất cả') {
            filteredRooms = filteredRooms.filter(room => room.toa === searchCriteria.toa);
        }

        if (searchCriteria.tang !== 'Tất cả') {
            filteredRooms = filteredRooms.filter(room => room.tang === searchCriteria.tang);
        }

        if (searchCriteria.tenLoaiPhong !== 'Tất cả') {
            filteredRooms = filteredRooms.filter(room => room.tenLoaiPhong === searchCriteria.tenLoaiPhong);
        }
        if (searchCriteria.ngayBatDau || searchCriteria.ngayKetThuc) {
            filteredRooms = filteredRooms.map(room => {
                const bookedRoom = bookedRooms.find(bookedRoom => bookedRoom.maPhong === room.maPhong);
                if (bookedRoom) {
                    const isStartDateValid = searchCriteria.ngayBatDau >= bookedRoom.ngayKetThuc;
                    const isEndDateValid = searchCriteria.ngayKetThuc !== '' ? searchCriteria.ngayKetThuc <= bookedRoom.ngayBatDau : false;

                    if (isStartDateValid || isEndDateValid) {
                        return { ...room, booked: false };
                    } else {
                        return { ...room, booked: true };
                    }
                }

                return room;
            });
        }
        else {
            setRooms(initialRooms);
        }

        setRooms(filteredRooms);
    }

    useEffect(() => {
        getBlocks();
        getBookedRooms();
        getAllKindOfRoom();
    }, []);

    return (
        <div>
            <div className="row">
                <div className='col-lg-4 col-md-6'>
                    <div className='mb-2' style={{ fontWeight: 600 }}>Tòa</div>
                    <select
                        className="form-select pb-2 pt-2 mb-2"
                        id="type"
                        name="toa"
                        onChange={handleChange}
                        value={searchCriteria.toa}
                    >
                        {blocks.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className='mb-2' style={{ fontWeight: 600 }}>Tầng</div>
                    <select
                        className="form-select pb-2 pt-2 mb-2"
                        id="type"
                        name="tang"
                        onChange={handleChange}
                        value={searchCriteria.tang}
                    >
                        {floors.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className='mb-2' style={{ fontWeight: 600 }}>Loại phòng</div>
                    <select
                        className="form-select pb-2 pt-2 mb-2"
                        id="type"
                        name="tenLoaiPhong"
                        onChange={handleChange}
                        value={searchCriteria.tenLoaiPhong}
                    >
                        {kindOfRoom.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className="mb-2"><b>Ngày bắt đầu</b></div>
                    <input
                        name="ngayBatDau"
                        onChange={handleChange}
                        className="form-control pb-2 pt-2 mb-2"
                        type="date"
                        value={searchCriteria.ngayBatDau}
                    />
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className="mb-2"><b>Ngày kết thúc</b></div>
                    <input
                        name="ngayKetThuc"
                        onChange={handleChange}
                        className="form-control pb-2 pt-2 mb-3"
                        type="date"
                        value={searchCriteria.ngayKetThuc}
                    />
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
            <button

                className="btn pb-2 pt-2 mb-3 me-3"
                style={{ backgroundColor: "#d3a55e", color: "#FFFFFF" }}
            >
                Mặc định
            </button>

            <div className="row g-2">
                {rooms.map((room, index) => (
                    <div key={index} className={`col-auto ${room.booked ? 'booked' : ''}`} onClick={() => handleEditRow(index)}>
                        <div className='room-square'>
                            {room.maPhong}
                        </div>
                    </div>
                ))}
            </div>


            {modalOpen && (
                <FormDatPhong
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rooms[rowToEdit]}
                />
            )}
        </div>
    );
}

export default QuanLyDSPhong;
