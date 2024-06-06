import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { FormBookingSchedule } from "../components/FormBookingSchedule";
import api from "../api/Api";
import { AuthContext } from '../hook/AuthProvider';
import NotificationModal from "../components/NotificationModal";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const BookingOnline = () => {
  const { user } = useContext(AuthContext);
  const [nameWashingMachine, setNameWashingMachine] = useState([
    {
      name: "Máy giặt sấy 1",
      image: "/images/wash.jpg",
      giaTien: "170.000",
      trongLuongToiDa: "9kg",
    },
    {
      name: "Máy giặt sấy 2",
      image: "/images/wash.jpg",
      giaTien: "170.000",
      trongLuongToiDa: "9kg",
    },
    {
      name: "Máy giặt sấy 3",
      image: "/images/wash.jpg",
      giaTien: "170.000",
      trongLuongToiDa: "9kg",
    },
  ]);

  const [workTime, setWorkTime] = useState([
    { gio: "9:00-11:00" },
    { gio: "11:00-13:00" },
    { gio: "13:00-15:00" },
    { gio: "15:00-17:00" },
    { gio: "17:00-19:00" },
  ]);

  const [searchCriteria, setSearchCriteria] = useState({
    startDate: moment().format('YYYY-MM-DD'),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [washingMachine, setWashingMachine] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [flag, setFlag] = useState("");
  const [showNoti, setShowNoti] = useState(false);
  const [notiBody, setNotiBody] = useState("");

  useEffect(() => {
      getWashingMachine();
  }, []);

  const getWashingMachine = async () => {
    try {
      const washingMachine = await api.getWashingMachine();
      setWashingMachine(washingMachine);
    } catch (error) {
      console.error('Error fetching washing machines:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };  

  const handleDeleteRow = (targetIndex) => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa không?');
    if (shouldDelete) {
      let foundKeys = -1;
      washingMachine.forEach((value, key) => {
        if (value.MaLichGiat === targetIndex.MaLichGiat) {
          foundKeys=key;
        }
      });
      setWashingMachine(washingMachine.filter((_, idx) => idx !== foundKeys));
      api.deleteWashingMachine(washingMachine[foundKeys].Id);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit == null && flag==="add") {
      const id = await api.addWashingMachine(newRow);
      newRow.id = id;
      setWashingMachine([...washingMachine, newRow]);
    } else {
      api.updateWashingMachine(newRow, newRow.Id);
      const updatedMachines = washingMachine.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        return newRow;
      });
      setWashingMachine(updatedMachines);
    }
  };

  const filteredWashingMachine = washingMachine.filter(machine => machine.date === searchCriteria.startDate);

  const setItemToEdit = (worktime, machine) => {
    const filteredMachine = washingMachine.find(m => m.Gio === worktime.gio && m.date === searchCriteria.startDate);

    // Only allow setting the item to edit if the machine is booked by the current user or is available
    if (filteredMachine) {
      if (filteredMachine.email !== user.email) {
      setFlag("edit");
      return;
      }
      setFlag("edit");
      setSelectedItem({
        ...filteredMachine,
        MaLichGiat: filteredMachine.MaLichGiat,
        tenKhachHang: filteredMachine.tenKhachHang,
        SDT: filteredMachine.SDT,
        email: filteredMachine.email,
        Gio: filteredMachine.Gio,
        date: filteredMachine.date,
        tinhTrang: filteredMachine.tinhTrang,
      });
    } else {
      setFlag("add");
      setSelectedItem({
        ...machine,
        MaLichGiat: Math.floor(Math.random() * 100001),
        email: user.email,
        Gio: worktime.gio,
        date: searchCriteria.startDate,
        tinhTrang: "Đã đặt lịch",
      });
    }

    

    setModalOpen(true);
  };

  return (
    <div>
      {/* <TopNav /> */}
      <div className="col-lg-4 col-md-8" style={{marginLeft: '200px'}}>
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
      <div style={{ minHeight: "150px" }}>
        {nameWashingMachine.map((item, index) => (
          <div
            className="row p-2 m-3"
            style={{
              border: "2px solid grey",
              borderRadius: "5px",
              boxShadow: "3px 3px #888888",
              marginTop: "50px",
              height: "250px",
            }}
            key={index}
          >
            <div className="col-lg-6 mt-2">
              <div className="row justify-content-center align-items-center">
                <div className="col-auto mt-4">
                  <img
                    alt=""
                    src={item.image}
                    style={{ borderRadius: "50%", width: "100px" }}
                  />
                </div>
                <div className="col-3 mt-4" >
                  <div>{item.name}</div>
                  <div>Giá tiền: {item.giaTien}</div>
                  <div>Số lượng kg tối đa: {item.trongLuongToiDa}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="datepicker-wrp">
                <button className="btn btnIconDate">
                  <img alt="" src="/images/dropdown.png" />
                </button>
              </div>
              <div
                style={{
                  height: "340px",
                  overflowY: "auto",
                  fontWeight: "bold",
                }}
              >
                <div className="row ms-0 me-0" style={{ fontWeight: "bold" }}>
                  {workTime.map((worktime, idx) => {
                    const machine = filteredWashingMachine.find(
                      m => m.Gio === worktime.gio & m.name === item.name
                    );
                    let bgColor = "#0096FF"; // Default blue color

                    if (machine) {
                      if (machine.email === user.email) {
                        bgColor = "#FF0000"; // Red color for user's machine
                      } else {
                        bgColor = "#bfbfbf"; // Grey color for booked machine
                      }
                    }
                  

                    return (
                      <div className="col-auto" style={{ cursor: "default" }} key={idx}>
                        <div
                          className="mt-3 p-2"
                          style={{
                            backgroundColor: bgColor,
                          }}
                          onClick={() =>
                            bgColor !== "#bfbfbf" && setItemToEdit(worktime, item)
                          }
                        >
                          {worktime.gio}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {modalOpen && (
          <FormBookingSchedule
            closeModal={() => {
              setModalOpen(false);
              setSelectedItem(null);
            }}
            onSubmit={handleSubmit}
            onDelete={handleDeleteRow}
            defaultValue={selectedItem}
            flag={flag}
          />
        )}
      </div>
      <Footer style={{ marginTop: 0 }} />
      <NotificationModal
        show={showNoti}
        onHide={() => setShowNoti(false)}
        title="RoyalHotel"
        message={notiBody}
      />
    </div>
  );
};

export default BookingOnline;
