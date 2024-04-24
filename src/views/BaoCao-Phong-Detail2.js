import React from 'react'
import './mistyles.css'
const XemBaoCaoTheoPhongTheoNam = (props) => {
    return (
        <div>

                <div class="mb-3 mt-3">
                    <label for="year1"><b>Chọn năm:</b></label> <br />
                    <input type="number" class="customBox" min="2010" max="2023" step="1" value="2015" id="year" placeholder="Chọn năm" name="year1" />
                </div>

                <div class="mb-3 mt-3">
                    <label for="year2"><b>Chọn phương thức lọc:</b></label> <br />
                    <select class="customBox" id="type" placeholder="chọn phương thức" name="year2">
                        <option value="doanhThu">Doanh thu</option>
                        <option value="doanhSo">Doanh số</option>
                    </select>
                </div>
                <button type="submit" class="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Xem</button>

            <h1 class="noteVND">**Tính theo đơn vị VNĐ</h1>
            <table class="table" >
                <thead>
                    <tr class="table-secondary">
                        <th>Tên loại phòng</th>
                        <th>Số lượng lượt sử dụng</th>
                        <th>Số lượng khách đã sử dụng</th>
                        <th>Tổng doanh thu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-secondary">
                        <td>Phòng gia đình</td>
                        <td>44</td>
                        <td>44</td>
                        <td>4400000</td>
                    </tr>
                    <tr class="table-secondary">
                        <td>Phòng gia đình</td>
                        <td>44</td>
                        <td>44</td>
                        <td>4400000</td>
                    </tr>
                    <tr class="table-secondary">
                        <td>Phòng gia đình</td>
                        <td>44</td>
                        <td>44</td>
                        <td>4400000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default XemBaoCaoTheoPhongTheoNam;