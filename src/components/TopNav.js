import { NavLink, Link, useHistory, useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { matchPath } from "react-router";
import { AuthContext } from "../hook/AuthProvider";
import nav from '../hook/PhanQuyen'
const TopNav = () => {
    
    const { pathname } = useLocation();

    //hide header when scroll down and show header when scroll up
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true)
    const history = useHistory();

    const { Logout, user, scope } = useContext(AuthContext);
    const handleSignout = () => {
        Logout(history);
    };
    
    const handleScroll = () => {
        const currentScrollPos = window.scrollY

        if (currentScrollPos > prevScrollPos) {
            setVisible(false)
        } else {
            setVisible(true)
        }

        setPrevScrollPos(currentScrollPos)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    })
    const { toggle, theme } = useContext(ThemeContext);

    return (
        <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'bg-dark' : 'bg-light'} sticky-${visible ? 'top' : ''} `}>
            <div className="container-fluid" id="topNav">
                <NavLink to="/"><img alt="" src="/images/royalHotelLogo.gif" style={{ height: "60px" }} /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarExample-expand-lg" aria-controls="offcanvasNavbarExample-expand-lg" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" data-bs-target="#offcanvasNavbarExample-expand-lg"></span>
                </button>

                <div className="offcanvas offcanvas-start" data-bs-backdrop="true" data-bs-scroll="true" tabindex="-1" id="offcanvasNavbarExample-expand-lg" aria-labelledby="offcanvasNavbarExample-expand-lg">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasLabel">ROYAL HOTEL</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body p-0">
                        <ul className="navbar-nav m-auto mb-lg-0 mb-2">
                            <li className="nav-item ps-2 pe-2">
                                <NavLink className="nav-link" to="/" exact>Giới thiệu</NavLink>
                            </li>
                            <li className="nav-item ps-2 pe-2">
                                <NavLink className="nav-link" to="/rooms">Phòng</NavLink>
                            </li>
                            <li className="nav-item ps-2 pe-2">
                                <NavLink className="nav-link" to="/services">Dịch vụ</NavLink>
                            </li>
                            <li className="nav-item ps-2 pe-2">
                                <NavLink className="nav-link" to="/contacts">Liên lạc</NavLink>
                            </li>
                            
                            {user !== null && (<li className="dropdown ps-2 pe-2">
                                <button
                                    className="d-flex align-items-center justify-content-center text-decoration-none dropdown-toggle mt-2 p-0"
                                    style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        color: matchPath(pathname, { path: "/manager", exact: false }) ? "#905700" : "black"
                                    }}
                                    id="dropdownUser1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Quản lý
                                </button>
                                <ul className="dropdown-menu border-0" aria-labelledby="navbarDropdown" style={{ background: "#905700" }}>
                                            {scope?.map((val, idx) => {
                                            return (
                                                <div>
                                                <li>
                                                    <NavLink className="dropdown-item" to={`/manager${val.path}`}  >
                                                    {val.name}
                                                    </NavLink>
                                                </li>
                                                {(idx === scope.length - 1) ? null : <hr className="dropdown-divider" />}
                                                </div>
                                            );
                                            })}
                                </ul>
                            </li>
                            )}

                            {user == null && (<li className="dropdown ps-2 pe-2">
                                <button
                                    className="d-flex align-items-center justify-content-center text-decoration-none dropdown-toggle mt-2 p-0"
                                    style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        color: matchPath(pathname, { path: "/manager", exact: false }) ? "#905700" : "black"
                                    }}
                                    id="dropdownUser1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Tài khoản
                                </button>  
                                <ul className="dropdown-menu border-0" aria-labelledby="navbarDropdown" style={{ background: "#905700" }}>            
                                    <li >
                                        <div >
                                        <NavLink className="dropdown-item" to="/sign_in">
                                            Đăng nhập
                                        </NavLink>
                                        </div>
                                    </li>
                                    <li>
                                        <div >
                                        <NavLink className="dropdown-item" to="/sign_up">
                                            Đăng ký
                                        </NavLink>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            )}
                            {user !== null && (
                                <div className="dropdown me-sm-4">
                                <button
                                    className="d-flex align-items-center justify-content-center link-dark text-decoration-none dropdown-toggle p-0"
                                    style={{ border: "none", backgroundColor: "transparent" }}
                                    id="dropdownUser1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                <text className="nav-link">{user.ten}</text>
                                                    <img
                                                    src="/images/ava.png"
                                                    alt="hugenerd"
                                                    width="40"
                                                    height="40"
                                                    style={{ borderRadius: "50%" }}
                                                    />
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                                    style={{ backgroundColor: "#905700", width: "fit-content" }}
                                    aria-labelledby="dropdownUser1">
                                    <li>
                                    <Link className="dropdown-item" to="/hosocanhan">
                                        Hồ sơ cá nhân
                                    </Link>
                                    </li>
                                    <hr className="dropdown-divider" />
                                                    
                                    <li>
                                    <button className="dropdown-item" onClick={handleSignout}>
                                        Đăng xuất
                                    </button>
                                    </li>
                                    
                                </ul>
                                
                                </div>
                            )}                   
                            
                        </ul>
                        
                    </div>
                </div>
            </div>
        </nav >
    )
}
export default TopNav;