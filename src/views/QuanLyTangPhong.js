import React from 'react'
import './mistyles.css'
import { useLocation, Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import QuanLyLichDatPhong from './QuanLyLichDatPhong';
import QuanLyDSPhong from './QuanLyDSPhong';
const QuanLyTangPhong = (props) => {
    const { pathname } = useLocation();
    return (
        <div>
            <div className="container mt-3">
                <ul className="nav nav-tabs maintab">
                    <li className="nav-item">
                        <NavLink className="nav-link fontBrown" to="/manager/quanlyphong/danhSachToa">Danh sách tòa</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fontBrown" to="/manager/quanlyphong/danhSachTang">Danh sách tầng</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fontBrown" to="/manager/quanlyphong/dsPhong">Danh sách phòng</NavLink>
                    </li>
                </ul>
            </div>
            <div className="container mt-3">
                <Switch>
                    <Route path="/manager/quanlyphong/danhSachToa">
                        <QuanLyDSPhong />
                    </Route>
                    <Route path="/manager/quanlyphong/danhSachTang">
                        <QuanLyLichDatPhong />
                    </Route>
                    <Route path="/manager/quanlyphong/dsPhong">
                        <QuanLyLichDatPhong />
                    </Route>
                    {pathname === "/manager/quanlyphong" ? (
                        <Redirect to="/manager/quanlyphong/danhSachToa" />
                    ) : null}
                </Switch>
            </div>
        </div>
    );
}

export default QuanLyTangPhong;