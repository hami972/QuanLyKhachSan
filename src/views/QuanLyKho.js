import React from 'react'
import './mistyles.css'
import QuanLyKhoChuaSuDung from './QuanLyKhoChuaSuDung';
import QuanLyKhoDaSuDung from './QuanLyKhoDaSuDung';

import { useLocation, Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import QuanLyKhoDangSuDung from './QuanLyKhoDangSuDung';
const QuanLyKho = (props) => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs maintab">
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlykho/chuasudung">Quản lý thiết bị chưa sử dụng</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlykho/dasudung">Quản lý thiết bị đã sử dụng</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlykho/dangsudung">Quản lý thiết bị đang sử dụng</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/quanlykho/chuasudung">
            <QuanLyKhoChuaSuDung />
          </Route>
          <Route path="/manager/quanlykho/dasudung">
            <QuanLyKhoDaSuDung />
          </Route>
          <Route path="/manager/quanlykho/dangsudung">
            <QuanLyKhoDangSuDung/>
          </Route>
          {pathname === "/manager/quanlykho" ? (
            <Redirect to="/manager/quanlykho/trangthietbi" />
          ) : null}
        </Switch>
      </div>
    </div>
  );
}

export default QuanLyKho;