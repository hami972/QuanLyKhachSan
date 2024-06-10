import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"
const Footer = (props) => {
    const { style } = props
    return (
        <footer className="footer" style={{ backgroundColor: "#905700", color: "white", marginTop: "80px", ...style }}>
            <div className="container pt-4 pb-5">
                <div className="row">
                    <div className="col-lg-5 col-md-4">
                        <img loading="lazy" alt="" src="/images/royalHotelLogowhite.png" />
                        <p>Chào mừng quý khách đến với khách sạn của chúng tôi - nơi tinh tế hòa quyện giữa sự sang trọng và ấm cúng, tạo nên không gian lưu trú lý tưởng cho mọi hành trình.</p>
                        <div class="wrapper">
                            <NavLink class="hover-fx icon_color" to="/"><i class="fab fa-instagram"></i></NavLink>
                            <NavLink class="hover-fx-1 icon_color" to="/"><i class="fab fa-facebook-f"></i></NavLink>
                            <NavLink class="hover-fx-2 icon_color" to="/"><i class="fab fa-twitter"></i></NavLink>
                            <NavLink class="hover-fx-3 icon_color" to="/"><i class="fab fa-youtube"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-lg-3 col-md-4">
                        <p className="mt-3">
                            <span style={{ fontSize: "20px" }}>Địa chỉ</span>
                            <ul>
                                <li>Thủ Đức, thành phố Hồ Chí Minh</li>
                                <li>Quận 7, thành phố Hồ Chí Minh</li>
                                <li>Dĩ An, Bình Dương</li>
                            </ul>
                        </p>
                        <p className="mt-3" style={{ fontSize: "20px" }}>
                            Email: RoyalHotel@gmail.com
                            <br />
                            Phone: 0843593598
                        </p>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-md-2">
                        <p className="mt-3" style={{ fontSize: "20px" }}>Tùy chỉnh</p>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer