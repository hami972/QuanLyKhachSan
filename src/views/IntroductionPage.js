import './style.css'
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
const IntroductionPage = (props) => {
    //move to SignUp page
    const history = useHistory();
    const moveToBookingPage = () => {
        history.push("/booking")
    }

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

    const updateServiceList = (index) => {
        const newServiceList = [...serviceList];
        if (!newServiceList[index].isChecked) {
            newServiceList.forEach((item, i) => {
                item.isChecked = (i === index);
            });
            setServiceList(newServiceList);
        }
    }
    //custom setting for slider
    var settings = {
        dots: true,
        infinite: true,
        swipeToSlide: true,
        speed: 500,

        slidesToShow: 3,//number show each slide
        slidesToScroll: 3,//number item next 
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false
                }
            }

        ]
    };
    var settingsService = {
        dots: true,
        infinite: true,
        swipeToSlide: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,//number show each slide
        slidesToScroll: 1,//number item next 
        responsive: [
            {
                breakpoint: 800,
                settingsService: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settingsService: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false
                }
            }

        ]
    };

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

    const clickNextImage = () => {
        if (nextImage === true) setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);

        setNextImage(true);

    }
    const clickPreviousImage = () => {

        if (nextImage === false) setCurrentIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
        setNextImage(false);

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
            <section className="mt-5 container">
                <h3 align="center" className='pb-4'>Các loại phòng </h3>
                <div className="row">
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p >
                            <img className='pb-4' src='images/dontieuchuan.png' alt='' style={{ width: '100%', height: '100%' }}></img>
                            <h5 className="pb-2">Phòng Đơn Tiêu Chuẩn</h5>
                            <span className="truncation-text">
                                Với không gian thoải mái và tiện nghi, phòng đơn tiêu chuẩn của chúng tôi là lựa chọn lý tưởng cho du khách cá nhân mong muốn tận hưởng không gian riêng tư và thuận tiện. </span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none ">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <img className='pb-4' src='images/doncaocap1.png' alt='' style={{ width: '100%', height: '100%' }}></img>
                            <h5 className="pb-2">Phòng Đơn Cao Cấp</h5>
                            <span className="truncation-text">Sự sang trọng và tiện nghi được kết hợp hoàn hảo trong phòng đơn cao cấp của chúng tôi. Tận hưởng không gian rộng rãi và các tiện ích đẳng cấp, đảm bảo mang đến trải nghiệm đắm chìm trong sự xa hoa.</span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <img className='pb-4' src='images/doitieuchuan1.png' alt='' style={{ width: '100%', height: '100%' }}></img>
                            <h5 className="pb-2">Phòng Đôi Tiêu Chuẩn</h5>
                            <span className="truncation-text">Dành cho các cặp đôi hoặc nhóm nhỏ, phòng đôi tiêu chuẩn của chúng tôi là nơi lý tưởng để thư giãn và tận hưởng kỳ nghỉ bên nhau. Không gian thoải mái và tiện ích đầy đủ sẽ làm hài lòng mọi du khách. </span>

                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>

                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <img className='pb-4' src='images/doicaocap2.png' alt='' style={{ width: '100%', height: '100%' }}></img>
                            <h5 className="pb-2">Phòng Đôi Cao Cấp</h5>
                            <span className="truncation-text">Với không gian rộng rãi và trang thiết bị hiện đại, phòng đôi cao cấp là biểu tượng của sự sang trọng và tiện nghi. Hòa mình vào không gian lịch lãm và đẳng cấp, quý vị sẽ tận hưởng một kỳ nghỉ đáng nhớ.</span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div class="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <img className='pb-4' src='images/gdtieuchuan1.png' alt='' style={{ width: '100%', height: '100%' }}></img>
                            <h5 className="pb-2">Phòng Gia Đình Tiêu Chuẩn</h5>
                            <span className="truncation-text">Đối với các gia đình, phòng gia đình tiêu chuẩn là lựa chọn hoàn hảo. Với không gian rộng rãi và các tiện ích thuận tiện, phòng này sẽ tạo điều kiện lý tưởng cho mọi thành viên trong gia đình tận hưởng kỳ nghỉ.</span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                            <img className='pb-4' src='images/gdcaocap1.png' alt='' style={{ width: '100%', height: '100%' }}></img>
                            <h5 >Phòng Gia Đình Cao Cấp</h5>
                            <span className="truncation-text">Sự thoải mái và sang trọng được đặt lên hàng đầu trong phòng gia đình cao cấp. Với không gian rộng lớn và các tiện ích đẳng cấp, quý vị sẽ có trải nghiệm lưu trú tuyệt vời bên người thân yêu của mình.</span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                </div>
                <h5 className="mt-2" align="center"><NavLink to="/services" className="text-decoration-none customLink" style={{ color: "#000" }}>Xem thêm &rarr;</NavLink></h5>
            </section>

            <section className='pt-10 pb-5'>
                <h3 align="center">Dịch vụ trong khách sạn</h3>
                <div className='containerServices container mt-4'>
                    {serviceList.map((item, index) => {
                        return (
                            <React.Fragment key={item.id}>
                                <input key={index} type="checkbox" id={"c" + index} name="slideServices" checked={item.isChecked} onChange={() => updateServiceList(index, !item.isChecked)} />
                                <label for={"c" + index} className='cardServices' style={{ backgroundImage: `url(${item.image})`, height: "50vh", justifyContent: 'center' }}>
                                    <div className='rowServices'>
                                        <div className='descriptionServices'>
                                            <div class="frosted">
                                                <h3>{item.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </React.Fragment>
                        )
                    })}

                </div>
                <h4 className="mt-4" align="center"><NavLink to="/services" className="text-decoration-none customLink" style={{ color: "#000" }}>Xem thêm &rarr;</NavLink></h4>
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


            <Footer style={{ marginTop: 0 }} />
        </div >
    );

}
export default IntroductionPage;