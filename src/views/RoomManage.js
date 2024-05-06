import React, { useState } from 'react';

const RoomStatus = {
  EMPTY: 'Trống',
  OCCUPIED: 'Đang ở',
  DEPOSIT: 'Đặt cọc',
  CHECK_OUT_DUE: 'Đến hạn check out',
  CHECK_IN_SOON: 'Sắp check in'
};

const RoomColor = {
  EMPTY: 'green',
  OCCUPIED: 'blue',
  DEPOSIT: 'yellow',
  CHECK_OUT_DUE: 'red',
  CHECK_IN_SOON: 'orange'
};

const roomsData = [
  { id: 1, status: RoomStatus.EMPTY },
  { id: 2, status: RoomStatus.OCCUPIED },
  { id: 3, status: RoomStatus.DEPOSIT },
  { id: 4, status: RoomStatus.CHECK_OUT_DUE },
  { id: 5, status: RoomStatus.CHECK_IN_SOON }
  // Add more rooms as needed
];

const Room = ({ room, onCheckIn, onCheckOut, onDeposit }) => {
  let button;
  switch (room.status) {
    case RoomStatus.EMPTY:
      button = <button onClick={() => onCheckIn(room)}>Check In</button>;
      break;
    case RoomStatus.OCCUPIED:
      button = <button onClick={() => onCheckOut(room)}>Check Out</button>;
      break;
    case RoomStatus.DEPOSIT:
      button = <button onClick={() => onCheckIn(room)}>Check In</button>;
      break;
    case RoomStatus.CHECK_OUT_DUE:
      button = <button onClick={() => onCheckOut(room)}>Check Out</button>;
      break;
    case RoomStatus.CHECK_IN_SOON:
      button = <button onClick={() => onCheckIn(room)}>Check In</button>;
      break;
    default:
      button = null;
  }
  return (
    <div style={{ backgroundColor: RoomColor[room.status], padding: '10px', margin: '5px' }}>
      Room {room.id}: {room.status}
      {button}
    </div>
  );
};

const Floor = ({ floor, rooms, onCheckIn, onCheckOut, onDeposit }) => {
  return (
    <div>
      <h3>{floor}</h3>
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

  const filteredRooms = rooms.filter(room => room.id <= selectedFloor * 10 && room.id > (selectedFloor - 1) * 10);

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
      <div>
        {Array.from({ length: 10 }, (_, index) => (
          <button key={index} onClick={() => setSelectedFloor(index + 1)}>
            Floor {index + 1} ({filteredRooms.filter(room => room.id <= (index + 1) * 10 && room.id > index * 10).length} rooms)
          </button>
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
