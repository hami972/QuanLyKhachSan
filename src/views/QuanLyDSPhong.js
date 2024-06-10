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

    const updateRoomDetails = (newDetails) => rooms.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return { ...currRow, ...newDetails };
    });


    const handleSubmit = async (newRow) => {
        let updatedRooms;
        let oldRoomDetails = {};

        if (newRow.Id) {
            if (newRow.tenKhachHang === '') {
                const updatedBookedRooms = bookedRooms.map(room => {
                    if (room.Id === newRow.Id) {
                        oldRoomDetails = {
                            tenKhachHang: room.tenKhachHang,
                            email: room.email,
                            soDienThoai: room.soDienThoai,
                            ngayBatDau: moment().format("YYYY-MM-DD"),
                            ngayKetThuc: room.ngayKetThuc,
                            CCCD: room.CCCD,
                            donGia: room.donGia
                        };
                        return { ...room, ...newRow, tinhTrang: "Check-in" };
                    }
                    return room;
                });

                setBookedRooms(updatedBookedRooms);

                const resetRooms = rooms.map(room => {
                    if (room.Id === newRow.Id) {
                        return {
                            ...room, tenKhachHang: '', email: '', soDienThoai: '',
                            ngayBatDau: '', ngayKetThuc: '', CCCD: '', tinhTrang: "Trống", Id: ''
                        };
                    }
                    return room;
                });

                const updatedNewRoom = resetRooms.map(room => {
                    if (room.maPhong === newRow.maPhong) {
                        return { ...room, ...oldRoomDetails, tinhTrang: "Check-in", Id: newRow.Id };
                    }
                    return room;
                });

                setRooms(updatedNewRoom);

                await api.updateBookedRoom({
                    ...oldRoomDetails, maPhong: newRow.maPhong
                    , tenLoaiPhong: newRow.tenLoaiPhong, toa: newRow.toa, tang: newRow.tang,
                    tinhTrang: "Check-in"
                }, newRow.Id);
                await api.addBill({
                    ...oldRoomDetails, ngayCheckIn: moment().format("YYYY-MM-DD"), ngayCheckOut: '',
                    tinhTrang: "Chưa thanh toán", maPhong: newRow.maPhong, toa: newRow.toa,
                    maDatPhong: newRow.Id, tang: newRow.tang, tenLoaiPhong: newRow.tenLoaiPhong, ngayLap: '',
                    maGiamGia: '', chiNhanh: user?.chinhanh,
                    daDanhGia: false,
                    donGia: newRow.donGia
                });
            } else {
                if (newRow.tinhTrang === "Dọn xong") {
                    updatedRooms = updateRoomDetails({
                        tenKhachHang: "", email: "", soDienThoai: "", ngayBatDau: "",
                        ngayKetThuc: "", CCCD: "", tinhTrang: "Trống", Id: ""
                    });
                    setRooms(updatedRooms);
                    setBookedRooms(bookedRooms.filter((_, idx) => idx !== rowToEdit));
                    await api.deleteBookedRoom(newRow.Id);
                } else {
                    updatedRooms = updateRoomDetails(newRow);
                    setRooms(updatedRooms);
                    await api.updateBookedRoom(newRow, newRow.Id);
                    if (newRow.tinhTrang === "Check-in") {
                        await api.addBill({
                            ...newRow, ngayCheckIn: moment().format("YYYY-MM-DD"),
                            ngayCheckOut: '', tinhTrang: "Chưa thanh toán",
                            chiNhanh: user?.chinhanh
                        });
                    }
                }
            }
        } else {
            const id = await api.addBookedRoom({ ...newRow, chiNhanh: user?.chinhanh, tinhTrang: "Đặt phòng" });
            newRow.Id = id;
            setBookedRooms([...bookedRooms, newRow].sort((a, b) => b.ngayBatDau - a.ngayBatDau));
            updatedRooms = updateRoomDetails({ ...newRow, tinhTrang: "Đặt phòng" });
            setRooms(updatedRooms);
        }

    };

    // change time per second
    //useEffect(() => {
    // const interval = setInterval(() => {
    //setCurrentTime(new Date());
    // }, 1000); // Cập nhật currentTime mỗi giây

    //return () => clearInterval(interval); // Clear interval khi component unmount
    // }, []);

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
                    Id: bookedRoom.Id
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
                            Id: '',
                            donGia: floor.donGia
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

    const onSearch = async () => {
        let filteredRooms = initialRooms;

        const bookedRooms = await api.getAllBookedRoom();

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
                const matchingBookedRooms = bookedRooms.filter(bookedRoom => bookedRoom.maPhong === room.maPhong);

                const bookedRoom = matchingBookedRooms.find(bookedRoom => {
                    const isStartDateValid = searchCriteria.ngayBatDau >= bookedRoom.ngayKetThuc;
                    const isEndDateValid = searchCriteria.ngayKetThuc !== '' ? searchCriteria.ngayKetThuc <= bookedRoom.ngayBatDau : false;
                    return !(isStartDateValid || isEndDateValid);
                });

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
                        Id: bookedRoom.Id
                    };
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
                        Id: bookedRoom.Id
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
                        min={moment().format("YYYY-MM-DD")}
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
                        min={moment().format("YYYY-MM-DD")}
                        type="date"
                        value={searchCriteria.ngayKetThuc}
                    />
                </div>
            </div>

            <div className='text-end'>
                <button
                    type="submit"
                    className="btn pb-2 pt-2 mb-3 me-3"
                    style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
                    onClick={onSearch}
                >
                    Tìm kiếm
                </button>
            </div>

            <div className='row'>
                <div className='col-auto' style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: "#4e4e4e" }} className='room-dot'></div>
                    <div style={{ fontWeight: 600 }}>Phòng đã đặt</div>
                </div>
                <div className='col-auto' style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: "purple" }} className='room-dot'></div>
                    <div style={{ fontWeight: 600 }}>Phòng đang ở</div>
                </div>
                <div className='col-auto' style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: "green" }} className='room-dot'></div>
                    <div style={{ fontWeight: 600 }}>Phòng đang dọn</div>
                </div>
                <div className='col-auto' style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: "red" }} className='room-dot'></div>
                    <div style={{ fontWeight: 600 }}>Phòng sắp check-out</div>
                </div>
                <div className='col-auto' style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: "gold" }} className='room-dot'></div>
                    <div style={{ fontWeight: 600 }}>Phòng mới check-out</div>
                </div>
            </div>

            <div className="row g-2 mt-2">
                {rooms.map((room, index) => (
                    <div key={index}
                        className={`col-auto 
                    ${room.tinhTrang === 'Đặt phòng' ? 'booked' : ''} 
                    ${room.tinhTrang === 'Check-in' ? 'checked-in' : ''}
                    ${room.tinhTrang === 'Check-out' ? 'checked-out' : ''}
                    ${room.tinhTrang === 'Dọn phòng' ? 'tidy' : ''}
                    ${room.tinhTrang === 'Dọn xong' ? 'complete_tidy' : ''}
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
