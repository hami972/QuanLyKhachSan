const Footer = (props) => {
    const { style } = props
    return (
        <footer style={{ backgroundColor: "#905700", color: "white", marginTop: "80px", ...style }}>
            <div className="container pt-4 pb-5">
                <div className="row">
                    <div className="col-md-5">
                        <p className="mt-3" style={{ fontSize: "20px" }}>Giới thiệu</p>
                        <p>Chào mừng quý khách đến với khách sạn của chúng tôi - nơi tinh tế hòa quyện giữa sự sang trọng và ấm cúng, tạo nên không gian lưu trú lý tưởng cho mọi hành trình. </p>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-md-3">
                        <p className="mt-3">
                            <span style={{ fontSize: "19px" }}>Giờ mở cửa toàn chi nhánh</span>
                            <br />
                            Từ thứ 2 đến thứ 7: từ 7g30 đến 16g30
                        </p>
                        <p className="mt-3">
                            <span style={{ fontSize: "19px" }}>Địa chỉ</span>
                            <ul>
                                <li>Quận 7, thành phố Hồ Chí Minh</li>
                                <li>Quận 8, thành phố Hồ Chí Minh</li>
                                <li>Bình Thạnh, thành phố Hồ Chí Minh</li>
                            </ul>
                        </p>
                        
                    </div>
                    <div className="col-md-3">
                        <p className="mt-3" style={{ fontSize: "19px" }}>
                            Thông tin liên lạc:
                            <ul>
                                <li>Email: hotel@gmail.com</li>
                                <li>Số điện thoại 1: 0843593598</li>
                                <li>Số điện thoại 2: 0877787899</li>
                            </ul>
                            
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer