import { NavLink } from "react-router-dom"
const TopNav = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light" >
            <div className="container" id="topNav">
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    Menu
                    <i class="fa-solid fa-caret-down"></i>
                </button>

                <div className="mx-3"></div>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/" exact>Giới thiệu</NavLink>
                        </li>
                        <li className="nav-item me-4" >
                            <NavLink className="nav-link" to="/rooms">Phòng</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/services">Dịch vụ</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/contacts">Liên lạc</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/booking">Đặt lịch</NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to="/manager">Quản lý</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <img src="images/logo.png" alt="Avatar Logo" style={{ width: "85px", height: "58px" }} />
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/sign_in">Đăng nhập</NavLink>
                </div>
                <div className="nav-item d-none d-lg-block ms-5">
                    <NavLink className="nav-link" to="/sign_up">Đăng ký</NavLink>
                </div>

            </div>

        </nav >
    )
}
export default TopNav;