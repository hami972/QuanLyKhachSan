import React, { useEffect, useRef } from 'react'
import './style.css'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
const ContactPage = (props) => {
    //fake brach list

    const branches = [
        {
            MaCN: "CN001",
            TenCN: "Chi nhánh 1",
            DiaChi: "Khu phố 6, Linh Trung, Thủ Đức, Hồ Chí Minh",
            Email: "chinhanhthuduc@gmail.com",
            SDT: "0835363598"
        },
        {
            MaCN: "CN002",
            TenCN: "Chi nhánh 2",
            DiaChi: "Phước long B, Quận 9, Hồ Chí Minh",
            Email: "chinhanhquan9@gmail.com",
            SDT: "0835363597"
        },
        {
            MaCN: "CN003",
            TenCN: "Chi nhánh 3",
            DiaChi: "Huỳnh Tấn Phát, Quận 8, Hồ Chí Minh",
            Email: "chinhanhquan8@gmail.com",
            SDT: "0835363599"
        },
        {
            MaCN: "CN004",
            TenCN: "Chi nhánh 4",
            DiaChi: "Điện Biên Phủ, quận Bình Thạnh, Hồ Chí Minh",
            Email: "chinhanhbinhthanh@gmail.com",
            SDT: "0835363600"
        },

    ]


    return (
        <div>
            <TopNav />
            <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF" }}><h3 align="center">Liên lạc</h3></header>
            <section style={{
                backgroundImage: "url(images/benngoaiks.jpg)"
            }}>

                <div className="timeline">
                    {branches.map((item, index) => {
                        return (
                            <div className={`contactContainer ${index % 2 == 0 ? 'left-container' : 'right-container'}`}
                                style={{ animationDelay: index + "s" }}>
                                <span className='circle'></span>
                                <div className="text-box">
                                    <div style={{ fontFamily: "Manrope" }}><h3>{item.TenCN}</h3></div>
                                    <div className='spaceText'>
                                        <span className='me-2'><i className="fa-solid fa-location-dot" style={{ fontSize: "23px" }}></i></span>
                                        <span className='spaceText text-start'>{item.DiaChi}</span>
                                    </div>
                                    <div className='spaceText'>
                                        <span className='me-2'><i className="fa-solid fa-phone" style={{ fontSize: "23px" }}></i></span>
                                        <span className='spaceText text-start'>{item.Email}</span>
                                    </div>
                                    <div className='spaceText'>
                                        <span className='me-2'><i style={{ fontSize: "23px" }} className="fa-solid fa-inbox"></i></span>
                                        <span className='spaceText text-start'>{item.SDT}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}

                </div>

            </section >
            <Footer style={{ marginTop: 0 }} />
        </div >
    );
}
export default ContactPage;