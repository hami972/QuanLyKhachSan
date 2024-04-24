import React from 'react'
import './mistyles.css'
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';
import XemDanhGiaHaiLong from "./DanhGiaHaiLong"
import XemDanhGiaKhongHaiLong from "./DanhGiaKhongHaiLong"
const QuanLyDanhGia = (props) => {
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlydanhgia/danhgiahailong">Đánh giá hài lòng</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlydanhgia/danhgiakhonghailong">Đánh giá không hài lòng</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/quanlydanhgia/danhgiahailong">
            <XemDanhGiaHaiLong/>
          </Route>
          <Route path="/manager/quanlydanhgia/danhgiakhonghailong">
            <XemDanhGiaKhongHaiLong/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default QuanLyDanhGia;