import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Switch } from 'react-router';
import XemBaoCaoChiNhanhTheoThang from './BaoCao-ChiNhanh-Detail1'
import XemBaoCaoChiNhanhTheoNam from './BaoCao-ChiNhanh-Detail2';
const XemBaoCaoTheoChiNhanh = (props) => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link fontBrown" to="/manager/baocao/baocaotheochinhanh/xemtheothang">Xem theo tháng</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link action fontBrown" to="/manager/baocao/baocaotheochinhanh/xemtheonam">Xem theo năm</NavLink>
        </li>
      </ul>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/baocao/baocaotheochinhanh/xemtheothang">
            <XemBaoCaoChiNhanhTheoThang />
          </Route>
          <Route path="/manager/baocao/baocaotheochinhanh/xemtheonam">
            <XemBaoCaoChiNhanhTheoNam />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default XemBaoCaoTheoChiNhanh;