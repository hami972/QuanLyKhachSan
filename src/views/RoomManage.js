import React, { useState, useEffect } from 'react';
import api from '../api/Api';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import moment from 'moment'; 
import { FormTang } from '../components/FormTang';

const RoomStatus = {
  EMPTY: { label: 'Phòng trống', color: '#4c683f', backcolor: '#293822'},
  OCCUPIED: { label: 'Đang ở', color: '#2596be', backcolor: '#19637e'},
  DEPOSIT: { label: 'Đã đặt', color: '#878500', backcolor: '#bab700'},
  CHECK_OUT_DUE: { label: 'Sắp check out', color: '#Af2c4e', backcolor: '#721d33'},
  CHECK_IN_SOON: { label: 'Sắp check in', color: '#e28743', backcolor: '#bc611d'},
};

const roomsData = [];

const Room = ({ room, onCheckIn, onCheckOut, onDeposit }) => {
  let button;
  switch (room.status) {
    case RoomStatus.EMPTY:
      button = <button className='btn pb-2 pt-2 mt-3 mb-3 me-3' style={{backgroundColor: '#fff'}} onClick={() => onCheckIn(room)}>Check In</button>;
      break;
    case RoomStatus.OCCUPIED:
      button = <button className='btn pb-2 pt-2 mt-3 mb-3 me-3' style={{backgroundColor: '#fff'}} onClick={() => onCheckOut(room)}>Check Out</button>;
      break;
    case RoomStatus.DEPOSIT:
      button = <button className='btn pb-2 pt-2 mt-3 mb-3 me-3' style={{backgroundColor: '#fff'}} onClick={() => onCheckIn(room)}>Check In</button>;
      break;
    case RoomStatus.CHECK_OUT_DUE:
      button = <button className='btn pb-2 pt-2 mt-3 mb-3 me-3' style={{backgroundColor: '#fff'}} onClick={() => onCheckOut(room)}>Check Out</button>;
      break;
    case RoomStatus.CHECK_IN_SOON:
      button = <button className='btn pb-2 pt-2 mt-3 mb-3 me-3' style={{backgroundColor: '#fff'}} onClick={() => onCheckIn(room)}>Check In</button>;
      break;
    default:
      button = null;
  }
  return (
    <div style={{ backgroundColor: room.status.color, padding: '10px', margin: '5px', border: '5px solid', borderColor: room.status.backcolor,
    padding: '10px',
    borderTopRightRadius: '25px',
    borderTopLeftRadius: '25px',
    borderBottomWidth: 'thin', }}>
      <p style={{color: '#fff', fontSize: '30px'}}>Phòng {room.id}</p> 
      <p style={{color: '#fff', fontSize: '24px'}}>Trạng thái phòng: <b>{room.status.label} </b>
      Họ tên khách hàng: {room.tenKhachHang}
      
      </p>
      {button}
    </div>
  );
};

const Floor = ({ floor, rooms, onCheckIn, onCheckOut, onDeposit }) => {
  return (
    <div>
      <h3>Tầng {floor}</h3>
      <div>
        {rooms.map(room => (
          <Room key={room.id} room={room} onCheckIn={onCheckIn} onCheckOut={onCheckOut} onDeposit={onDeposit} />
        ))}
      </div>
    </div>
  );
};

