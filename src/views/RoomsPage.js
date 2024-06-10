import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
import { useParams, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../hook/AuthProvider';
import moment from 'moment';
import api from '../api/Api';

const RoomsPage = () => {

    const location = useLocation();

    const { user } = useContext(AuthContext)

    const [kindOfRoom, setKindOfRoom] = useState([]);
    const [branches, setBranches] = useState([]);
    const [blocks, setBlocks] = useState([])
    const [bookedRooms, setBookedRooms] = useState([])

    const [filteredRooms, setFilteredRooms] = useState([])// có thể bỏ
    const [filteredKindOfRooms, setFilteredKindOfRooms] = useState([])

    const [searchCriteria, setSearchCriteria] = useState(location.state?.searchCriteria || {
        ngayBatDau: '',
        ngayKetThuc: '',
        soLuongNguoi: 1,
        chiNhanh: ''
    });

    const history = useHistory();
    const handleButtonClick = async (room) => {
        const data = { kindOfRoomId: room.Id, CCCD: user?.CCCD };
        await api.updateRoomClick(data);
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
        if (location.state?.searchCriteria) {
            handleSearch()
        }
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
        if (location.state?.searchCriteria) {

        }
        else {
            setSearchCriteria({ ...searchCriteria, chiNhanh: branches[0].tenChiNhanh })
        }
    }

    const checkError = () => {

        if (!searchCriteria.ngayBatDau || !searchCriteria.ngayKetThuc || !searchCriteria.chiNhanh || !searchCriteria.soLuongNguoi) {
            alert("Nhập đầy đủ thông tin");
            return false;
        }

        if (searchCriteria.ngayBatDau && searchCriteria.ngayKetThuc && searchCriteria.ngayBatDau > searchCriteria.ngayKetThuc) {
            alert("Ngày nhập 'Từ' phải nhỏ hơn hoặc bằng ngày nhập 'Đến'");
            return false;
        }
        return true;
    }

    const handleSearch = async () => {

        if (checkError()) {

            const kindOfRoom = await api.getAllKindOfRoom();
            const blocks = await api.getAllBlocks();
            const bookedRooms = await api.getAllBookedRoom();

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
                                        tang: tang.tenTang,
                                        toa: block.tenToa,
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
                if (parseInt(room.soLuongNguoiToiDa) >= parseInt(searchCriteria.soLuongNguoi)) {
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
                    const dsPhong = roomsForType.map(room => room.maPhong).join('-');
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
    }

    const handleSearchChange = (e) => {
        setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
    };

    const getRatingDescription = (rating) => {
        rating = parseFloat(rating);
        if (rating >= 1 && rating < 2) return "Cực tệ";
        if (rating >= 2 && rating < 3) return "Tệ";
        if (rating >= 3 && rating < 4) return "Bình thường";
        if (rating >= 4 && rating < 5) return "Tốt";
        if (rating === 5) return "Cực tốt";
        return "";
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
                                    min={moment().format("YYYY-MM-DD")}
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
                                    min={moment().format("YYYY-MM-DD")}
                                    placeholder='Ngày check out'
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <input
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff' }}
                                    type='number'
                                    name="soLuongNguoi"
                                    min={1}
                                    value={searchCriteria.soLuongNguoi}
                                    onChange={handleSearchChange}
                                    placeholder='Số lượng người lớn'
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <select
                                    className="form-select pb-2 pt-2 mb-2"
                                    style={{ fontSize: '24px', height: '90px', borderRadius: '9px', }}
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
                    {filteredKindOfRooms.map((room, index) => (
                        <div className="row"
                            key={index}
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
                                    <div className='col-auto' style={{ backgroundColor: "yellow", borderRadius: "5px" }}>{room.soSao}</div>
                                    <div className='col-auto' >{getRatingDescription(room.soSao)}</div>
                                    <div className='col-auto spaceText' style={{ color: "gray" }}>{room.slDanhGia} đánh giá</div>
                                </div>
                            </div>
                            <div className="col-2 ">
                                <button type="button" onClick={(e) => {
                                    if (user?.Loai === "KhachHang") {
                                        e.stopPropagation();
                                        handleButtonClick(room);
                                    }
                                    else {
                                        alert("Vui lòng đăng nhập để lưu lại lịch sử đặt phòng")
                                    }
                                }} style={{
                                    color: '#fff', fontWeight: 'bold',
                                    backgroundColor: '#905700',
                                }}
                                    className='bluecolor block m-2 py-2 px-4 rounded'> Đặt phòng </button>
                            </div>
                            <div>
                                {room.dsPhong ? room.dsPhong.split('-').length : 0}
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