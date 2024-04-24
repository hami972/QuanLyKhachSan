import React from 'react'
import './mistyles.css'
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import XemBaoCaoTheoThang from './BaoCao-ThoiGian-Detail1';
import XemBaoCaoTheoThoiGian from './BaoCao-ThoiGian';
import { NavLink } from 'react-router-dom';
import XemBaoCaoTheoPhong from './BaoCao-Phong';
const BaoCao = (props) => {
  return (
    <div>
      <div className="container mt-3">
        <p><b>Xem báo cáo theo:</b></p>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/baocao/baocaotheothoigian">Thời gian</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/baocao/baocaotheophong">Phòng</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/baocao/baocaotheochinhanh">Chi nhánh</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fontBrown" to="/manager/baocao/baocaotheochiphiphongkham">Chi phí phòng khám</NavLink>
          </li>
        </ul>
      </div>
      <div className="container mt-3">
        <Switch>
          <Route path="/manager/baocao/baocaotheothoigian">
            <XemBaoCaoTheoThoiGian />
          </Route>
          <Route path="/manager/baocao/baocaotheophong">
            <XemBaoCaoTheoPhong />
          </Route>
          <Route path="/manager/baocao/baocaotheochinhanh">
          </Route>
          <Route path="/manager/baocao/baocaotheochiphiphongkham">
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default BaoCao;