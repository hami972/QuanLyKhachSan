import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../hook/AuthProvider';
import api from "../api/Api";

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [dailyRoomInfo, setDailyRoomInfo] = useState([]);

  useEffect(() => {
    getBookedRooms()
  }, []);


  const getBookedRooms = async () => {
    const bookedRooms = await api.getAllBookedRoom();
    const kindOfRoom = await api.getAllKindOfRoom()

    const filteredBookedRooms = bookedRooms.filter(b => {
      return b.CCCD === user?.CCCD && (b.tinhTrang === 'Đặt phòng' || b.tinhTrang === 'Check-in');
    });
    setBookedRooms(filteredBookedRooms);
    processDailyRoomInfo(filteredBookedRooms, kindOfRoom);
  };

  const processDailyRoomInfo = (bookedRooms, kindOfRoom) => {

    const groupedByDateRange = bookedRooms.reduce((acc, room) => {
      const dateRange = `${room.ngayBatDau}/${room.ngayKetThuc}`;
      if (!acc[dateRange]) {
        acc[dateRange] = [];
      }
      acc[dateRange].push(room);
      return acc;
    }, {});


    const result = Object.keys(groupedByDateRange).map(dateRange => {
      const [startDate, endDate] = dateRange.split("/");
      const rooms = groupedByDateRange[dateRange];

      // Nhóm các phòng theo loại phòng và chi nhánh
      const groupedByRoomTypeAndBranch = rooms.reduce((acc, room) => {
        const room_type = kindOfRoom.find(type => type.tenLoaiPhong === room.tenLoaiPhong && type.chiNhanh === room.chiNhanh);
        const key = `${room.tenLoaiPhong}/${room.chiNhanh}`;
        if (!acc[key]) {
          acc[key] = {
            ...room_type,
            roomType: room.tenLoaiPhong, branch: room.chiNhanh, count: 0, rooms: []
          };
        }
        acc[key].count++;
        acc[key].rooms.push(room.maPhong);
        return acc;
      }, {});

      // Chuyển đổi dữ liệu đã nhóm thành mảng
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
  return (
    <div>
      <div>
      <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF" }}>
                <h3 align="center">Lịch sử đặt phòng</h3>
            </header>
        {/* Render dailyRoomInfo */}
        {dailyRoomInfo.map(dayInfo => (
            <div className="row" key={dayInfo.date}
            style={{
                backgroundColor: '#fff', alignItems: 'center', display: 'flex',
                borderRadius: '5px', borderStyle: 'groove', marginTop: '50px'
            }}>
            <h2 className='row' style={{ color: '#905700' }}>{dayInfo.date}</h2>
            <p className='row'>
            {dayInfo.roomTypes.map(roomTypeInfo => (
              <div key={`${roomTypeInfo.roomType}-${roomTypeInfo.branch}`}>
                <h3>{`Loại phòng: ${roomTypeInfo.roomType} - Chi nhánh: ${roomTypeInfo.branch}`}</h3>
                <p>{`Số lượng đặt: ${roomTypeInfo.count}`}</p>
                <p>{`Danh sách phòng: ${roomTypeInfo.rooms.join(', ')}`}</p>
              </div>
            ))}
            </p>
        </div>

          
        ))}
      </div>
    </div>
  )
};

export default BookingHistory;
