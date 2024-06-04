import React from 'react'
import './mistyles.css'
import { useLocation, Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import QuanLyLichDatPhong from './QuanLyLichDatPhong';
import QuanLyDSPhong from './QuanLyDSPhong';
const QuanLyDatPhong = (props) => {
    const { pathname } = useLocation();
    return (
        <div>
            <div className="container mt-3">
                <ul className="nav nav-tabs maintab">
                    <li className="nav-item">
                        <NavLink className="nav-link fontBrown" to="/manager/quanlydatphong/danhSachPhong">Danh sách phòng</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fontBrown" to="/manager/quanlydatphong/lichDatPhong">Danh sách đặt phòng</NavLink>
                    </li>
                </ul>
            </div>
            <div className="container mt-3">
                <Switch>
                    <Route path="/manager/quanlydatphong/danhSachPhong">
                        <QuanLyDSPhong />
                    </Route>
                    <Route path="/manager/quanlydatphong/lichDatPhong">
                        <QuanLyLichDatPhong />
                    </Route>
                    {pathname === "/manager/quanlydatphong" ? (
                        <Redirect to="/manager/quanlydatphong/danhSachPhong" />
                    ) : null}
                </Switch>
            </div>
        </div>
    );
}

export default QuanLyDatPhong;