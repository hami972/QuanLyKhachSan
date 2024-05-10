import React from 'react'
import './style.css'
import TopNav from '../components/TopNav.js'
import { NavLink } from "react-router-dom"
import Footer from '../components/Footer.js'
import CodeGetPass from '../components/CodeGetPass.js'
import { useState, useContext } from 'react'
import { AuthContext } from '../hook/AuthProvider'
const ForgetPassword = (props) => {
    const [codePopup, setCodePopup] = useState(false);
    const { forgotPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const handleForgot = async (e) => {
        e.preventDefault();
        // await api.sendEmail()
        forgotPassword(email)
    }
    return (
        <div>
            <TopNav />
            <section className="row g-0 pb-5" style={{backgroundImage: 'url(images/anhngoaiks.png)', width: '100%'}}>
                <div className="col-1"></div>
                <div className="col-sm-6 col-md-5 col-lg-4">
                    <div style={{backgroundColor: "#fff", border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            <h4 align="center" className="mt-5 mb-4">Quên mật khẩu</h4>
                            <div className="mb-3 mt-3 col-10">
                                <input type="text" className="form-control pb-3 pt-3" id="username" name="username" placeholder="Email đăng ký" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập email')} onInput={e => e.target.setCustomValidity('')} required onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <NavLink to="/sign_in" className="text-decoration-none d-flex justify-content-end col-10" style={{ fontWeight: "600", color: "black" }}>Quay về trang đăng nhập</NavLink>
                            <br></br>
                            <button type="submit" className="btn col-10 pb-3 pt-3" onClick={(e) => { handleForgot(e) }} style={{ backgroundColor: "#905700", color: "#FFFFFF", marginBottom: "300px" }} >Gửi</button>
                            {codePopup && (
                                <CodeGetPass trigger="true">
                                    <div className="mb-3 mt-3 col-10">
                                        <input type="text" className="form-control pb-3 pt-3" id="code" name="code" placeholder="Mã xác nhận" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập mã xác nhận')} onInput={e => e.target.setCustomValidity('')} required />

                                    </div>
                                </CodeGetPass>
                            )}
                            <div className="col-10 pb-3 pt-3 mb-5 mt-2 ">
                            </div>
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
export default ForgetPassword;