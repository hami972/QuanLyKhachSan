import React from 'react'
import './style.css'
import { NavLink, useLocation, Switch, Route, Redirect } from "react-router-dom";

import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import QuanLyNhanVien from '../views/QuanLyNhanVien'
import QuanLyChiNhanh from './QuanLyChiNhanh';
import QuanLyMaGiamGia from './QuanLyMaGiamGia';
import QuanLyDanhGia from './QuanLyDanhGia';
const Manager = (props) => {
    const { pathname } = useLocation();
    return (
        <div >
            <TopNav />
            <nav className="container" >
                <div className="row flex-nowrap" >
                    <div className="col py-3" style={{ overflowX: "auto", minHeight: "400px" }}>
                        <Route >
                            <Switch>
                                <Route path="/manager/schedule">

                                </Route>
                                <Route path="/manager/staff">
                                    <QuanLyNhanVien />
                                </Route>
                                <Route path="/manager/baocao">

                                </Route>
                                <Route path="/manager/quanlyhoadon">
                                </Route>
                                <Route path="/manager/quanlykho">

                                </Route>
                                <Route path="/manager/quanlydichvu">

                                </Route>
                                <Route path="/manager/quanlychinhanh">
                                    <QuanLyChiNhanh />
                                </Route>
                                <Route path="/manager/quanlymagiamgia">
                                    <QuanLyMaGiamGia />
                                </Route>
                                <Route path="/manager/quanlydanhgia">
                                    <QuanLyDanhGia />
                                </Route>
                            </Switch>
                        </Route>
                    </div>
                </div>
            </nav>
            <Footer style={{ marginTop: 0 }} />
        </div >
    );
}
export default Manager;