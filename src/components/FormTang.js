import React, { useState, useContext, useEffect } from "react";
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'
import Select from "react-select";

export const FormTang = ({
  closeModal,
  onSubmit,
  defaultValue,
  blocks
}) => {
  const { user } = useContext(AuthContext);
  const [roomTypes, setRoomTypes] = useState([]);
  const [formState, setFormState] = useState(
    defaultValue || {
      maTang: "",
      tenTang: "",
      chiNhanh: "",
      toa: blocks[0].tenToa || "",
      tenLoaiPhong: "",
      dsPhong: "",
      donGia: ""
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.maTang != "" &&
      formState.tenTang != "" &&
      formState.tenLoaiPhong != "" &&
      formState.dsPhong != ""
    ) {
      //const isIdExists = tang.some(
      //(t) => t.maTang == formState.maTang
      //);
      //if (!defaultValue && isIdExists) {
      //setErrors(
      // "Tầng này đã tồn tại! Vui lòng nhập một tầng khác."
      //);
      // } else if (formState.phanTram > 100 || formState.phanTram <= 0) {
      //   setErrors("Phần trăm giảm giá phải lớn hơn 0 và không lớn hơn 100");
      //   return false;
      // } else if (formState.TGBatDau >= formState.TGKetThuc) {
      //   setErrors(
      //     "Thời gian kết thúc phải lớn hơn hoặc bằng thời gian bắt đầu 1 ngày"
      //   );
      //   return false;
      // } else if (new Date() > formState.TGKetThuc) {
      //   setErrors("Thời gian kết thúc phải là sau ngày hôm nay");
      //   return false;
      // } else {
      // setErrors("");
      // return true;
      // }
      //else {
      setErrors("");
      return true;
      //}
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "maTang":
              errorFields.push("Mã tầng");
              break;
            case "tenTang":
              errorFields.push("Tên tầng");
              break;
            case "loaiPhong":
              errorFields.push("Loại phòng");
              break;
            default:
              break;
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
      return false;
    }
  };

  useEffect(() => {
    getAllRoomTypes();
    //getAllBlocks();
  }, []);

  const getAllRoomTypes = async () => {
    const roomTypes = await api.getAllKindOfRoom();
    const fil = roomTypes.filter((item, idx) => item.chiNhanh === user?.chinhanh)
    setRoomTypes(fil);
  }


  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };
  const isNumberPress = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 86) {
    } else {
      const validKeyForPayment = ["-", "."];
      if (validKeyForPayment.includes(e.key)) {
        e.preventDefault();
      }
    }
  };
  const isNumberCopy = (e) => {
    let data = e.clipboardData.getData("text");
    if (data.match(/[^\d]/)) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="col-sm-4 modal1">
        <form>
          <div>
            <div className="mb-2"><b>Tòa</b></div>
            <select
              className="form-select pb-2 pt-2 mb-2"
              id="type"
              name="toa"
              onChange={handleChange}
              value={formState.toa}
            >
              {blocks.map((item, index) => {
                return (
                  <option key={index} value={item.tenToa}>
                    {item.tenToa}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-2">
            <b>Mã tầng</b>
          </div>
          <input
            name="maTang"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            value={formState.maTang}
          />
          <div className="mb-2">
            <b>Tên tầng</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            name="tenTang"
            onChange={handleChange}
            type="text"
            value={formState.tenTang}
          />
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Loại phòng
          </div>
          <Select
            className="mb-2"
            value={
              roomTypes
                .find((item) => `${item.tenLoaiPhong}` == `${formState.tenLoaiPhong}`) || ""
            }
            onChange={(value) =>
              value !== null
                ? setFormState({
                  ...formState,
                  maLoaiPhong: `${value.maLoaiPhong}`,
                  tenLoaiPhong: `${value.tenLoaiPhong}`,
                  donGia: `${value.donGia}`
                })
                : setFormState({ ...formState, maLoaiPhong: "", tenLoaiPhong: "", donGia: "" })
            }
            options={roomTypes}
            isClearable
            getOptionLabel={(item) => `${item.tenLoaiPhong}`}
            getOptionValue={(item) => item}
            placeholder=""
          />
          <div className="mb-2"><b>Danh sách phòng</b></div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            name="dsPhong"
            onChange={handleChange}
            type="text"
            value={formState.dsPhong}
          />

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <div className="text-end">
            <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#905700", color: "#FFFFFF" }} onClick={handleSubmit}>
              Lưu
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};
