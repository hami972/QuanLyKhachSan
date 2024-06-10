import './style.css'
import React, { useEffect, useState } from 'react';
import api from '../api/Api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FloatInEffect from '../components/FloatInEffect';

const IntroductionRoomType = (props) => {

    const [kindOfRooms, setKindOfRooms] = useState([])

    useEffect(() => {
        getAllKindOfRoom();
    }, []);

    const getAllKindOfRoom = async () => {
        const kindOfRoom = await api.getAllKindOfRoom();
        setKindOfRooms(kindOfRoom);
    }

    const getRatingDescription = (rating) => {
        rating = parseFloat(rating);
        if (rating >= 1 && rating < 2) return "Cực tệ";
        if (rating >= 2 && rating < 3) return "Tệ";
        if (rating >= 3 && rating < 4) return "Bình thường";
        if (rating >= 4 && rating < 5) return "Tốt";
        if (rating === 5) return "Cực tốt";
        return "";
    };

    return (

        <section className='container mt-4'>
            <h3 align="center">Một số loại phòng trong khách sạn</h3>
            <div className='mt-4'>
                {kindOfRooms.slice(0, 5).map((item, index) => {
                    return (
                        <FloatInEffect key={index}>
                            <div className={`wrapperRoom mb-4 ${index % 2 === 0 ? '' : 'ms-auto'}`}>
                                <img loading="lazy" alt="" src={item?.images && item.images[0]} style={{ width: "100%" }} />
                                <div className='p-3'>
                                    <div>
                                        <h5>{item.tenLoaiPhong}</h5>
                                    </div>
                                    <div className='row g-2 pb-3'>
                                        <div className='col-auto' style={{ backgroundColor: "yellow", borderRadius: "5px" }}>{item.soSao}</div>
                                        <div className='col-auto' >{getRatingDescription(item.soSao)}</div>
                                        <div className='col-auto spaceText' style={{ color: "gray" }}>{item.slDanhGia} đánh giá</div>
                                    </div>
                                </div>
                            </div>
                        </FloatInEffect>
                    )
                })}
            </div>

        </section>
    );
};
export default IntroductionRoomType;