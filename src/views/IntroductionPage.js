import React from 'react'
import './style.css'
import { NavLink, useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSpring, animated } from 'react-spring';
import Slider from "react-slick";
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
import { useState } from 'react';
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
    
    const serviceList = [
        {
            name: "Nhà Hàng",
            image: "images/nhahang.png",
        },
        {
            name: "Gym",
            image: "images/gym.png",
        },
        {
            name: "Hồ bơi",
            image: "images/hoboi.png",
        },
        
    ]
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

    return (
        <div>
            <TopNav />
            <section className="row g-0">
                <div>
                    <img  style={{height: "800", width: '100%'}} alt='' src='images/sanh.png'>
                    </img>
                </div>
            </section >
            <section className="mt-5 container">
                <h3 align="center" className='pb-4'>Các loại phòng </h3>
                <div className="row">
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p >
                            <img className='pb-4' src='images/dontieuchuan.png' alt='' style={{width: '100%', height: '100%'}}></img>
                            <h5 className="pb-2">Phòng Đơn Tiêu Chuẩn</h5>
                            <span className="truncation-text">
                            Với không gian thoải mái và tiện nghi, phòng đơn tiêu chuẩn của chúng tôi là lựa chọn lý tưởng cho du khách cá nhân mong muốn tận hưởng không gian riêng tư và thuận tiện. </span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none ">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                        <img className='pb-4' src='images/doncaocap1.png' alt='' style={{width: '100%', height: '100%'}}></img>
                            <h5 className="pb-2">Phòng Đơn Cao Cấp</h5>
                            <span className="truncation-text">Sự sang trọng và tiện nghi được kết hợp hoàn hảo trong phòng đơn cao cấp của chúng tôi. Tận hưởng không gian rộng rãi và các tiện ích đẳng cấp, đảm bảo mang đến trải nghiệm đắm chìm trong sự xa hoa.</span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                        <img className='pb-4' src='images/doitieuchuan1.png' alt='' style={{width: '100%', height: '100%'}}></img>
                            <h5 className="pb-2">Phòng Đôi Tiêu Chuẩn</h5>
                            <span className="truncation-text">Dành cho các cặp đôi hoặc nhóm nhỏ, phòng đôi tiêu chuẩn của chúng tôi là nơi lý tưởng để thư giãn và tận hưởng kỳ nghỉ bên nhau. Không gian thoải mái và tiện ích đầy đủ sẽ làm hài lòng mọi du khách. </span>

                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>

                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                        <img className='pb-4' src='images/doicaocap2.png' alt='' style={{width: '100%', height: '100%'}}></img>
                            <h5 className="pb-2">Phòng Đôi Cao Cấp</h5>
                            <span className="truncation-text">Với không gian rộng rãi và trang thiết bị hiện đại, phòng đôi cao cấp là biểu tượng của sự sang trọng và tiện nghi. Hòa mình vào không gian lịch lãm và đẳng cấp, quý vị sẽ tận hưởng một kỳ nghỉ đáng nhớ.</span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div class="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                        <img className='pb-4' src='images/gdtieuchuan1.png' alt='' style={{width: '100%', height: '100%'}}></img>
                            <h5 className="pb-2">Phòng Gia Đình Tiêu Chuẩn</h5>
                            <span className="truncation-text">Đối với các gia đình, phòng gia đình tiêu chuẩn là lựa chọn hoàn hảo. Với không gian rộng rãi và các tiện ích thuận tiện, phòng này sẽ tạo điều kiện lý tưởng cho mọi thành viên trong gia đình tận hưởng kỳ nghỉ.</span>
                        </p>
                        <NavLink to="/services" className="xemthemtext text-decoration-none">Xem thêm &rarr;</NavLink>
                    </div>
                    <div className="col-md-4 pe-5 px-5 pt-2 pb-4">
                        <p>
                        <img className='pb-4' src='images/gdcaocap1.png' alt='' style={{width: '100%', height: '100%'}}></img>
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
            <div class="container-fluid mt-4 col-10" align="center"> 
            <Slider {...settingsService}>
                        {serviceList.map((item, index) => {
                            return (
                                <div className="container mb-2" >
                                    <div className="p-2">
                                        <p className="center" style={{fontSize: '30px'}}>{item.name}</p>
                                        <img className="center" alt="" src={item.image} style={{ width: "70%" }} />
                                    </div>
                                </div>
                            )
                        })}
            
            </Slider>
            </div>
            </section>
            
            <section className='container pt-10 pb-5'>
                <h3 align="center">Phản hồi của khách hàng</h3>
                <p className='text-center'>Cảm ơn bạn đã tin tưởng chúng tôi</p>
                <div class="container-fluid mt-4" align="center">
                    <Slider {...settings}>
                        {reviewList.map((item, index) => {
                            return (
                                <div className="container mb-2" >
                                    <div className="p-4">
                                        <div className="custom-slider-item pt-5 pb-5 pe-3 px-3 mb-4" >
                                            <p className="truncation-text">{item.review}</p>
                                        </div>
                                        <img alt="" className="img-thumbnail" src={item.image} style={{ borderRadius: "50%", width: "40%" }} />
                                        <h5 className='mt-2'>{item.fullname}</h5>
                                        <p>{item.brach}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </Slider>
                </div>

            </section >
            <Footer style={{ marginTop: "80px" }} />
        </div >
    );
    
}
export default IntroductionPage;