const RoomManage = (props) => {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [rooms, setRooms] = useState(roomsData);
  const [bookedRoom, setBookedRoom]= useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tang, setTang] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
});
  useEffect(() => {
    getAllFloors();
    getAllBookedRoom();
  }, []);

  const createRoomsData = (input, bookedRoom) => {
    const ids = input.split('-');  // Tách chuỗi đầu vào thành mảng các id
    const today = searchCriteria.startDate;  // Ngày hôm nay theo định dạng 'DD-MM-YYYY'
    const tomorrow = searchCriteria.endDate;  // Ngày mai theo định dạng 'DD-MM-YYYY'
  
    const roomsData = ids.map(id => ({
      id: id, 
      status: RoomStatus.EMPTY,  // Trạng thái mặc định là EMPTY
      ngayBatDau: today,  // Ngày bắt đầu là hôm nay mặc định or ngày đươc chọn
      ngayKetThuc: tomorrow,  // Ngày kết thúc là ngày mai 
      tenKhachHang: "",
      mail: "",
      CCCD: "",
      soDienThoai: "",
    }));
    
    const updatedRooms = roomsData.map(room => {
      const booking = bookedRoom.find(booked => booked.tenPhong === room.id);
      if (booking) {
        const now = moment();
        const checkInTime = moment(booking.ngayBatDau).set({ hour: 12, minute: 0, second: 0 });
        const checkOutTime = moment(booking.ngayKetThuc);

        if (now.isAfter(checkInTime) && now.isBefore(checkOutTime)) {
          return { ...room, status: RoomStatus.OCCUPIED, ngayBatDau: booking.ngayBatDau, ngayKetThuc: booking.ngayKetThuc, tenKhachHang: booking.tenKhachHang, CCCD: booking.CCCD, soDienThoai: booking.soDienThoai, mail: booking.mail };
        } else if (now.isBefore(checkInTime)) {
          return { ...room, status: RoomStatus.DEPOSIT, ngayBatDau: booking.ngayBatDau, ngayKetThuc: booking.ngayKetThuc, tenKhachHang: booking.tenKhachHang, CCCD: booking.CCCD, soDienThoai: booking.soDienThoai, mail: booking.mail };
        } else if (now.isSame(moment(booking.ngayBatDau), 'day') && now.isBefore(checkInTime)) {
          return { ...room, status: RoomStatus.CHECK_IN_SOON, ngayBatDau: booking.ngayBatDau, ngayKetThuc: booking.ngayKetThuc, tenKhachHang: booking.tenKhachHang, CCCD: booking.CCCD, soDienThoai: booking.soDienThoai, mail: booking.mail };
        }
      }
    return { ...room, status: RoomStatus.EMPTY, ngayBatDau: today, ngayKetThuc: tomorrow };
    });

    return updatedRooms;
  };

  const handleFloorClick = (row) => {
    setSelectedFloor(row.tenTang);
    setRooms(createRoomsData(row.tenPhong,bookedRoom));
  };

  const getAllFloors = async () => {
    const tang = await api.getAllFloors();
    setTang(tang);
  }
  const getAllBookedRoom = async () => {
    const bookedRoom = await api.getAllBookedRoom();
    setBookedRoom(bookedRoom);
  }
  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa tầng này không?');
    if (shouldDelete) {
        setTang(tang.filter((_, idx) => idx !== targetIndex));
        api.deleteKindOfRoom(tang[targetIndex].Id);
    }
  };

  const handleEditRow = (idx) => {
      setRowToEdit(idx);
      setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
      console.log(newRow);
      if (rowToEdit == null) {
          const id = await api.addFloor(newRow);
          newRow.Id = id;
          setTang([...tang, newRow]);
      }
      else {
          api.updateFloor(newRow, newRow.Id);
          let updateFloor = tang.map((currRow, idx) => {
              if (idx !== rowToEdit) return currRow;
              return newRow;
          })
          setTang(updateFloor);
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'startDate') {
      setSearchCriteria({
        ...searchCriteria,
        startDate: value,
        endDate: moment(value).add(1, 'days').format('YYYY-MM-DD'),
      });
    } else if (name === 'endDate') {
      setSearchCriteria({
        ...searchCriteria,
        endDate: value,
      });
    }
    
  };

  const handleCheckIn = room => {
    // Logic to handle check in
    console.log(`Checked in room ${room.id}`);
    const updatedRooms = rooms.map(r => (r.id === room.id ? { ...r, status: RoomStatus.OCCUPIED } : r));
    setRooms(updatedRooms);
  };

  const handleCheckOut = room => {
    // Logic to handle check out
    console.log(`Checked out room ${room.id}`);
    const updatedRooms = rooms.map(r => (r.id === room.id ? { ...r, status: RoomStatus.EMPTY } : r));
    setRooms(updatedRooms);
  };

  const handleDeposit = room => {
    // Logic to handle room deposit
    console.log(`Room ${room.id} deposited`);
    const updatedRooms = rooms.map(r => (r.id === room.id ? { ...r, status: RoomStatus.DEPOSIT } : r));
    setRooms(updatedRooms);
  };
  // const onSearch = () => {
  // const { startDate } = searchCriteria;
  // const endDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');

  // const filteredBookedRooms = bookedRoom.filter(room =>
  //   moment(room.ngayBatDau).isSameOrBefore(startDate) && moment(room.ngayKetThuc).isSameOrAfter(startDate)
  // );

  // const updatedRooms = rooms.map(room => {
  //   const booking = filteredBookedRooms.find(booked => booked.tenPhong === room.id);
  //   if (booking) {
  //     const now = moment();
  //     const checkInTime = moment(booking.ngayBatDau).set({ hour: 12, minute: 0, second: 0 });
  //     const checkOutTime = moment(booking.ngayKetThuc);

  //     if (now.isAfter(checkInTime) && now.isBefore(checkOutTime)) {
  //       return { ...room, status: RoomStatus.OCCUPIED, ngayBatDau: booking.ngayBatDau, ngayKetThuc: booking.ngayKetThuc };
  //     } else if (now.isBefore(checkInTime)) {
  //       return { ...room, status: RoomStatus.DEPOSIT, ngayBatDau: booking.ngayBatDau, ngayKetThuc: booking.ngayKetThuc };
  //     } else if (now.isSame(moment(booking.ngayBatDau), 'day') && now.isBefore(checkInTime)) {
  //       return { ...room, status: RoomStatus.CHECK_IN_SOON, ngayBatDau: booking.ngayBatDau, ngayKetThuc: booking.ngayKetThuc };
  //     }
  //   }
  //   return { ...room, status: RoomStatus.EMPTY, ngayBatDau: startDate, ngayKetThuc: endDate };
  // });

  // setRooms(updatedRooms);
  // };
  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="mb-2"><b>Thời gian</b></div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            type="date"
            name="startDate"
            value={searchCriteria.startDate}
            onChange={handleChange}
            min={moment().format('YYYY-MM-DD')}
          />
        </div>
      
        <div className="text-end">
          {/* <button
            onClick={onSearch()}
            className="btn pb-2 pt-2 mt-3 mb-3 me-3"
            style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>
            Tìm kiếm
          </button> */}
          <button
            onClick={() => setModalOpen(true)}
            className="btn pb-2 pt-2 mt-3 mb-3 me-3"
            style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>
            Thêm tầng
          </button>
        </div>
       
        </div>
      <div>
        {tang.map((row, index) =>  {
          return (
            <div>
              <button  
                className="btn pb-2 pt-2 mt-3 mb-3 me-3"
                style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
                key={index} 
                onClick={() => handleFloorClick(row)}>
                Tầng {row.tenTang}
              </button>
              <BsFillTrashFill
                  className="delete-btn"
                  onClick={() => handleDeleteRow(index)}
              />
              <BsFillPencilFill
                  className="edit-btn"
                  onClick={() => handleEditRow(index)}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex' }}>
      {Object.values(RoomStatus).map(status => (
        <div key={status.label} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: status.color, marginRight: '10px' }}></div>
          <p className='mt-3'>{status.label}</p>
        </div>
      ))}
    </div> 
      <div>
        <Floor
          floor={selectedFloor}
          rooms={rooms}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          onDeposit={handleDeposit}
        />
      </div> 
      {
       modalOpen && (
        <FormTang
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
            }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && tang[rowToEdit]}
          kindOfRoom={tang}
          />
                )
            }
    </div>
  );
};

export default RoomManage;
