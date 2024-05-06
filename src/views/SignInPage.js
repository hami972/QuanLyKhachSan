import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import TopNav from '../components/TopNav.js'
import { NavLink, useHistory } from "react-router-dom"
import Footer from '../components/Footer.js'
import { AuthContext } from '../hook/AuthProvider.js'
const SignInPage = (props) => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const { Login } = useContext(AuthContext);
    const history = useHistory();

    const handleSignin = async (e) => {
        e.preventDefault();

        // Kiểm tra xem đã nhập đủ tên đăng nhập và mật khẩu chưa
        if (!name || !pass) {
            alert('Vui lòng nhập tên đăng nhập và mật khẩu.');
            return;
        }

        // Gọi hàm Login để thực hiện đăng nhập
        Login(name, pass, history);
    };
    return (
        <div>
            <TopNav />
            <section className="row g-0 pb-5" style={{backgroundImage: 'url(images/anhngoaiks.png)', width: '100%'}}>
                <div className="col-1"></div>
                <div className="col-sm-6 col-md-5 col-lg-4">
                        <div style={{backgroundColor: "#fff", border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                            <form style={{ backgroundColor: "#fff" }}>
                                <h4 align="center" class="mt-5 mb-4">Đăng nhập</h4>
                                <div class="mb-3 mt-3 col-10">
                                    <input type="text" class="form-control pb-3 pt-3" id="username" name="username" placeholder="Tên đăng nhập" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập tên đăng nhập')} onInput={e => e.target.setCustomValidity('')} required onChange={(e) => setName(e.target.value)} value={name}/>
                                </div>
                                <div class="col-10 mt-3 mb-2">
                                    <input type="password" class="form-control pb-3 pt-3" id="password" name="password" placeholder="Mật khẩu" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập mật khẩu')} onInput={e => e.target.setCustomValidity('')} required onChange={(e) => setPass(e.target.value)} value={pass}/>
                                </div>
                                <NavLink to="/forgetpassword" class="text-decoration-none d-flex justify-content-end col-10" style={{ fontWeight: "600", color: "black" }}>Bạn quên mật khẩu?</NavLink>

                                <NavLink to="/sign_up" class="btn d-flex justify-content-center col-10 mb-2 mt-2" style={{ color: "#905700" }}>Nếu bạn chưa có tài khoản, đăng ký ngay!</NavLink>

                               {<button type="submit" class="btn col-10 pb-3 pt-3" style={{ backgroundColor: "#905700", color: "#FFFFFF", marginBottom: "300px" }} onClick={handleSignin}>Đăng nhập</button>}
                            </form>
                        </div>
                   
                </div>
                
            </section >
            <section class="mt-5" >
                <div class="container">
                    <div class="row g-0 " >
                        
                        <div class="col-1"></div>
                        <div class="col-md-12" >
                            <img className="centerHotel" alt="" src="images/benngoaiks.png" style={{ width: "100%", marginTop: "5%" }} />
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
export default SignInPage;