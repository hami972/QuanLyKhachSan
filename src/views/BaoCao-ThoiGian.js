import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Switch } from 'react-router';
import XemBaoCaoTheoThang from './BaoCao-ThoiGian-Detail1'
import XemBaoCaoTheoNam from './BaoCao-ThoiGian-Detail2'
const XemBaoCaoTheoThoiGian = (props) => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link fontBrown" to="/manager/baocao/baocaotheothoigian/xemtheothang">Xem theo tháng</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link action fontBrown" to="/manager/baocao/baocaotheothoigian/xemtheonam">Xem theo năm</NavLink>
        </li>
      </ul>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/baocao/baocaotheothoigian/xemtheothang">
            <XemBaoCaoTheoThang />
          </Route>
          <Route path="/manager/baocao/baocaotheothoigian/xemtheonam">
            <XemBaoCaoTheoNam />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default XemBaoCaoTheoThoiGian;