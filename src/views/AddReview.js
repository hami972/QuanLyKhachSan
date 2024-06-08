
import React, { useState, useEffect } from 'react';
import './style.css';
import { useLocation, useHistory } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ResponsiveGalleryImage from '../components/ResponsiveGallaryImage';

const AddReview = () => {
    const history = useHistory();
    const location = useLocation();
    const { typeRoom } = location.state || {};

    const [formState, setFormState] = useState({
        star: 0,
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
        // Gửi dữ liệu đánh giá lên server ở đây
       // console.log("Đã gửi đánh giá: ", { rating, review, typeRoom });
        // Chuyển hướng về trang trước sau khi gửi đánh giá
        //history.goBack();
    };

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

                </div>
                <Rating
                    name=""
                    value={formState.star}
                    onChange={(event, newValue) => {
                        setFormState({
                            ...formState,
                            star: newValue
                        });
                    }}
                />
                <ResponsiveGalleryImage updateImages={updateImages} uploadedImages={formState.images} />


                <button onClick={handleSubmit}>Gửi đánh giá</button>
            </div>
        </div>
    )
}
export default AddReview