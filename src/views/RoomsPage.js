import React, { useState, useEffect } from 'react'
import './style.css'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import api from '../api/Api';

const RoomsPage = () => {

    const [kindOfRoom, setKindOfRoom] = useState([]);
    const [branches, setBranches] = useState([]);
    const [blocks, setBlocks] = useState([])
    const [bookedRooms, setBookedRooms] = useState([])

    const [filteredRooms, setFilteredRooms] = useState([])// có thể bỏ
    const [filteredKindOfRooms, setFilteredKindOfRooms] = useState([])

    const [searchCriteria, setSearchCriteria] = useState({
        ngayBatDau: '',
        ngayKetThuc: '',
        soLuongNguoi: 1,
        chiNhanh: ''
    });

    const history = useHistory();
    const handleButtonClick = (room) => {
        history.push({
            pathname: `/rooms/${room.maLoaiPhong}`,
            state: { room, searchCriteria }
        });
    };

    useEffect(() => {
        getBookedRooms();
        getAllKindOfRoom();
        getBranchs();
        getBlocks();
    }, []);

    const getAllKindOfRoom = async () => {
        const kindOfRoom = await api.getAllKindOfRoom();
        setKindOfRoom(kindOfRoom);
    }

    const getBookedRooms = async () => {
        const bookedRooms = await api.getAllBookedRoom();
        setBookedRooms(bookedRooms);
    };

    const getBlocks = async () => {
        const blocks = await api.getAllBlocks();
        setBlocks(blocks);
    };

    const getBranchs = async () => {
        const branches = await api.getAllBranchs();
        setBranches(branches)
        setSearchCriteria({ ...searchCriteria, chiNhanh: branches[0].tenChiNhanh })
    }

    const handleSearch = () => {
        const filteredRooms = [];
        const filteredByCriteria = [];

        // Lọc ra danh sách các phòng thỏa mãn điều kiện từ blocks và kindOfRoom
        kindOfRoom.forEach(room => {
            blocks.forEach(block => {
                if (block.chiNhanh === searchCriteria.chiNhanh) {
                    block.tang.forEach(tang => {
                        if (tang.tenLoaiPhong === room.tenLoaiPhong) {
                            const maPhongs = tang.dsPhong.split('-');
                            maPhongs.forEach(maPhong => {
                                filteredRooms.push({
                                    ...room,
                                    maPhong: maPhong,
                                    chiNhanh: block.chiNhanh
                                });
                            });
                        }
                    });
                }
            });
        });

        // Lọc ra các phòng thỏa mãn điều kiện từ filteredRooms
        filteredRooms.forEach(room => {
            if (room.soLuongNguoiToiDa >= searchCriteria.soLuongNguoi) {
                const isRoomBooked = bookedRooms.some(bookedRoom => {
                    const isSameRoom = bookedRoom.maPhong === room.maPhong;
                    const isStartDateValid = searchCriteria.ngayBatDau >= bookedRoom.ngayKetThuc;
                    const isEndDateValid = searchCriteria.ngayKetThuc !== '' ? searchCriteria.ngayKetThuc <= bookedRoom.ngayBatDau : false;
                    return isSameRoom && !(isStartDateValid || isEndDateValid);
                });
                if (!isRoomBooked) {
                    filteredByCriteria.push(room);
                }
            }
        });

        // Lọc ra danh sách loại phòng từ filteredByCriteria
        const filteredKindOfRooms = [];
        const uniqueMaLoaiPhong = [...new Set(filteredByCriteria.map(room => room.maLoaiPhong))];
        uniqueMaLoaiPhong.forEach(maLoaiPhong => {
            const roomsForType = filteredByCriteria.filter(room => room.maLoaiPhong === maLoaiPhong);
            if (roomsForType.length > 0) {
                const dsPhong = roomsForType.map(room => room.maPhong).join('-'); // Tạo danh sách mã phòng từ các phòng trong loại phòng
                filteredKindOfRooms.push({
                    ...roomsForType[0],
                    maLoaiPhong: maLoaiPhong,
                    dsPhong: dsPhong
                });
            }
        });

        setFilteredRooms(filteredByCriteria);
        setFilteredKindOfRooms(filteredKindOfRooms);
    }

    const handleSearchChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <TopNav />
            <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF" }}>
                <h3 align="center">Loại phòng của chúng tôi</h3>
            </header>
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img alt="" src="images/gdcaocap2.png" style={{ width: "90%" }} />
                    </div>
                    <div className="col-md-7 align-self-center mt-2">
                        <p style={{ fontSize: '28px' }}>Chúng tôi tự hào giới thiệu các hạng phòng đa dạng và tiện nghi, đảm bảo đáp ứng mọi nhu cầu của quý khách và mang lại trải nghiệm lưu trú đích thực. <br /> Dù bạn đang tìm kiếm một kỳ nghỉ sang trọng, một cuộc họp kinh doanh hiệu quả hay một chuyến du lịch gia đình đầy niềm vui, chúng tôi luôn sẵn lòng phục vụ.</p>
                    </div>
                </div>
            </section>
            <section className="">
                <div style={{ backgroundColor: "#905700", padding: '50px', color: '#fff' }}>
                    <div style={{ backgroundColor: "#905700", padding: '20px' }}>
                        <h1> Đặt phòng ngay </h1>
                    </div>
                    <div className='form'>
                        <form className='row'>
                            <div className="col-2 mb-3">
                                <input
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff' }}
                                    type='date'
                                    name="ngayBatDau"
                                    value={searchCriteria.ngayBatDau}
                                    onChange={handleSearchChange}
                                    placeholder='Ngày check in'
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <input
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff' }}
                                    type='date'
                                    name="ngayKetThuc"
                                    value={searchCriteria.ngayKetThuc}
                                    onChange={handleSearchChange}
                                    placeholder='Ngày check out'
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <input
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff' }}
                                    type='number'
                                    name="soLuongNguoi"
                                    value={searchCriteria.soLuongNguoi}
                                    onChange={handleSearchChange}
                                    placeholder='Số lượng người lớn'
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <select
                                    className="form-select pb-2 pt-2 mb-2"
                                    id="type"
                                    name="chiNhanh"
                                    value={searchCriteria.chiNhanh}
                                    onChange={handleSearchChange}
                                >
                                    <option value="">Chọn chi nhánh</option>
                                    {branches.map((item, index) => {
                                        return (
                                            <option key={index} value={item.tenChiNhanh}>
                                                {item.tenChiNhanh}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="col-3 mb-3">
                                <button
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff', fontWeight: 'bold' }}
                                    type='button'
                                    onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section class="container mt-5 mb-5">
                <div class="row" >
                    {filteredKindOfRooms.map(room => (
                        <div className="row "
                            key={room.maLoaiPhong}
                            style={{
                                backgroundColor: '#fff', alignItems: 'center', display: 'flex',
                                borderRadius: '5px', borderStyle: 'groove', marginTop: '50px'
                            }}
                            onClick={() => handleButtonClick(room)}>
                            <div className="col-5 outset">
                                {room.images && room.images.length > 0 && (
                                    <img src={room.images[0]} alt={room.tenLoaiPhong} style={{ padding: '10px', width: "100%" }} />
                                )}

                            </div>
                            <div className="col-5 column">
                                <h2 className='row' style={{ color: '#905700' }}>{room.tenLoaiPhong}</h2>
                                <p className='row'>

                                    <h3 className='row' >Giá ưu đãi cho 1 đêm: {room.donGia}</h3>
                                </p>
                                <div className='row g-2 pb-3'>
                                    <div className='col-auto' style={{ backgroundColor: "yellow", borderRadius: "5px" }}>4.3</div>
                                    <div className='col-auto' >Cực tốt</div>
                                    <div className='col-auto spaceText' style={{ color: "gray" }}>220 đánh giá</div>
                                </div>
                            </div>
                            <div className="col-2 ">
                                <button type="button" onClick={(e) => {
                                    e.stopPropagation();
                                    handleButtonClick(room);
                                }} style={{
                                    color: '#fff', fontWeight: 'bold',
                                    backgroundColor: '#905700',
                                }}
                                    className='bluecolor block m-2 py-2 px-4 rounded'> Đặt phòng </button>
                            </div>
                        </div>
                    )
                    )}

                </div>

            </section>
            <Footer style={{ marginTop: "80px" }} />

        </div >
    );
}
export default RoomsPage;