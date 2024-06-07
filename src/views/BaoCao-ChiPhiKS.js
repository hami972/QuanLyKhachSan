import React from 'react'
import './mistyles.css'
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Switch } from 'react-router';
import XemBaoCaoCPKSTheoThang from './BaoCao-ChiPhiKS-Detail1'
import XemBaoCaoCPKSTheoNam from './BaoCao-ChiPhiKS-Detail2';
const XemBaoCaoTheoCPKS = (props) => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link fontBrown" to="/manager/baocao/baocaotheochiphikhachsan/xemtheothang">Xem theo tháng</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link action fontBrown" to="/manager/baocao/baocaotheochiphikhachsan/xemtheonam">Xem theo năm</NavLink>
        </li>
      </ul>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/baocao/baocaotheochiphikhachsan/xemtheothang">
            <XemBaoCaoCPKSTheoThang />
          </Route>
          <Route path="/manager/baocao/baocaotheochiphikhachsan/xemtheonam">
            <XemBaoCaoCPKSTheoNam />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default XemBaoCaoTheoCPKS;