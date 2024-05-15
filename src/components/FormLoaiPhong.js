import React, { useState } from "react";
const defaultCoSoVatChat = [
  "Giường",
  "Bàn",
  "Tủ",
  "Máy sấy",
  "Bồn tắm",
  "Đèn",
  "Gối",
  "Quạt",
  "Giương",
  "Tủ lạnh",
  "Máy lạnh",
];
export const FormLoaiPhong = ({
  closeModal,
  onSubmit,
  defaultValue,
  kindOfRoom,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maLoaiPhong: '',
      ten: '',
      donGia: '',
      soLuongNguoiToiDa: '',
      viewPhong: '',
      coSoVatChat: defaultCoSoVatChat.map((item) => ({ name: item, quantity: 0 })),
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.maLoaiPhong != "" &&
      formState.ten != "" &&
      formState.donGia != "" &&
      formState.soLuongNguoiToiDa != "" &&
      formState.viewPhong != ""
    ) {
      const isIdExists = kindOfRoom.some(
        (kindOfRoom) => kindOfRoom.maLoaiPhong == formState.maLoaiPhong
      );
      if (
        !defaultValue &&
        defaultValue.maLoaiPhong != formState.maLoaiPhong &&
        isIdExists
      ) {
        setErrors(
          "Mã loại phòng này đã tồn tại! Vui lòng nhập một mã loại phòng khác."
        );
        return false;
      } else {
        setErrors("");
        return true;
      }
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value == "") {
          switch (key) {
            case "maLoaiPhong":
              errorFields.push("Mã loại phòng");
              break;
            case "ten":
              errorFields.push("Tên loại phòng");
              break;
            case "soLuongNguoiToiDa":
              errorFields.push("Số lượng người tối đa");
              break;
            case "donGia":
              errorFields.push("Đơn giá");
              break;
            case "viewPhong":
              errorFields.push("View phòng");
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
  const handleChange1 = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newItems = [...formState.coSoVatChat];
    newItems[index].quantity = value;
    setFormState({
      ...formState,
      coSoVatChat: newItems,
    });
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
        <form style={{height:'400px' , overflowY: 'auto'}}>
          <div className="mb-2"><b>Mã loại phòng</b></div>
          <input
            name="maLoaiPhong"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange1}
            value={formState.maLoaiPhong}
          />
          <div className="mb-2"><b>Tên loại phòng</b></div>
          <input
            name="ten"
            onChange={handleChange1}
            className="form-control pb-2 pt-2 mb-2"
            type="text"
            value={formState.ten}
          />
          <div className="mb-2"><b>Đơn giá</b></div>
          <input
            name="donGia"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange1}
            type="number"
            value={formState.donGia}
            onKeyDown={isNumberPress}
            onPaste={isNumberCopy}
          />
          <div className="mb-2"><b>Số lượng người tối đa</b></div>
          <input
            name="soLuongNguoiToiDa"
            onChange={handleChange1}
            type="number"
            value={formState.soLuongNguoiToiDa}
            className="form-control pb-2 pt-2 mb-2"
            onKeyDown={isNumberPress}
            onPaste={isNumberCopy}
          />
          <div className="mb-2"><b>View phòng</b></div>
          <input
            name="viewPhong"
            onChange={handleChange1}
            type="text"
            value={formState.viewPhong}
            className="form-control pb-2 pt-2 mb-2"
          />
          <div className="mb-2"><b>Cơ sở vật chất</b></div>
          {formState.coSoVatChat.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <input
                type="number"
                className="form-control pb-2 pt-2 mb-2"
                placeholder={`Nhập số lượng ${item.name}`}
                value={item.quantity}
                onChange={(e) => handleChange(e, index)}
              />
          </div>
          ))}
          

          {errors && <div className="error">{errors}</div>}
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
