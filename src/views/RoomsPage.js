import React, { useState, useRef } from 'react'
import './style.css'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const RoomsPage = ({ rooms }) => {
        return (
        <div>
            <TopNav />
            <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF" }}><h3 align="center">Loại phòng của chúng tôi</h3></header>
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img alt="" src="images/gdcaocap2.png" style={{ width: "90%" }} />
                    </div>
                    <div className="col-md-7 align-self-center mt-2">
                        <p style={{ fontSize:'28px'}}>Chúng tôi tự hào giới thiệu các hạng phòng đa dạng và tiện nghi, đảm bảo đáp ứng mọi nhu cầu của quý khách và mang lại trải nghiệm lưu trú đích thực. <br/> Dù bạn đang tìm kiếm một kỳ nghỉ sang trọng, một cuộc họp kinh doanh hiệu quả hay một chuyến du lịch gia đình đầy niềm vui, chúng tôi luôn sẵn lòng phục vụ.</p>
                    </div>
                </div>
            </section>
            <section className="">
                <div style={{ backgroundColor: "#905700", padding: '50px', color: '#fff'}}>
                    <div style={{ backgroundColor: "#905700", padding: '20px'}}>
                        <h1> Đặt phòng ngay </h1>
                    </div>
                    <div className='form'>
                        <form className='row'>
                        <div className="col-2 mb-3">
                    <       input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff'}} type='date' placeholder='Ngày check in'/>
                        </div>
                        <div className="col-2 mb-3">
                            <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff'}} type='date' placeholder='Ngày check out'/>
                        </div>
                        <div className="col-2 mb-3">
                            <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff'}} type='number' placeholder='Số lượng người lớn'/>
                        </div>
                        <div className="col-2 mb-3">
                            <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff'}} type='number' placeholder='Số lượng trẻ em'/>
                        </div>
                        <div className="col-3 mb-3">
                            <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff', fontSize: '22px', fontWeight: 'bold'}} type='submit' value='Xem phòng'/>
                        </div>
                        </form>
                    </div>
                </div>
            </section>
            <section class="container mt-5 mb-5">
                <div class="row" >
                    {rooms.map(room => (
                        <div className="row " style= {{backgroundColor:'#fff', alignItems: 'center', display: 'flex', borderRadius: '5px', borderStyle: 'groove', marginTop: '50px' }}>
                            <div className="col-5 outset">
                                <NavLink to={`/rooms/${room.id}`}>
                                    <img src={room.image} alt={room.name} style={{ padding: '10px', width: "100%" }} />
                                </NavLink>
                            </div>
                            <div className="col-5 column">
                                <h2 className='row' style={{color: '#905700' }}>{room.name}</h2>
                                <p className='row'>
                                    
                                    <h3 className='row' >Giá ưu đãi cho 1 đêm: {room.cost}</h3>
                                </p>
                                <div className='row g-2 pb-3'>
                                            <div className='col-auto' style={{ backgroundColor: "yellow", borderRadius: "5px" }}>4.3</div>
                                            <div className='col-auto' >Cực tốt</div>
                                            <div className='col-auto spaceText' style={{ color: "gray" }}>220 đánh giá</div>
                                </div>
                            </div>  
                            <div className="col-2 ">
                                    <button type="button" style={{color: '#fff', fontWeight: 'bold', backgroundColor: '#905700', }} className='bluecolor block m-2 py-2 px-4 rounded'> Đặt phòng </button>
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