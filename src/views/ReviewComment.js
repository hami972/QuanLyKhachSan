
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
        <div className='pt-10 mb-4 mt-4'>
            <div>
            <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF" }}>
                    <h3 align="center">Đánh giá loại phòng: {typeRoom.roomType}</h3>
                </header>
                <h4 style={{ marginLeft: '50px' }} className='pt-10 mb-4 mt-4 '>Chi nhánh: {typeRoom.branch}</h4>
                <h4 style={{ marginLeft: '50px' }}> Danh sách phòng: {typeRoom.rooms.map(room => room.maPhong).join(', ')}</h4>
                <div>
                    <h4 style={{ marginLeft: '50px' }}>Đánh giá:</h4>
                </div>
                <div style={{ marginLeft: '70px' }}>
                    <label>Lời đánh giá:</label>
                    <textarea style={{ marginLeft: '50px' }} readOnly value={comment[0].danhGia} />

                </div>
                <Rating style={{ marginLeft: '50px' }}
                    value={parseInt(comment[0].soSao)}
                />
                <ResponsiveGalleryImage style={{ marginLeft: '50px' }} uploadedImages={comment[0].images} isRead={false} />

            </div>
        </div>
    )
}
export default ReviewComment