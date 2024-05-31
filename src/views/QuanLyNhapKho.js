import React, { useState, useEffect, useContext } from 'react';
import './mistyles.css';
import api from "../api/Api";
import { AuthContext } from '../hook/AuthProvider'
const QuanLyNhapKho = (props) => {
  const { user } = useContext(AuthContext);
  const [kindOfRoom, setKindOfRoom] = useState([]);
  const [tang, setFloors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(user?.chinhanh || "Tất cả");
  const [dangSuDungThietBi, setDangSuDungThietBi] = useState([]);

  useEffect(() => {
    getAllKindOfRoom();
    getAllFloors();
    getBranches();
  }, []);

  useEffect(() => {
    if (tang.length > 0 && kindOfRoom.length > 0) {
      updateThietBiList();
    }
  }, [tang, kindOfRoom, selectedBranch]);

  const getAllFloors = async () => {
    const floors = await api.getAllFloors();
    setFloors(floors);
  };

  const getAllKindOfRoom = async () => {
    const rooms = await api.getAllKindOfRoom();
    setKindOfRoom(rooms);
  };

  const getBranches = async () => {
    const branches = await api.getAllBranchs();
    setBranches([{ tenChiNhanh: "Tất cả" }, ...branches]);
  };

  const handleChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const updateThietBiList = () => {
    let thietBiList = [];

    tang.forEach((floor) => {
      if (selectedBranch === "Tất cả" || floor.chiNhanh === selectedBranch) {
        const rooms = floor.tenPhong.split('-').map(room => room.trim());
        const roomType = kindOfRoom.find(room => room.maLoaiPhong === floor.maLoaiPhong);

        if (roomType) {
          roomType.coSoVatChat.forEach(item => {
            const existingItem = thietBiList.find(thietBi => thietBi.name === item.name);
            if (existingItem) {
              existingItem.quantity += item.quantity * rooms.length;
            } else {
              thietBiList.push({
                name: item.name,
                quantity: item.quantity * rooms.length,
              });
            }
          });
        }
      }
    });

    setDangSuDungThietBi(thietBiList);
  };

  return (
    <div>
      <div className='text-end'>

        <div className='col-lg-5 col-md-8'>
          <b style={{ align: "left" }}>Chi nhánh: </b>
          <select
            className="form-select pb-2 pt-2 mt-2"
            id="type"
            name="chiNhanh"
            onChange={handleChange}
            value={selectedBranch}
          >
            {user?.Loai === 'ChuHeThong' ? branches.map((item, index) => (
              <option key={index} value={item.tenChiNhanh}>
                {item.tenChiNhanh}
              </option>
            )) :
              <option value={user?.chinhanh}>
                {user?.chinhanh}
              </option>
            }
          </select>
        </div>

      </div>
      <table className="table">
        <thead style={{ verticalAlign: "middle" }}>
          <tr className="table-secondary">
            <th>STT</th>
            <th>Tên thiết bị</th>
            <th>Số lượng sử dụng</th>
          </tr>
        </thead>
        <tbody>
          {dangSuDungThietBi.map((row, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{row.name}</td>
              <td>{row.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyNhapKho;
