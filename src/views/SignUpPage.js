import React from 'react'
import './style.css'
import { NavLink } from "react-router-dom"
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
const SignUpPage = (props) => {
    return (
        <div>
            <TopNav />
            <section class="row g-0 pb-5" style={{backgroundImage: 'url(images/anhngoaiks.png)', width: '100%'}}>
                <div class="col-1"></div>
                <div class="col-sm-6 col-md-5 col-lg-4">
                    <div style={{backgroundColor: "#fff", border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            <h4 align="center" class="mt-5 mb-4">Đăng ký</h4>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="fullName" name="fullName" placeholder="Họ và tên" required />

                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="date" class="form-control pb-3 pt-3" id="birthday" name="birthday" placeholder="Ngày sinh: " max="2020-11-22" required onInvalid={e => e.target.setCustomValidity('Mời bạn nhập ngày sinh')} onInput={e => e.target.setCustomValidity('')} />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="tel" class="form-control pb-3 pt-3" id="phone" name="phone" placeholder="Số điện thoại" required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="address" name="address" placeholder="Địa chỉ" required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="email" class="form-control pb-3 pt-3" id="email" name="email" placeholder="Email" required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="CCCD" name="CCCD" placeholder="Căn cước công dân" required />
                            </div>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="username" name="username" placeholder="Tên đăng nhập" required />
                            </div>
                            <div class="col-10 mb-3 mt-3">
                                <input type="password" class="form-control pb-3 pt-3" id="password" name="password" placeholder="Mật khẩu" required />
                            </div>
                            <div class="col-10 mb-3 mt-3">
                                <input type="password" class="form-control pb-3 pt-3" id="re-enter_password" name="re-enter_password" placeholder="Nhập lại mật khẩu" required />
                            </div>
                            <NavLink to="/sign_in" class="btn d-flex justify-content-center col-10 mb-2 mt-2" style={{ color: "#905700" }}>Đăng nhập nếu bạn đã có tài khoản</NavLink>
                            <button type="submit" class="btn col-10 pb-3 pt-3 mb-5" style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>Đăng ký</button>
                        </form>
                    </div>
                </div>
                
            </section >
            <section class="mt-5" >
                <div class="container">
                    <div class="row g-0 " >
                        
                        <div class="col-1"></div>
                        <div class="col-md-12" >
                            <img align="middle" className="centerHotel" alt="" src="images/benngoaiks.png" style={{ width: "100%", marginTop: "5%" }} />
                        </div>
                        <div class="col-md-12 pb-5">
                            <p style={{ fontSize: "36px", textAlign: 'center' }} className='pt-5 pb-5'>Khách sạn Hoàng gia</p>
                            <p style={{ fontSize: "18px", textAlign: 'left' }}>"Chào mừng quý khách đến với khách sạn của chúng tôi - nơi tinh tế hòa quyện giữa sự sang trọng và ấm cúng, tạo nên không gian lưu trú lý tưởng cho mọi hành trình. Với tầm nhìn sâu sắc và sứ mệnh mang lại trải nghiệm lưu trú đáng nhớ nhất cho khách hàng, chúng tôi cam kết cung cấp dịch vụ chất lượng cao, không gian thoải mái và tiện nghi hiện đại.
                            <br/>
                            <br/>
                            Tại khách sạn của chúng tôi, quý khách sẽ được trải nghiệm không gian sống lịch lãm trong các phòng nghỉ đa dạng, từ phòng Standard đến các Suite sang trọng, đều được trang bị đầy đủ tiện nghi và dịch vụ chu đáo. Đội ngũ nhân viên chuyên nghiệp và thân thiện của chúng tôi sẽ luôn sẵn lòng hỗ trợ quý khách để đảm bảo mọi yêu cầu của quý vị được đáp ứng một cách tối ưu nhất.</p>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </div >
    );
}
export default SignUpPage;