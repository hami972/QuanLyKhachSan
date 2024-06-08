import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../hook/AuthProvider';
import api from "../api/Api";
import { useHistory } from 'react-router-dom';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [kindOfRoom, setKindOfRoom] = useState([]);
    const [bills, setBills] = useState([]);
    const [dailyRoomInfo, setDailyRoomInfo] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getBills()
    }, []);


    const getBills = async () => {
        const bills = await api.getAllBills();
        const kindOfRoom = await api.getAllKindOfRoom()
        const filteredBills = bills.filter(b => {
            return b.CCCD === user?.CCCD && b.tinhTrang === 'Đã thanh toán';
        });
        //setBills(filteredBills);
        processDailyRoomInfo(filteredBills, kindOfRoom);
    };

    const processDailyRoomInfo = (bills, kindOfRoom) => {

        const groupedByDateRange = bills.reduce((acc, room) => {
            const dateRange = `${room.ngayCheckIn}/${room.ngayCheckOut}`;
            if (!acc[dateRange]) {
                acc[dateRange] = [];
            }
            acc[dateRange].push(room);
            return acc;
        }, {});

        const result = Object.keys(groupedByDateRange).map(dateRange => {
            const [startDate, endDate] = dateRange.split("/");
            const rooms = groupedByDateRange[dateRange];

            const groupedByRoomTypeAndBranch = rooms.reduce((acc, room) => {
                const room_type = kindOfRoom.find(type => type.tenLoaiPhong === room.tenLoaiPhong && type.chiNhanh === room.chiNhanh);
                const key = `${room.tenLoaiPhong}-${room.chiNhanh}`;
                if (!acc[key]) {
                    acc[key] = {
                        ...room_type,
                        roomType: room.tenLoaiPhong, branch: room.chiNhanh, count: 0, rooms: [], daDanhGia: room.daDanhGia
                    };
                }
                acc[key].count++;
                acc[key].rooms.push({ maPhong: room.maPhong, Id: room.Id }); //Id là docId của hóa đơn 
                return acc;
            }, {});

            const roomTypesArray = Object.values(groupedByRoomTypeAndBranch);

            return {
                startDate,
                endDate,
                roomTypes: roomTypesArray
            };
        });

        setDailyRoomInfo(result);
        console.log("result", result)
    };

    const addReviewForRoomType = (roomTypeInfo, dayInfo) => {
        history.push({
            pathname: '/danhGiaLoaiPhong',
            state: {
                typeRoom: roomTypeInfo,
                startDate: dayInfo.startDate,
                endDate: dayInfo.endDate
            }
        });
    }

    const reviewComment = (roomTypeInfo, dayInfo) => {
        history.push({
            pathname: '/xemLaiDanhGia',
            state: {
                typeRoom: roomTypeInfo,
                startDate: dayInfo.startDate,
                endDate: dayInfo.endDate
            }
        });
    }

    return (
        <div>
            <div>
                <h1>Lịch sử thanh toán</h1>
                {/* Render dailyRoomInfo */}
                {dailyRoomInfo.map((dayInfo, index) => (
                    <div key={index}>
                        <h2>{dayInfo.startDate}</h2>
                        {dayInfo.roomTypes.map(roomTypeInfo => (
                            <div key={`${roomTypeInfo.roomType}-${roomTypeInfo.branch}`} >
                                <h3>{`Loại phòng: ${roomTypeInfo.roomType} - Chi nhánh: ${roomTypeInfo.branch}`}</h3>
                                <p>{`Số lượng đặt: ${roomTypeInfo.count}`}</p>
                                <p>{`Danh sách phòng: ${roomTypeInfo.rooms.join(', ')}`}</p>
                                {!roomTypeInfo.daDanhGia ?
                                    <button onClick={() => addReviewForRoomType(roomTypeInfo, dayInfo)}>Đánh giá</button> :
                                    <button onClick={() => reviewComment(roomTypeInfo, dayInfo)}>Xem đánh giá</button>
                                }

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div >
    )
};

export default PaymentHistory;
