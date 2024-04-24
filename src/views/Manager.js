import React from 'react'
import './style.css'
import { NavLink, useLocation, Switch, Route, Redirect } from "react-router-dom";

import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import QuanLyNhanVien from '../views/QuanLyNhanVien'
import QuanLyChiNhanh from './QuanLyChiNhanh';
import QuanLyMaGiamGia from './QuanLyMaGiamGia';
import QuanLyDanhGia from './QuanLyDanhGia';
const Manager = (props) => {
    const { pathname } = useLocation(); 
    return (
        <div >
            <TopNav />       
            <nav className="container-fluid ">
                <div className="row flex-nowrap ">
                    <div className="col-auto bgLineMenu" id="slide-menu" style={{backgroundColor: '#D3A55E'}}>
                        <div className="d-flex flex-column">
                            <ul className="nav nav-pills d-flex flex-column sticky-top" id="menu">
                                <li className="nav-item mt-2 mb-2">
                                    <NavLink to="/manager/schedule" className="nav-link">
                                        <img src="/images/qlylichhen_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý đặt phòng</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/staff" className="nav-link">
                                        <img src="/images/qlynhanvien_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý nhân viên</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/baocao" className="nav-link">
                                        <img src="/images/xembaocao_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Báo cáo, thống kê</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlyhoadon" className="nav-link">
                                        <img src="/images/qlyhoadon_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý hoá đơn</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlykho" className="nav-link">
                                        <img src="/images/qlykho_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý kho</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlydichvu" className="nav-link">
                                        <img src="/images/qlydichvu_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý số phòng</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlychinhanh" className="nav-link">
                                        <img src="/images/qlychinhanh_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý chi nhánh</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlymagiamgia" className="nav-link">
                                        <img src="/images/giamgia_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý mã giảm giá</span>
                                    </NavLink>

                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to="/manager/quanlydanhgia" className="nav-link">
                                        <img src="/images/tiepnhandanhgia_48px.png" alt="" /> <span className="ms-1 d-none d-sm-inline">Quản lý đánh giá</span>
                                    </NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col py-3" style={{ overflowX: "auto" }}>
                        <Route >
                        <Switch>
                            <Route path="/manager/schedule">
                                
                            </Route>
                            <Route path="/manager/staff">
                                <QuanLyNhanVien/>
                            </Route>
                            <Route path="/manager/baocao">
                        
                            </Route>
                            <Route path="/manager/quanlyhoadon">
                            </Route>
                            <Route path="/manager/quanlykho">
                                
                            </Route>
                            <Route path="/manager/quanlydichvu">
                                
                            </Route>
                            <Route path="/manager/quanlychinhanh">
                                <QuanLyChiNhanh/>
                            </Route>
                            <Route path="/manager/quanlymagiamgia">
                                <QuanLyMaGiamGia/>
                            </Route>
                            <Route path="/manager/quanlydanhgia">
                                <QuanLyDanhGia/>
                            </Route>
                            </Switch>
                        </Route>
                    </div>
                </div>
            </nav>
            <Footer style={{ marginTop: 0 }} />
        </div >
    );
}
export default Manager;