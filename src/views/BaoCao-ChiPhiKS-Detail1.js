import React from 'react'
import './mistyles.css'

const XemBaoCaoCPKSTheoThang = (props) => {
  const doanhthu = [
    {
      tenChiPHi: 'Bàn',
      soLuongLuotSuDung: '66',
      tongDoanhThu: '4000000',
    },
    {
      tenChiPhi: 'Ghế',
      soLuongLuotSuDung: '66',
      tongDoanhThu: '4000000',
    },
    {
      tenChiPhi: 'Tủ',
      soLuongLuotSuDung: '66',
      tongDoanhThu: '4000000',
    },
  ];
  return (
    <div>

      <div class="mb-3 mt-3">
        <label for="month"><b>Chọn tháng, năm:</b></label> <br />
        <input class="customBox" type="month" id="month" placeholder="Chọn tháng năm" name="month" />
      </div>

      <button type="submit" class="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Xem</button>
      <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      <table class="table" >
        <thead>
          <tr class="table-secondary">
            <th>Tên chi phí</th>
            <th>Số lượng lượt sử dụng</th>
            <th>Tổng doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {doanhthu.map((item, index) => (
            <tr key={index}>
              <td>{item.tenChiPhi}</td>
              <td>{item.soLuongLuotSuDung}</td>
              <td>{item.tongDoanhThu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default XemBaoCaoCPKSTheoThang;