import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { useLocation, Redirect, Route, Switch } from 'react-router';
import XemThongTinNhanVien from './QuanLyNhanVien-detail-page2';
import XemBangLuong from './QuanLyNhanVien-detail-page1';
import ChamCong from './QuanLyNhanVien-ChamCong';
import LuongThuong from './QuanLyNhanVien-LuongThuong';
const QuanLyNhanVien = (props) => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs maintab">
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlynhanvien/xemthongtinnhanvien">Xem thông tin nhân viên</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlynhanvien/xembangluong">Xem bảng lương</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlynhanvien/chamcong">Chấm công</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlynhanvien/luongthuong">Lương thưởng</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3" >
        <Switch>
          <Route path="/manager/quanlynhanvien/xembangluong">
            <XemBangLuong />
          </Route>
          <Route path="/manager/quanlynhanvien/xemthongtinnhanvien">
            <XemThongTinNhanVien />
          </Route>
          <Route path="/manager/quanlynhanvien/chamcong">
            <ChamCong />
          </Route>
          <Route path="/manager/quanlynhanvien/luongthuong">
            <LuongThuong />
          </Route>
          {pathname === "/manager/quanlynhanvien" ? (
            <Redirect to="/manager/quanlynhanvien/xemthongtinnhanvien" />
          ) : null}
        </Switch>
      </div>
    </div>
  );
}

export default QuanLyNhanVien;