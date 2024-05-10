import React, { useState } from 'react';

const RoomStatus = {
  EMPTY: { label: 'Phòng trống', color: '#4c683f', backcolor: '#293822'},
  OCCUPIED: { label: 'Đang ở', color: '#2596be', backcolor: '#19637e'},
  DEPOSIT: { label: 'Đã đặt', color: '#878500', backcolor: '#bab700'},
  CHECK_OUT_DUE: { label: 'Sắp check out', color: '#Af2c4e', backcolor: '#721d33'},
  CHECK_IN_SOON: { label: 'Sắp check in', color: '#e28743', backcolor: '#bc611d'},
};

const RoomColor = {
  EMPTY: '#4c683f', //green
  OCCUPIED: '#2596be', //blue
  DEPOSIT: '#bab700', //yellow
  CHECK_OUT_DUE: '#Af2c4e', //red
  CHECK_IN_SOON: '#e28743' //orange
};

const roomsData = [
  { id: 1, status: RoomStatus.EMPTY, thoigianbatdau: '18/12/2024' , thoigianketthuc: '19/12/2024' },
  { id: 2, status: RoomStatus.OCCUPIED, thoigianbatdau: '18/12/2024' , thoigianketthuc: '22/12/2024'  },
  { id: 3, status: RoomStatus.DEPOSIT , thoigianbatdau: '19/12/2024' , thoigianketthuc: '24/12/2024'  },
  { id: 4, status: RoomStatus.CHECK_OUT_DUE, thoigianbatdau: '16/12/2024' , thoigianketthuc: '18/12/2024'  },
  { id: 5, status: RoomStatus.CHECK_IN_SOON, thoigianbatdau: '18/12/2024' , thoigianketthuc: '22/12/2024'  }
  // Add more rooms as needed
];

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
      <p style={{color: '#fff', fontSize: '24px'}}>Trạng thái phòng: <b>{room.status.label} </b>  </p>
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

const RoomManage = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [rooms, setRooms] = useState(roomsData);

  const filteredRooms = rooms.filter(room => room.id <= selectedFloor * 5 && room.id > (selectedFloor - 1) * 5);

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

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="mb-2"><b>Thời gian bắt đầu</b></div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            type="date"
            name="TGBatDau"
            id="TGBatDau"
            //onChange={}
          />
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="mb-2"><b>Thời gian kết thúc</b></div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            type="date"
            name="TGKetThuc"
            id="TGKetThuc"
            //onChange={}
          />
        </div>
        <div className="text-end">
          <button
            //onClick={}
            className="btn pb-2 pt-2 mt-3 mb-3 me-3"
            style={{ backgroundColor: "#905700", color: "#FFFFFF" }}>
            Tìm kiếm
          </button>
        </div>
        </div>
      <div>
        {Array.from({ length: 5 }, (_, index) => (
          <button  
            className="btn pb-2 pt-2 mt-3 mb-3 me-3"
            style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
            key={index} onClick={() => setSelectedFloor(index + 1)}>
            Tầng {index + 1}
            {/* ({filteredRooms.filter(room => room.id <= (index + 1) * 10 && room.id > index * 10).length} rooms) */}
          </button>
        ))}
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
          rooms={filteredRooms}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          onDeposit={handleDeposit}
        />
      </div>
    </div>
  );
};

export default RoomManage;
