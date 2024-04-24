import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Switch } from 'react-router';
import XemBaoCaoTheoPhongTheoNam from './BaoCao-Phong-Detail2';
import XemBaoCaoTheoPhongTheoThang from './BaoCao-Phong-Detail1';
const XemBaoCaoTheoPhong = (props) => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link action fontBrown" to="/manager/baocao/baocaotheophong/xemtheothang">Xem theo tháng</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fontBrown " to="/manager/baocao/baocaotheophong/xemtheonam">Xem theo năm</NavLink>
        </li>
      </ul>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/baocao/baocaotheophong/xemtheothang">
            <XemBaoCaoTheoPhongTheoThang />
          </Route>
          <Route path="/manager/baocao/baocaotheophong/xemtheonam">
            <XemBaoCaoTheoPhongTheoNam />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default XemBaoCaoTheoPhong;