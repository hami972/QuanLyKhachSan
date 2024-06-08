
import React, { useState, useEffect } from 'react';
import './style.css';
import { useLocation, useHistory } from 'react-router-dom';

const AddReview = () => {
    const history = useHistory();
    const location = useLocation();
    const { typeRoom } = location.state || {};
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        // Gửi dữ liệu đánh giá lên server ở đây
        console.log("Đã gửi đánh giá: ", { rating, review, typeRoom });
        // Chuyển hướng về trang trước sau khi gửi đánh giá
        history.goBack();
    };
    return (
        <div>
            <div>
                <h1>Đánh giá loại phòng: {typeRoom.roomType}</h1>
                <p>Chi nhánh: {typeRoom.branch}</p>
                <p>Danh sách phòng: {typeRoom.rooms.map(room => room.maPhong).join(', ')}</p>
                <div>
                    <label>Đánh giá:</label>
                    <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>
                <div>
                    <label>Lời đánh giá:</label>
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} />
                    <input type="hidden" class="rating" disabled="disabled" />
                    <input type="hidden" class="rating" data-readonly />
                </div>
                <button onClick={handleSubmit}>Gửi đánh giá</button>
            </div>
        </div>
    )
}
export default AddReview