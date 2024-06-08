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
        getAllKindOfRoom();
        getBills()
    }, []);


    const getAllKindOfRoom = async () => {
        const kindOfRoom = await api.getAllKindOfRoom();
        setKindOfRoom(kindOfRoom);
    }

    const getBills = async () => {
        const bills = await api.getAllBills();
        const filteredBills = bills.filter(b => {
            return b.CCCD === user?.CCCD && b.tinhTrang === 'Đã thanh toán';
        });
        setBills(filteredBills);
        processDailyRoomInfo(filteredBills);
    };

    const processDailyRoomInfo = (bookedRooms) => {
        const filteredRooms = bookedRooms

        const groupedByDateRange = filteredRooms.reduce((acc, room) => {
            const dateRange = `${room.ngayCheckIn}/${room.ngayCheckOut}`;
            if (!acc[dateRange]) {
                acc[dateRange] = [];
            }
            acc[dateRange].push(room);
            return acc;
        }, {});

        const result = Object.keys(groupedByDateRange).map(dateRange => {
            const rooms = groupedByDateRange[dateRange];

            // Nhóm các phòng theo loại phòng và chi nhánh
            const groupedByRoomTypeAndBranch = rooms.reduce((acc, room) => {
                const key = `${room.tenLoaiPhong}-${room.chiNhanh}`;
                if (!acc[key]) {
                    acc[key] = {
                        Id: room.Id, // Id là docId của loại phòng
                        roomType: room.tenLoaiPhong, branch: room.chiNhanh, count: 0, rooms: [], daDanhGia: room.daDanhGia
                    };
                }
                acc[key].count++;
                acc[key].rooms.push({ maPhong: room.maPhong, Id: room.Id }); //Id là docId của hóa đơn 
                return acc;
            }, {});

            const roomTypesArray = Object.values(groupedByRoomTypeAndBranch);

            return {
                dateRange,
                roomTypes: roomTypesArray
            };
        });

        setDailyRoomInfo(result);
        console.log("result", result)
    };

    const addReviewForRoomType = (roomTypeInfo) => {
        history.push({
            pathname: '/danhGiaLoaiPhong',
            state: { typeRoom: roomTypeInfo }
        });
    }

    return (
        <div>
            <div>
                <h1>Lịch sử thanh toán</h1>
                {/* Render dailyRoomInfo */}
                {dailyRoomInfo.map(dayInfo => (
                    <div key={dayInfo.date}>
                        <h2>{dayInfo.date}</h2>
                        {dayInfo.roomTypes.map(roomTypeInfo => (
                            <div key={`${roomTypeInfo.roomType}-${roomTypeInfo.branch}`} onClick={() => addReviewForRoomType(roomTypeInfo)}>
                                <h3>{`Loại phòng: ${roomTypeInfo.roomType} - Chi nhánh: ${roomTypeInfo.branch}`}</h3>
                                <p>{`Số lượng đặt: ${roomTypeInfo.count}`}</p>
                                <p>{`Danh sách phòng: ${roomTypeInfo.rooms.join(', ')}`}</p>
                                {!roomTypeInfo.daDanhGia ?
                                    <button>Đánh giá</button> :
                                    <button>Xem đánh giá</button>
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
