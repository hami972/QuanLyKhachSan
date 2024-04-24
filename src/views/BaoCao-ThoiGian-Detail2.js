import React from 'react'
import './mistyles.css'

const XemBaoCaoTheoNam = (props) => {
  const doanhthu = [
    {
      nam: '001',
      soLuongLuotSuDung: '66',
      soLuongKhachDaSuDung: '23',
      tongDoanhThu: '4000000',
    },
    {
      nam: '001',
      soLuongLuotSuDung: '66',
      soLuongKhachDaSuDung: '23',
      tongDoanhThu: '4000000',
    },
    {
      nam: '001',
      soLuongLuotSuDung: '66',
      soLuongKhachDaSuDung: '23',
      tongDoanhThu: '4000000',
    },
  ];
  return (
    <div>
      
        <div class="mb-3 mt-3">
          <label for="year1"><b>Chọn năm bắt đầu:</b></label> <br />
          <input type="number" min="2010" max="2023" step="1" value="2015" id="year" placeholder="Chọn năm bắt đầu" name="year1" />
        </div>
        <div class="mb-3 mt-3">
          <label for="year2"><b>Chọn năm kết thúc:</b></label> <br />
          <input type="number" min="2010" max="2023" step="1" value="2023" id="year" placeholder="Chọn năm kết thúc" name="year2" />
        </div>
        <button type="submit" class="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Xem</button>
      
      <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
      <table class="table" >
        <thead>
          <tr class="table-secondary">
            <th>Năm</th>
            <th>Số lượng lượt sử dụng</th>
            <th>Số lượng khách đã sử dụng</th>
            <th>Tổng doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {doanhthu.map((item, index) => (
            <tr key={index}>
              <td>{item.nam}</td>
              <td>{item.soLuongLuotSuDung}</td>
              <td>{item.soLuongKhachDaSuDung}</td>
              <td>{item.tongDoanhThu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default XemBaoCaoTheoNam;