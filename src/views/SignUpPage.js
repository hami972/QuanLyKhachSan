import React, { useState, useEffect, useContext } from 'react';
import './style.css'
import { NavLink } from "react-router-dom"
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import moment from 'moment'
import { AuthContext } from '../hook/AuthProvider'
const SignUpPage = (props) => {
    const [errors, setErrors] = useState("");
    const [fullname, setFullName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [identify, setIdentify] = useState('')
    const [signinName, setSigninName] = useState('')
    const [password, setPassWord] = useState('')
    const [againPass, setAgainPass] = useState('')
    const { registerforKH } = useContext(AuthContext);
    function isPositiveInteger(A) {
        // && Number.isInteger(A)
        if (A > 0) {
            return true; // A là số nguyên dương
        } else {
            return false; // A không phải là số nguyên dương
        }
    }
    const validateForm = () => {
        if (fullname != '' && birthday != '' && phone != '' && address != '' && email != '' && identify != '' && password != '' && againPass != '') {
            if (password.length < 6) {
                setErrors('Mật khẩu phải lớn hơn 6 kí tự')
                return false
            }
            else if (password !== againPass) {
                setErrors('Mật khẩu nhắc lại không đúng')
                return false
            }
            else if (identify.length != 12) {
                setErrors("Căn cước công dân này không hợp lệ! Vui lòng nhập căn cước công dân có 12 chữ số.");
                return false;
            }
            else if (phone.length != 10) {
                setErrors("Số điện thoại này không hợp lệ! Vui lòng nhập số điện thoại có 10 chữ số.");
                return false;
            }
            else if (!isPositiveInteger(identify)) {
                setErrors("Căn cước công dân này không hợp lệ! Vui lòng nhập căn cước công dân là số nguyên dương.");
                return false;
            }
            else if (!isPositiveInteger(phone)) {
                setErrors("Số điện thoại này không hợp lệ! Vui lòng nhập số điện thoại là số nguyên dương.");
                return false;
            }
            else {
                setErrors("");
                return true;
            }
        }
        else {
            let errorFields = [];
            if (fullname == '') errorFields.push('tên')
            if (birthday == '') errorFields.push('ngày sinh')
            if (phone == '') errorFields.push('SDT')
            if (address == '') errorFields.push('địa chỉ')
            if (email == '') errorFields.push('email')
            if (identify == '') errorFields.push('CCCD')
            if (password == '') errorFields.push('mật khẩu')
            if (againPass == '') errorFields.push('nhắc lại mật khẩu')
            setErrors("Vui lòng nhập: " + errorFields.join(", "));
            return false;
        }
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (password == againPass) {
            console.log('đk')
            registerforKH(email, password, fullname, phone, identify, birthday, address)
            setFullName('')
            setAddress('')
            setAgainPass('')
            setBirthday('')
            setEmail('')
            setIdentify('')
            setPassWord('')
            setPhone('')
        }
        else {
            alert('Password confirmation does not match!')
        }

    }
    return (
        <div>
            <TopNav />
            <section class="row g-0 pb-5" style={{ backgroundImage: 'url(images/anhngoaiks.png)', width: '100%' }}>
                <div class="col-1"></div>
                <div class="col-sm-6 col-md-5 col-lg-4">
                    <div style={{ backgroundColor: "#fff", border: "2px solid grey", borderRadius: "5px", boxShadow: "3px 3px #888888", marginTop: "70px" }} align="center">
                        <form>
                            <h4 align="center" class="mt-5 mb-4">Đăng ký</h4>
                            <div className="mb-3 mt-3 col-10">
                                <input type="text" className="form-control pb-3 pt-3" id="fullName" name="fullName" placeholder="Họ và tên" required onChange={(e) => setFullName(e.target.value)} value={fullname} />

                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="date" className="form-control pb-3 pt-3" id="birthday" name="birthday" placeholder="Ngày sinh: " max={moment().add(-18, "years").format('YYYY-MM-DD')} required onInvalid={e => e.target.setCustomValidity('Mời bạn nhập ngày sinh')} onInput={e => e.target.setCustomValidity('')} onChange={(e) => setBirthday(e.target.value)} value={birthday} />
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="tel" className="form-control pb-3 pt-3" id="phone" name="phone" placeholder="Số điện thoại" required onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="text" className="form-control pb-3 pt-3" id="address" name="address" placeholder="Địa chỉ" required onChange={(e) => setAddress(e.target.value)} value={address} />
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="email" className="form-control pb-3 pt-3" id="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="mb-3 mt-3 col-10">
                                <input type="text" className="form-control pb-3 pt-3" id="CCCD" name="CCCD" placeholder="Căn cước công dân" required onChange={(e) => setIdentify(e.target.value)} value={identify} />
                            </div>

                            <div className="col-10 mb-3 mt-3">
                                <input type="password" className="form-control pb-3 pt-3" id="password" name="password" placeholder="Mật khẩu" required onChange={(e) => setPassWord(e.target.value)} value={password} />
                            </div>


                            <div className="col-10 mb-3 mt-3">
                                <input type="password" className="form-control pb-3 pt-3" id="re-enter_password" name="re-enter_password" placeholder="Nhập lại mật khẩu" required onChange={(e) => setAgainPass(e.target.value)} value={againPass} />
                            </div>
                            <NavLink to="/sign_in" class="btn d-flex justify-content-center col-10 mb-2 mt-2" style={{ color: "#905700" }}>Đăng nhập nếu bạn đã có tài khoản</NavLink>
                            {errors && <div className="error">{errors}</div>}
                            <button type="submit" class="btn col-10 pb-3 pt-3 mb-5" style={{ backgroundColor: "#905700", color: "#FFFFFF" }} onClick={(e) => { handleSignup(e) }} >Đăng ký</button>
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
                                <br />
                                <br />
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