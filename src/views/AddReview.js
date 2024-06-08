
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../hook/AuthProvider';
import './style.css';
import { useLocation, useHistory } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ResponsiveGalleryImage from '../components/ResponsiveGallaryImage';
import api from '../api/Api';

const AddReview = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();
    const { typeRoom, startDate, endDate } = location.state || {};
    const [kindOfRoom, setKindOfRoom] = useState()

    const [formState, setFormState] = useState({
        star: "0",
        review: "",
        images: []
    })

    const updateImages = (newImages) => {
        setFormState({
            ...formState,
            images: newImages
        });
    };

    const handleSubmit = () => {
        saveReviewToDatabase()
        updateRatingOfTypeRoom()
        updatePayment()
        history.push("/manager/lichSuThanhToan")
    };

    const saveReviewToDatabase = async () => {
        const reviewData = {
            tenKhachHang: user?.ten,
            CCCD: user?.CCCD,
            anhDaiDien: user?.img || "/images/ava.png",
            tenLoaiPhong: typeRoom.roomType,
            maLoaiPhong: typeRoom.maLoaiPhong,
            chiNhanh: typeRoom.branch,
            dsPhong: typeRoom.rooms.map(room => room.maPhong).join('-'),
            ngayBatDau: startDate,
            ngayKetThuc: endDate,
            ngayDanhGia: new Date(),
            soSao: formState.star.toString(),
            danhGia: formState.review,
            images: formState.images
        };

        const response = await api.addReview(reviewData);
        return response;
    };

    const updateRatingOfTypeRoom = async () => {
        const currentTotalStars = parseFloat(typeRoom.soSao) * parseInt(typeRoom.slDanhGia);
        const newTotalReviews = parseInt(typeRoom.slDanhGia) + 1;
        const newTotalStars = currentTotalStars + formState.star;
        const newAverageStars = newTotalStars / newTotalReviews;

        typeRoom.slDanhGia = newTotalReviews.toString();
        typeRoom.soSao = newAverageStars.toFixed(1).toString();

        await api.updateKindOfRoom(typeRoom, typeRoom.Id)
    }

    const updatePayment = async () => {
        typeRoom.rooms.forEach(async (room) => {
            await api.updateBill({ daDanhGia: true }, room.Id);
        });
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
                    <textarea value={formState.review} onChange={(e) => setFormState({
                        ...formState,
                        review: e.target.value
                    })} />
                    {typeRoom.startDate}

                </div>
                <Rating
                    name=""
                    value={parseFloat(formState.star)}
                    onChange={(event, newValue) => {
                        setFormState({
                            ...formState,
                            star: newValue
                        });
                    }}
                />
                <ResponsiveGalleryImage updateImages={updateImages} uploadedImages={formState.images} isRead={true} />


                <button onClick={handleSubmit}>Gửi đánh giá</button>
            </div>
        </div>
    )
}
export default AddReview