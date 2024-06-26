import './style.css'
import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
import FloatInEffect from '../components/FloatInEffect';
import { AuthContext } from '../hook/AuthProvider';
import RecommendPage from './RecommendPage';
import IntroductionRoomType from './IntroductionRoomType';
import api from '../api/Api';

const IntroductionPage = (props) => {
    //move to SignUp page
    const history = useHistory();
    const moveToBookingPage = () => {
        history.push("/booking")
    }
    const { user } = useContext(AuthContext)

    const [branches, setBranches] = useState([])

    const [searchCriteria, setSearchCriteria] = useState({
        ngayBatDau: '',
        ngayKetThuc: '',
        soLuongNguoi: 1,
        chiNhanh: ''
    });

    //fake review list
    const reviewList = [
        {
            fullname: "Gia đình chị Jessica",
            image: "/images/khach1.jpg",
            brach: "Chi nhánh quận 1",
            review: "Tôi thực sự ấn tượng với dịch vụ phòng ốc tại khách sạn này. Phòng sạch sẽ và tiện nghi, nhân viên thân thiện và nhiệt tình."
        },
        {
            fullname: "Công ty THHH Hà An",
            image: "/images/khach2.jpg",
            brach: "Chi nhánh quận 2",
            review: "Khách sạn có không gian xanh rộng rãi, tạo điều kiện lý tưởng cho việc nghỉ ngơi và thư giãn sau một ngày dài tham quan."
        },
        {
            fullname: "Đại gia đình chị Hiền",
            image: "/images/khach3.jpg",
            brach: "Chi nhánh quận 2",
            review: "Nhân viên khách sạn thân thiện và nhiệt tình. Họ luôn sẵn lòng hỗ trợ và đáp ứng mọi yêu cầu của khách hàng."
        },
        {
            fullname: "Team Building Công Ty H",
            image: "/images/khach4.png",
            brach: "Chi nhánh quận 1",
            review: "Dịch vụ phòng ốc và vệ sinh tại khách sạn luôn đạt chuẩn cao. Tôi cảm thấy thật thoải mái và an tâm khi ở đây."
        },
        {
            fullname: "Gia đình anh Mạnh",
            image: "/images/khach6.jpg",
            brach: "Chi nhánh quận 2",
            review: "Khách sạn này có các tiện ích tốt như bể bơi, phòng tập gym và spa, là nơi lý tưởng để thư giãn và giải trí.",
        }
    ]

    //fake serviceList
    const [serviceList, setServiceList] = useState([
        {
            name: "Nhà Hàng",
            image: "/images/nhahang.png",
            isChecked: true
        },
        {
            name: "Gym",
            image: "/images/gym.png",
            isChecked: false
        },
        {
            name: "Hồ bơi",
            image: "/images/hoboi.png",
            isChecked: false
        },
        {
            name: "Gym",
            image: "/images/gym.png",
            isChecked: false
        }
    ])

    // Update checked service
    const updateServiceList = (index) => {
        const newServiceList = [...serviceList];
        if (!newServiceList[index].isChecked) {
            newServiceList.forEach((item, i) => {
                item.isChecked = (i === index);
            });
            setServiceList(newServiceList);
        }
    }

    // Custom for services on middle screen 
    var settingsService = {
        dots: true,
        infinite: true,
        swipeToSlide: true,
        speed: 500,
        dots: false,
        arrows: false,
        slidesToShow: 1.15,//number show each slide
        slidesToScroll: 1,//number item next 

    };

    // Custom for backgroud images
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextImage, setNextImage] = useState(true);
    useEffect(() => {
        const showNextImage = () => {
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);

            }, 0); // Thời gian delay trước khi chuyển sang ảnh tiếp theo (ms)
        };
        const interval = setInterval(showNextImage, 10000); // Thời gian hiển thị của mỗi hình ảnh (ms)
        return () => clearInterval(interval); // Clear interval khi component unmount
    }, [currentIndex]);

    useEffect(() => {
        getBranchs();
    }, []);

    const getBranchs = async () => {
        const branches = await api.getAllBranchs();
        setBranches(branches);
    };

    const clickNextImage = () => {
        if (nextImage === true) setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        setNextImage(true);
    }
    const clickPreviousImage = () => {
        if (nextImage === false) setCurrentIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
        setNextImage(false);
    }

    const checkError = () => {

        if (user?.Loai !== "KhachHang") {
            alert("Vui lòng đăng nhập để lưu lại lịch sử đặt phòng")
            return false;
        }

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

    const handleSearchChange = (e) => {
        setSearchCriteria(prevSearchCriteria => ({
            ...prevSearchCriteria,
            [e.target.name]: e.target.value
        }));
    };

    const handleSearch = () => {
        if (checkError()) {
            history.push({
                pathname: '/rooms',
                state: { searchCriteria: searchCriteria }
            });

        };
    }


    return (
        <div>
            <TopNav />
            <div className="carousel-wrapperImage">
                <button className="slick-prev" onClick={clickPreviousImage}></button>
                <div className="transitionImage">
                    <img src="/images/sanh.png" alt="" className={currentIndex === 0 ? nextImage ? 'image1In' : 'image1Out' : ''}
                        style={{
                            opacity: currentIndex === 1 ? 1 : 0,
                        }} />
                    <img src="/images/sanh1.jpg" alt="" className={currentIndex === 1 ? nextImage ? 'image2In' : 'image2Out' : ''}
                        style={{
                            opacity: currentIndex === 2 ? 1 : 0,
                        }} />
                    <img src="/images/sanh2.jpg" alt="" className={currentIndex === 2 ? nextImage ? 'image3In' : 'image3Out' : ''}
                        style={{
                            opacity: currentIndex === 3 ? 1 : 0,
                        }} />
                    <img src="/images/sanh3.jpg" alt="" className={currentIndex === 3 ? nextImage ? 'image4In' : 'image4Out' : ''}
                        style={{
                            opacity: !nextImage && currentIndex === 0 ? 1 : 0,
                        }} />
                </div>
                <button className="slick-next" onClick={clickNextImage}></button>
            </div>
            <section className="">
                <div style={{ backgroundColor: "#905700", padding: '50px', color: '#fff' }}>
                    <div style={{ backgroundColor: "#905700", padding: '20px' }}>
                        <h1> Đặt phòng ngay </h1>
                    </div>
                    <div className='form'>
                        <form className='row'>
                            <div className="col-3 mb-3">
                                <input
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                                    type='date'
                                    placeholder='Ngày check in'
                                    value={searchCriteria.ngayBatDau}
                                    onChange={handleSearchChange}
                                    name="ngayBatDau"
                                />
                            </div>
                            <div className="col-3 mb-3">
                                <input
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                                    type='date'
                                    placeholder='Ngày check out'
                                    value={searchCriteria.ngayKetThuc}
                                    onChange={handleSearchChange}
                                    name="ngayKetThuc"
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <input
                                    className='form-control'
                                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                                    type='number'
                                    placeholder='Số lượng người'
                                    value={searchCriteria.soLuongNguoi}
                                    name="soLuongNguoi"
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="col-2 mb-3">
                                <select
                                    className="form-select"
                                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                                    id="chiNhanh"
                                    name='chiNhanh'
                                    value={searchCriteria.chiNhanh}
                                    onChange={handleSearchChange}
                                >
                                    <option value="">Chọn chi nhánh</option>
                                    {branches.map((item, index) => (
                                        <option key={index} value={item.tenChiNhanh}>
                                            {item.tenChiNhanh}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-2 mb-3">
                                <button className='form-control'
                                    onClick={handleSearch}
                                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', fontWeight: 'bold' }} type='button'
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {user?.Loai === "KhachHang" ?
                <RecommendPage /> : <IntroductionRoomType />
            }

            <section className='pt-10 mb-4 mt-4'>
                <h3 align="center">Một số dịch vụ trong khách sạn</h3>
                <div className='containerServices container mt-4 mb-4 d-none d-md-flex'>
                    {serviceList.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <input type="checkbox" id={"c" + index} name="slideServices" checked={item.isChecked} onChange={() => updateServiceList(index, !item.isChecked)} />
                                <label for={"c" + index} className='cardServices' style={{ backgroundImage: `url(${item.image})`, height: "60vh", justifyContent: 'center' }}>
                                    <div className='rowServices'>
                                        <div className='descriptionServices'>
                                            <div className="frosted">
                                                <h3>{item.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className='container d-block d-md-none'>
                    <Slider {...settingsService} >
                        {serviceList.map((item, index) => {
                            return (
                                <div className="container p-4" key={index}>
                                    <div style={{ position: "relative", borderRadius: "2rem", overflow: "hidden", boxShadow: "1px 3px 9px 1px rgba(0, 0, 0, 0.8)" }}>
                                        <img alt="" src={item.image} style={{ width: "100%" }} />
                                        <div>
                                            <div className="frosted textOnImage">
                                                <h3>{item.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
                <h4 align="center"><NavLink to="/services" className="text-decoration-none customLink" style={{ color: "#000" }}>Xem thêm &rarr;</NavLink></h4>
            </section >

            <section className='bg-light ps-5 pe-5 pb-3 pt-3 row g-0' style={{ color: "#a36300" }}>
                <NavLink to="/contacts" className="text-decoration-none">
                    <div className="row contact-us-container">
                        <div className='contact-with-us__container'>
                            <div className="contact-with-us">Contact with us</div>
                            <div className="next-ic bounce">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="40"
                                    fill="none"
                                    color='#100a53'
                                    viewBox="0 0 45 40"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M30.087 0h-7.9l12.4 16.7H.387v7h33.9L22.187 40h7.9l14.3-20-14.3-20z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </NavLink>

            </section>
            <div style={{ position: 'fixed', bottom: '80px', right: '-5px' }}>
                <a href="https://m.me/hotelroyal2" target="_blank" rel="noopener noreferrer">
                    <img src="/images/iconmess.png" alt="Messenger Icon" />
                </a>
            </div>
            <Footer style={{ marginTop: 0 }} />
        </div>
    );
};
export default IntroductionPage;