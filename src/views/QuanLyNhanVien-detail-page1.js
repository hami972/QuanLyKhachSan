import React from 'react'
import './style.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const XemBangLuong = (props) => {
  const luong = [
    {
      maNhanVien: '001',
      tenNhanVien: 'Nguyễn Văn A',
      soGioLam: '23',
      luongCoBan: '4000000',
      luongThuong: '40000000',
      tongLuong: '44000000'
    },
    {
      maNhanVien: '001',
      tenNhanVien: 'Nguyễn Văn A',
      soGioLam: '23',
      luongCoBan: '4000000',
      luongThuong: '40000000',
      tongLuong: '44000000'
    },
  ];
  return (
    <div>
      <form name="xemBangLuong" action="/action_page.php">
        <div class="mb-3 mt-3">
          <label for="nameNhanVien"><b>Chọn tháng muốn xem</b></label> <br />
          <input type="month" class="customBox" placeholder="nhập tên nhân viên" name="nameNhanVien" />
        </div>

        <button type="submit" class="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onclick="showContent();">Xem</button>
      </form>
      <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      <table class="table" >
        <thead>
          <tr class="table-secondary">
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Lương cơ bản</th>
            <th>Số giờ làm</th>
            <th>Lương thưởng</th>
            <th>Tổng lương</th>
          </tr>
        </thead>
        <tbody>
          {luong.map((item, index) => (
            <tr key={index}>
              <td>{item.maNhanVien}</td>
              <td>{item.tenNhanVien}</td>
              <td>{item.luongCoBan}</td>
              <td>{item.soGioLam}</td>
              <td>{item.luongThuong}</td>
              <td>{item.tongLuong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default XemBangLuong;