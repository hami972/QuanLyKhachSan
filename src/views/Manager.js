import React from 'react'
import './style.css'
import { NavLink, useLocation, Switch, Route, Redirect } from "react-router-dom";

import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import QuanLyNhanVien from '../views/QuanLyNhanVien'
import QuanLyChiNhanh from './QuanLyChiNhanh';
import QuanLyMaGiamGia from './QuanLyMaGiamGia';
import QuanLyDanhGia from './QuanLyDanhGia';
import QuanLyKho from './QuanLyKho';
import BaoCao from './BaoCao';
import QuanLyLoaiPhong from './QuanLyLoaiPhong';
import BillManagement from './BillManagement';
import BookingHistory from './BookingHistory';
import QuanLyPhong from './QuanLyPhong';
import QuanLyDatPhong from './QuanLyDatPhong';
import BookingOnline from './BookingOnline';
import QuanLyDichVu from './QuanLyDichVu';
import PaymentHistory from './PaymentHistory';

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
                                <Route path="/manager/quanlyphong">
                                    <QuanLyPhong />
                                </Route>
                                <Route path="/manager/quanlydatphong">
                                    <QuanLyDatPhong />
                                </Route>
                                <Route path="/manager/quanlynhanvien">
                                    <QuanLyNhanVien />
                                </Route>
                                <Route path="/manager/baocao">
                                    <BaoCao />
                                </Route>
                                <Route path="/manager/quanlyhoadon">
                                    <BillManagement />
                                </Route>
                                <Route path="/manager/quanlykho">
                                    <QuanLyKho />
                                </Route>
                                <Route path="/manager/quanlyloaiphong">
                                    <QuanLyLoaiPhong />
                                </Route>
                                <Route path="/manager/quanlydichvu">
                                    <QuanLyDichVu />
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
                                <Route path="/manager/lichsudatphong">
                                    <BookingHistory />
                                </Route>
                                <Route path="/manager/dichvugiatsay">
                                    <BookingOnline />
                                </Route>
                                <Route path="/manager/lichSuThanhToan">
                                    <PaymentHistory />
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