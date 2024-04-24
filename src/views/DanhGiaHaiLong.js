import React from 'react'
import './mistyles.css'
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';
const XemDanhGiaHaiLong = (props) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
      );
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labelMap1 = [11,22,33,44,55,66,77]; 
    const labelMap = [11,22,33,44,55,66,77];
    const dataLineBar = {
        labels,
        datasets: [
          {
            label: 'Phòng đơn',
            data: labelMap,
            backgroundColor: '#905700',
          },
          {
            label: 'Phòng đôi',
            data: labelMap,
            backgroundColor: '#bc9a66',
          },
        ],
      };
    const danhgia = [
        {
            ngay: '2023-10-10',
            noidung: 'Chi nhanh quận 8 lmà ăn chưa có tốt, giá cao so với thị trường',
        },
        {
            ngay: '2023-10-11',
            noidung: 'Bác sĩ nguyễn văn A làm việc chưa tận tâm, trám răng nhưng rớt, phải đi khám lại, dịch vụ quá tệ',    
        },
        {
            ngay: '2023-10-13',
            noidung: 'Chưa thấy phòng khám nào như phòng khám này, quá là tận tâm',
        },
    ];
    
    const data={
        labels: [
            "Nguyễn Văn A",
            "Nguyễn Văn B",
            "Nguyễn Văn V",
            "Nguyễn Văn W",
            "Nguyễn Văn X"
        ],
        datasets: [
            {
            label: "Population (millions)",
            backgroundColor: [
                "#905700",
                "#9b6719",
                "#a67832",
                "#b1894c",
                "#bc9a66"
            ],
            data: [22, 33, 44, 55, 66]
            }
        ]
        }
    
  return (
    <div>
        <h3>Biểu đồ đánh giá liên quan đến nhân viên</h3>
        <div style={{width: '500px'}} className='col-sm-3'>
            <Doughnut 
                data={data}
                
            />
        </div>
        <h3>Biểu đồ đánh giá liên quan đến loại phòng</h3>
        <Bar data={dataLineBar}/>
        <div>
            <div class="mb-3 mt-3">
                        <label for="year2"><b>Chọn phương thức lọc:</b></label> <br />
                        <select class="customBox" id="type" placeholder="chọn phương thức" name="year2">
                            <option value="doanhThu">Sắp xếp theo mới nhất</option>
                            <option value="doanhSo">Sắp xếp theo cũ nhất</option>
                        </select>
            </div>
            <button type="submit" className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Tìm kiếm</button>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Ngày</th>
                        <th>Nội dung</th>
                    </tr>
                </thead>
                    {danhgia.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ngay}</td>
                            <td>{item.noidung}</td>
                        </tr>
                    ))}
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default XemDanhGiaHaiLong;