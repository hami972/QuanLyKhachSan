import React from 'react'
import './mistyles.css'
import QuanLyNhapKho from './QuanLyNhapKho';
import QuanLyCSVC from './QuanLyCSVC';
import QuanLyCSVCHu from './QuanLyCSVC';
import { useLocation, Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
const QuanLyKho = (props) => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="container mt-3">
        <ul className="nav nav-tabs maintab">
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlykho/facilites">Cơ sở vật chất</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlykho/receivingStock">Lịch sử nhập kho</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/quanlykho/damaged">CSVC bị hỏng</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/quanlykho/facilites">
            <QuanLyCSVC />
          </Route>
          <Route path="/manager/quanlykho/receivingStock">
            <QuanLyNhapKho />
          </Route>
          <Route path="/manager/quanlykho/damaged">
            <QuanLyCSVCHu />
          </Route>
          {pathname === "/manager/quanlykho" ? (
            <Redirect to="/manager/quanlykho/facilites" />
          ) : null}
        </Switch>
      </div>
    </div>
  );
}

export default QuanLyKho;