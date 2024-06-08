
import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { useLocation, useHistory } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ResponsiveGalleryImage from '../components/ResponsiveGallaryImage';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider';

const ReviewComment = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { typeRoom, startDate, endDate } = location.state || {};
    const [comment, setComment] = useState([])

    useEffect(() => {
        getComment()
    }, []);

    const getComment = async () => {
        const comments = await api.getAllReview()
        const filteredComments = comments.filter(review =>
            review.CCCD === user?.CCCD &&
            review.chiNhanh === typeRoom.branch &&
            review.tenLoaiPhong === typeRoom.roomType &&
            review.ngayBatDau === startDate &&
            review.ngayKetThuc === endDate
        );
        setComment(filteredComments)
    }

    if (comment.length <= 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h1>Đánh giá loại phòng: {typeRoom.roomType}</h1>
                <p>Chi nhánh: {typeRoom.branch}</p>
                <p>Danh sách phòng: {typeRoom.rooms.map(room => room.maPhong).join(', ')}</p>
                <div>
                    <label>Đánh giá:</label>
                </div>
                <div>
                    <label>Lời đánh giá:</label>
                    <textarea readOnly value={comment[0].danhGia} />

                </div>
                <Rating
                    value={parseInt(comment[0].soSao)}
                />
                <ResponsiveGalleryImage uploadedImages={comment[0].images} isRead={false} />

            </div>
        </div>
    )
}
export default ReviewComment