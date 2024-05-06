import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from './AuthProvider';
import { auth } from './FirebaseConfig';
// {path:'/booking',name:'Đặt lịch'},
//Khách hàng
const nav0 = [
    { path: '/', name: 'Giới thiệu' },
    { path: '/rooms', name: 'Phòng' },
    { path: '/rooms/:roomId', name: 'Chi tiết phòng' },
    { path: '/thanhtoan', name: 'Thanh toán' },
    { path: '/services', name: 'Dịch vụ' },
    { path: '/contacts', name: 'Liên lạc' },
    { path: 'manager/datphong', name: 'Quản lý lịch đặt phòng' },
    { path: 'manager/baocao', name: 'Báo cáo, thống kê' },
    { path: 'manager/quanlykho', name: 'Quản lý kho' },
    { path: 'manager/quanlyhoadon', name: 'Quản lý hóa đơn' },
    { path: 'manager/quanlynhanvien', name: 'Quản lý nhân viên' },
    { path: 'manager/quanlydanhgia', name: 'Quản lý đánh giá' },
    { path: 'manager/quanlymagiamgia', name: 'Quản lý mã giảm giá' },
    { path: 'manager/quanlychinhanh', name: 'Quản lý chi nhánh' },
    { path: 'manager/quanlydichvu', name: 'Quản lý dịch vụ' },
]
const nav1 = [
    { path: '/', name: 'Giới thiệu' },
    { path: '/rooms', name: 'Bác sĩ' },
    //{ path: '/services', name: 'Dịch vụ' },
    { path: '/contacts', name: 'Liên lạc' },
    //{ path: '/mytreatmentrecord', name: 'Hồ sơ điều trị' }
]
//NhanVien
const nav2 = [
    { path: '/datphong', name: 'Quản lý lịch đặt phòng' },
    { path: '/baocao', name: 'Báo cáo, thống kê' },
    { path: '/quanlykho', name: 'Quản lý kho' },
    { path: '/quanlyhoadon', name: 'Quản lý hóa đơn' },
    { path: '/quanlynhanvien', name: 'Quản lý nhân viên' },
    { path: '/quanlydanhgia', name: 'Quản lý đánh giá' },
    { path: '/quanlymagiamgia', name: 'Quản lý mã giảm giá' },
    { path: '/quanlychinhanh', name: 'Quản lý chi nhánh' },
    { path: '/quanlydichvu', name: 'Quản lý dịch vụ' },
]

//Quản lý chi nhánh
const nav2_1 = [
    { path: '/datphong', name: 'Quản lý lịch đặt phòng' },
    { path: '/baocao', name: 'Báo cáo, thống kê' },
    { path: '/quanlykho', name: 'Quản lý kho' },
    { path: '/quanlyhoadon', name: 'Quản lý hóa đơn' },
    { path: '/quanlynhanvien', name: 'Quản lý nhân viên' },
    { path: '/quanlydanhgia', name: 'Quản lý đánh giá' },
]
//Chủ hệ thống phòng mạch Ngoài có quyền như một nhân viên quản lý thì còn thực hiện quản lý chi nhánh, quản lý dịch vụ.
const nav2_2 = [
    { path: '/baocao', srcImg: '/images/xembaocao_48px.png', name: 'Báo cáo, thống kê' },
    { path: '/quanlykho', srcImg: '/images/qlykho_48px.png', name: 'Quản lý kho' },
    { path: '/quanlynhanvien', srcImg: '/images/qlynhanvien_48px.png', name: 'Quản lý nhân viên' },
    { path: '/quanlydanhgia', srcImg: '/images/tiepnhandanhgia_48px.png', name: 'Quản lý đánh giá' },
    { path: '/quanlymagiamgia', srcImg: '/images/giamgia_48px.png', name: 'Quản lý mã giảm giá' },
    { path: '/quanlychinhanh', srcImg: '/images/qlychinhanh_48px.png', name: 'Quản lý chi nhánh' },
    { path: '/quanlydichvu', srcImg: '/images/qlydichvu_48px.png', name: 'Quản lý dịch vụ' },
]

//Tiếp tân 4 tab đầu
const nav2_3 = [
    { path: '/datphong', name: 'Quản lý đặt phòng' },
    { path: '/quanlykho', name: 'Quản lý kho' },
    { path: '/quanlyhoadon', name: 'Quản lý hóa đơn' },
    { path: '/quanlydichvu', name: 'Quản lý dịch vụ' },
]


export default { nav0, nav1, nav2, nav2_1, nav2_2, nav2_3 }