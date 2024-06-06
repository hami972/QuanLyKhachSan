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

        if (newRow.maDatPhong) {

            const updatedBookedRooms = bookedRooms.map(bookedRoom => {
                if (bookedRoom.maDatPhong === newRow.maDatPhong) {
                    return {
                        ...bookedRoom,
                        maPhong: newRow.maPhong,
                        toa: newRow.toa,
                        tang: newRow.tang,
                        loaiPhong: newRow.tenLoaiPhong,
                        tinhTrang: "Check-in"
                    };
                }
                return bookedRoom;
            });

            setBookedRooms(updatedBookedRooms);

            const updatedRooms = rooms.map(room => {
                if (room.maDatPhong === newRow.maDatPhong) {
                    return {
                        ...room,
                        CCCD: '',
                        email: '',
                        ngayBatDau: '',
                        ngayKetThuc: '',
                        soDienThoai: '',
                        tenKhachHang: '',
                        tinhTrang: "Trống",
                        maDatPhong: ''
                    };
                }
                return room;
            });

            const updatedRoomsWithRoomCode = rooms.map(room => {
                if (room.maPhong === newRow.maPhong) {
                    return {
                        ...room,
                        tenKhachHang: newRow.tenKhachHang,
                        email: newRow.email,
                        soDienThoai: newRow.soDienThoai,
                        ngayBatDau: newRow.ngayBatDau,
                        ngayKetThuc: newRow.ngayKetThuc,
                        CCCD: newRow.CCCD,
                        tinhTrang: "Check-in",
                        maDatPhong: newRow.maDatPhong
                    };
                }
                return room;
            });

            setRooms(updatedRoomsWithRoomCode)

            await api.updateBookedRoom({
                maPhong: newRow.maPhong,
                toa: newRow.toa,
                tang: newRow.tang,
                loaiPhong: newRow.tenLoaiPhong,
                tinhTrang: "Check-in"
            }, newRow.maDatPhong);
        }
        else {
            newRow.tinhTrang = "Đặt phòng";
            const id = await api.addBookedRoom(newRow);
            newRow.maDatPhong = id;
            const updatedBookedRooms = [...bookedRooms, newRow].sort((a, b) => b.ngayBatDau - a.ngayBatDau);
            setBookedRooms(updatedBookedRooms);
            const isRoomExist = rooms.some(room => room.maPhong === newRow.maPhong);

            if (isRoomExist) {
                setRooms(rooms.map(room =>
                    room.maPhong === newRow.maPhong ? {
                        ...room,
                        tenKhachHang: newRow.tenKhachHang,
                        email: newRow.email,
                        soDienThoai: newRow.soDienThoai,
                        ngayBatDau: newRow.ngayBatDau,
                        ngayKetThuc: newRow.ngayKetThuc,
                        CCCD: newRow.CCCD,
                        tinhTrang: "Đặt phòng"
                    } : room
                ));
            }
        }
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const getBookedRooms = async () => {
        const bookedRooms = await api.getAllBookedRoom();
        const filteredBookedRooms = bookedRooms.filter(b => {
            if (b.tinhTrang === 'Đặt phòng') {
                return b.chiNhanh === user?.chinhanh && new Date(b.ngayKetThuc) >= new Date();
            } else {
                return b.chiNhanh === user?.chinhanh
            }
        });
        setRooms(prevRooms => prevRooms.map(room => {
            const bookedRoom = filteredBookedRooms.find(bookedRoom => bookedRoom.maPhong === room.maPhong);
            if (bookedRoom) {
                return {
                    ...room,
                    tenKhachHang: bookedRoom.tenKhachHang,
                    email: bookedRoom.email,
                    soDienThoai: bookedRoom.soDienThoai,
                    ngayBatDau: bookedRoom.ngayBatDau,
                    ngayKetThuc: bookedRoom.ngayKetThuc,
                    CCCD: bookedRoom.CCCD,
                    tinhTrang: bookedRoom.tinhTrang,
                    maDatPhong: bookedRoom.maDatPhong
                };
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
                            tinhTrang: "Trống",
                            chiNhanh: user?.chinhanh,
                            maDatPhong: ''
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
        if (searchCriteria.ngayBatDau !== '' || searchCriteria.ngayKetThuc !== '') {
            filteredRooms = filteredRooms.map(room => {
                const bookedRoom = bookedRooms.find(bookedRoom => bookedRoom.maPhong === room.maPhong);
                if (bookedRoom) {
                    const isStartDateValid = searchCriteria.ngayBatDau >= bookedRoom.ngayKetThuc;
                    const isEndDateValid = searchCriteria.ngayKetThuc !== '' ? searchCriteria.ngayKetThuc <= bookedRoom.ngayBatDau : false;

                    if (isStartDateValid || isEndDateValid) {
                        return {
                            ...room
                        };
                    } else {
                        return {
                            ...room, tenKhachHang: bookedRoom.tenKhachHang,
                            email: bookedRoom.email,
                            soDienThoai: bookedRoom.soDienThoai,
                            ngayBatDau: bookedRoom.ngayBatDau,
                            ngayKetThuc: bookedRoom.ngayKetThuc,
                            CCCD: bookedRoom.CCCD,
                            tinhTrang: bookedRoom.tinhTrang,
                            maDatPhong: bookedRoom.maDatPhong
                        };
                    }
                }

                return room;
            });

        }
        else {
            filteredRooms = filteredRooms.map(room => {
                const bookedRoom = bookedRooms.find(bookedRoom => bookedRoom.maPhong === room.maPhong);
                if (bookedRoom) {
                    return {
                        ...room,
                        tenKhachHang: bookedRoom.tenKhachHang,
                        email: bookedRoom.email,
                        soDienThoai: bookedRoom.soDienThoai,
                        ngayBatDau: bookedRoom.ngayBatDau,
                        ngayKetThuc: bookedRoom.ngayKetThuc,
                        CCCD: bookedRoom.CCCD,
                        tinhTrang: bookedRoom.tinhTrang,
                        maDatPhong: bookedRoom.maDatPhong
                    };
                }
                return room;
            });
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

            <div className="row g-2">
                {rooms.map((room, index) => (
                    <div key={index}
                        className={`col-auto 
                    ${room.tinhTrang === 'Đặt phòng' ? 'booked' : ''} 
                    ${room.tinhTrang === 'Check-in' ? 'checked-in' : ''}
                    ${moment(room.ngayKetThuc).isSame(moment(), 'day') ? 'ending-today' : ''}`}
                        onClick={() => handleEditRow(index)}>
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
                    ngayBatDau={searchCriteria.ngayBatDau}
                    ngayKetThuc={searchCriteria.ngayKetThuc}
                />
            )}
        </div>
    );
}

export default QuanLyDSPhong;
