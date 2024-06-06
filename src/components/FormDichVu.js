import React, { useState } from "react";
import moment from "moment";

export const FormDichVu = ({
  closeModal,
  onSubmit,
  defaultValue,
  washingMachine,
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      MaLichGiat: "",
      TenKhachHang: "",
      SDT: "",
      Gio: "",
      date: "",
      email: "",
      giaTien: "",
      tinhTrang: "",
      name: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.TenKhachHang != "" &&
      formState.SDT != "" &&
      formState.Gio != "" &&
      formState.date != "" &&
      formState.email != "" &&
      formState.giaTien != "" &&
      formState.tinhTrang != "" &&
      formState.name != "" &&
      formState.MaLichGiat != ""
    ) {
      // const isIdExists = washingMachine.some(
      //   (w) => w.Gio == formState.Gio
      // );
      // if (!defaultValue && isIdExists) {
        if (!defaultValue ) {
        setErrors(
          "Lịch này đã tồn tại! Vui lòng nhập một mã giảm giá khác."
        );
        return false;
      } else if (formState.phanTram > 100 || formState.phanTram <= 0) {
        setErrors("Phần trăm giảm giá phải lớn hơn 0 và không lớn hơn 100");
        return false;
      } else if (formState.TGBatDau >= formState.TGKetThuc) {
        setErrors(
          "Thời gian kết thúc phải lớn hơn hoặc bằng thời gian bắt đầu 1 ngày"
        );
        return false;
      } else if (new Date() > formState.TGKetThuc) {
        setErrors("Thời gian kết thúc phải là sau ngày hôm nay");
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
            case "MaLichGiat":
              errorFields.push("Mã lịch giặt");
              break;
            case "TenKhachHang":
              errorFields.push("Tên khách hàng");
              break;
            case "Gio":
              errorFields.push("Giờ");
              break;
            case "date":
              errorFields.push("Ngày");
              break;
            case "SDT":
              errorFields.push("Số điện thoại");
              break;
            case "name":
              errorFields.push("Máy giặt sấy");
              break;
            case "giaTien":
              errorFields.push("Giá tiền");
              break;
            case "tinhTrang":
              errorFields.push("Tình trạng");
              break;
            case "email":
              errorFields.push("Email");
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
        <form style={{height:'400px' , overflowY: 'auto'}}>
           <div className="mb-2">
            <b>Mã lịch giặt</b>
          </div>
          <input
            name="MaLichGiat"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            value={formState.MaLichGiat}
          />
          <div className="mb-2">
            <b>Tên khách hàng</b>
          </div>
          <input
            name="tenKhachHnag"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            value={formState.TenKhachHang}
          />
          <div className="mb-2">
            <b>Số điện thoại</b>
          </div>
          <input
            type="number"
            name="SDT"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            value={formState.SDT}
            onKeyDown={isNumberPress}
            onPaste={isNumberCopy}
          />
          <div className="mb-2">
            <b>Giờ</b>
          </div>
          <select
            className="form-select pb-2 pt-2 mb-2"
            aria-label="Giờ"
            id="Gio"
            name="Gio"
            value={formState.Gio}
            onChange={handleChange}
          >
            <option value="9:00-11:00">9:00-11:00</option>
            <option selected value="11:00-13:00">
              11:00-13:00
            </option>
            <option value="13:00-15:00">13:00-15:00</option>
            <option value="15:00-17:00">15:00-17:00</option>
          </select>
          <div className="mb-2">
            <b>Ngày</b>
          </div>
          <input
            className="form-control pb-2 pt-2 mb-2"
            name="date"
            onChange={handleChange}
            type="date"
            value={formState.date}
            min={moment().format("YYYY-MM-DD")}
          />
          <div className="mb-2">
            <b>Email</b>
          </div>
          <input
            name="email"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            value={formState.email}
          />
          <div className="mb-2">
            <b>Giá tiền</b>
          </div>
          <input
            type="number"
            name="giaTien"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            value={formState.giaTien}
            onKeyDown={isNumberPress}
            onPaste={isNumberCopy}
          />
          
          <div className="mb-2">
            <b>Tình trạng</b>
          </div>
          <select
            className="form-select pb-2 pt-2 mb-2"
            aria-label="Giờ"
            id="tinhTrang"
            name="tinhTrang"
            value={formState.tinhTrang}
            onChange={handleChange}
          >
            <option value="Đã đặt lịch">Đã đặt lịch</option>
            <option selected value="Đã nhận đồ">
              Đã nhận đồ
            </option>
            <option value="Đã giặt xong">Đã giặt xong</option>
            <option value="Đã trả đồ - Hoàn thành">Đã trả đồ - Hoàn thành</option>
          </select>
          <div className="mb-2">
            <b>Máy</b>
          </div>
          <select
            className="form-select pb-2 pt-2 mb-2"
            aria-label="Giờ"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          >
            <option value=">Máy giặt sấy 1">Máy giặt sấy 1</option>
            <option selected value=">Máy giặt sấy 2">
            Máy giặt sấy 2
            </option>
            <option value=">Máy giặt sấy 3">Máy giặt sấy 3</option>
          </select>
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
