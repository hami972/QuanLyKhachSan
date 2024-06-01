import React, { useState, useEffect } from "react";
import Select from "react-select";
import Api from "../api/Api";

export const FormBookingSchedule = ({
  closeModal,
  onSubmit,
  onDelete,
  defaultValue,
  flag,
}) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.TenKhachHang !== "" && formState.SDT !== "") {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value === "") {
          switch (key) {
            case "TenKhachHang":
              errorFields.push("Tên khách hàng");
              break;
            case "SDT":
              errorFields.push("Số điện thoại");
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

  const handleDelete = (e) => {
    e.preventDefault();

    onDelete(formState);

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
      <div
        className="col-sm-4 modal1"
        style={{ overflowY: "auto", height: "80%" }}
      >
        <form>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Tên khách hàng
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="TenKhachHang"
            onChange={handleChange}
            value={formState.TenKhachHang}
          />
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Số điện thoại
          </div>
          <input
            className="form-control pb-2 pt-2 mb-3"
            name="SDT"
            onChange={handleChange}
            value={formState.SDT}
            onKeyDown={isNumberPress}
            onPaste={isNumberCopy}
          />
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Máy giặt sấy:
          </div>
          <div
            className="form-control pb-2 pt-2 mb-2"
            style={{ minHeight: "40px" }}
          >
            {formState.name}
          </div>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Ngày đặt:
          </div>
          <div
            className="form-control pb-2 pt-2 mb-2"
            style={{ minHeight: "40px" }}
          >
            {formState.date}
          </div>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Giờ:
          </div>
          <div
            className="form-control pb-2 pt-2 mb-2"
            style={{ minHeight: "40px" }}
          >
            {formState.Gio}
          </div>
          <div className="mb-2" style={{ fontWeight: "500" }}>
            Email:
          </div>
          <div
            className="form-control pb-2 pt-2 mb-2"
            style={{ minHeight: "40px" }}
          >
            {formState.email}
          </div>

          {errors && <div className="error">{errors}</div>}
          {flag === "add" && (
            <div className="text-end">
              <button
                type="button"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2"
                style={{ color: "#0096FF", border: "1px solid #0096FF" }}
                onClick={() => closeModal()}
              >
                Hủy
              </button>

              <button
                type="submit"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2"
                style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                onClick={handleSubmit}
              >
                Lưu
              </button>
            </div>
          )}
          {flag === "edit" && (
            <div className="text-end">
              <button
                type="button"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2 me-2"
                style={{ color: "#0096FF", border: "1px solid #0096FF" }}
                onClick={handleDelete}
              >
                Xóa lịch hẹn
              </button>

              <button
                type="submit"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2"
                style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }}
                onClick={handleSubmit}
              >
                Cập nhật
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
