import React from 'react'
import './style.css'
import TopNav from '../components/TopNav.js'
import { NavLink } from "react-router-dom"
import Footer from '../components/Footer.js'
import CodeGetPass from '../components/CodeGetPass.js'
import { useState } from 'react'
const ForgetPassword = (props) => {
    const [codePopup, setCodePopup] = useState(false);
    return (
        <div>
            <TopNav />
            <section className="row g-0 backgroundSignIn">
                <div class="col-1"></div>
                <div class="col-sm-6 col-md-5 col-lg-4">
                    <div style={{backgroundColor: "#fff", border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            <h4 align="center" class="mt-5 mb-4">Quên mật khẩu</h4>
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="username" name="username" placeholder="Email đăng ký" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập email')} onInput={e => e.target.setCustomValidity('')} required />
                            </div>
                            
                            <NavLink to="/sign_in" class="text-decoration-none d-flex justify-content-end col-10" style={{ fontWeight: "600", color: "black" }}>Quay về trang đăng nhập</NavLink>
                            <br></br>
                            <button type="submit" class="btn col-10 pb-3 pt-3" onClick={()=>setCodePopup(true)} style={{ backgroundColor: "#905700", color: "#FFFFFF", marginBottom: "300px" }}>Nhận mã</button>
                            {codePopup &&(
                            <CodeGetPass trigger="true">
                            <div class="mb-3 mt-3 col-10">
                                <input type="text" class="form-control pb-3 pt-3" id="code" name="code" placeholder="Mã xác nhận" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập mã xác nhận')} onInput={e => e.target.setCustomValidity('')} required />
                                
                            </div>  
                            </CodeGetPass>
                            )}
                        </form>
                        
                    </div>
                </div>
            </section >
            <section class="mt-5" >
                <div class="container">
                    <div class="row g-0 " >
                        
                        <div class="col-1"></div>
                        <div class="col-md-12" >
                            <img className="center" alt="" src="images/benngoaiks.png" style={{ width: "70%", marginTop: "5%" }} />
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