import React, { useState, useEffect } from 'react';
import './mistyles.css';
import api from "../api/Api";
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

const XemDanhGiaHaiLong = (props) => {
    const [review, setReview] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [kindOfRoom, setKindOfRoom] = useState([]);
    const [staffMentions, setStaffMentions] = useState([]);
    const [roomReviewCounts, setRoomReviewCounts] = useState([]);
    const [showCharts, setShowCharts] = useState(false);
    const [sortBy, setSortBy] = useState('doanhThu'); // Mặc định sắp xếp theo số sao cao nhất
    const getAllReview = async () => {
        try {
            const reviews = await api.getAllReview();
            const filteredReviews = reviews.filter(review => review.soSao === "5");
            console.log('Fetched reviews:', filteredReviews);
            setReview(filteredReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const getAllStaffs = async () => {
        try {
            const staffs = await api.getAllStaffs();
            console.log('Fetched staffs:', staffs);
            setStaffs(staffs);
        } catch (error) {
            console.error('Error fetching staffs:', error);
        }
    };

    const getAllKindOfRoom = async () => {
        try {
            const kindOfRoom = await api.getAllKindOfRoom();
            console.log('Fetched kind of room:', kindOfRoom);
            setKindOfRoom(kindOfRoom);
        } catch (error) {
            console.error('Error fetching kind of room:', error);
        }
    };
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };
    useEffect(() => {
        getAllReview();
        getAllStaffs();
        getAllKindOfRoom();
    }, []);

    useEffect(() => {
        console.log('Reviews state updated:', review);
    }, [review]);

    useEffect(() => {
        if (staffs.length && review.length) {
            const mentions = staffs.map(staff => {
                const nameParts = staff.tenNhanVien.toLowerCase().split(' ');
                const lastName = nameParts[nameParts.length-1];
                const name2 = nameParts[nameParts.length-1] + " " + nameParts[nameParts.length-2];
                const name = "" + staff.tenNhanVien.toLowerCase() + "";
                const count = review.filter(r => {
                    const content = r.danhGia.toLowerCase();
                    if (content.includes(lastName))
                        return lastName;
                    else if (content.includes(name2))
                        return name2;
                    else if (content.includes(name))
                        return name;
                    else return undefined;
                }).length;
                return { name: staff.tenNhanVien, count };
            });
            console.log('Staff mentions:', mentions);
            setStaffMentions(mentions);
        }
    }, [staffs, review]);
    

    useEffect(() => {
        if (kindOfRoom.length && review.length) {
            const counts = kindOfRoom.map(room => {
                const list = review.filter( r => r.maLoaiPhong === room.maLoaiPhong);
                const count = list.length;
                return { ...room, count };
            });
            console.log('Room review counts:', counts);
            setRoomReviewCounts(counts);
        }
    }, [kindOfRoom, review]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );

    const staffData = {
        labels: staffMentions.map(s => s.name),
        datasets: [
            {
                label: 'Lượt đề cập',
                backgroundColor: [
                    "#905700",
                    "#9b6719",
                    "#a67832",
                    "#b1894c",
                    "#bc9a66"
                ],
                data: staffMentions.map(s => s.count)
            }
        ]
    };

    const roomData = {
        labels: ['Lượt đánh giá hài lòng'],
        datasets: roomReviewCounts.map(r => ({
            label: r.tenLoaiPhong,
            data: [r.count],  // Dữ liệu được đặt trong một mảng chứa một giá trị duy nhất
            backgroundColor: '#905700',  // Có thể đặt màu khác nhau cho mỗi loại phòng nếu muốn
        }))
    };

    const handleButtonClick = () => {
        if (showCharts) 
            setShowCharts(false)
        else setShowCharts(true);
    };
    useEffect(() => {
        if (review.length) {
            // Sắp xếp lại danh sách đánh giá khi có thay đổi trong review hoặc sortBy
            let sortedReviews = [...review];
            if (sortBy === 'doanhThu') {
                // Sắp xếp theo số sao cao nhất
                sortedReviews.sort((a, b) => b.soSao - a.soSao);
            } else if (sortBy === 'doanhSo') {
                // Sắp xếp theo số sao thấp nhất
                sortedReviews.sort((a, b) => a.soSao - b.soSao);
            }
            setReview(sortedReviews);
        }
    }, [review, sortBy]);
    return (
        <div>
            
            <button
                type="button"
                className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleButtonClick}
            >
                Hiển thị biểu đồ
            </button>
            {showCharts && (
                <>
                    <h3>Biểu đồ đánh giá liên quan đến nhân viên</h3>
                    <div style={{ width: '500px' }} className='col-sm-3'>
                        <Doughnut data={staffData} />
                    </div>
                    <h3>Biểu đồ đánh giá liên quan đến loại phòng</h3>
                    <Bar data={roomData} />
                </>
            )}
            <div className="mb-3 mt-3">
                <label htmlFor="sortBy"><b>Chọn phương thức lọc:</b></label> <br />
                <select
                    className="customBox"
                    id="sortBy"
                    name="sortBy"
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    <option value="doanhThu">Sắp xếp số sao cao nhất</option>
                    <option value="doanhSo">Sắp xếp số sao thấp nhất</option>
                </select>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr className="table-secondary">
                            <th>Số sao</th>
                            <th>Nội dung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {review.map((item, index) => (
                            <tr key={index}>
                                <td>{item.soSao}</td>
                                <td>{item.danhGia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default XemDanhGiaHaiLong;
