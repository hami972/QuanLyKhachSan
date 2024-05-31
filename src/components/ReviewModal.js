import React, { useState } from "react";

const ReviewModal = ({ show, handleClose, handleSubmit, defaultValue, maLoaiPhong, Id }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      soSao: "",
      danhGia: "",
      maLoaiPhong,
      Id,
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.soSao !== "" && formState.danhGia !== "") {
      if (formState.soSao > 5 || formState.soSao <= 0) {
        setErrors("Số sao phải từ 1 đến 5.");
        return false;
      } else {
        setErrors("");
        return true;
      }
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value === "") {
          switch (key) {
            case "soSao":
              errorFields.push("Số sao");
              break;
            case "danhGia":
              errorFields.push("Đánh giá");
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    handleSubmit(formState);
    handleClose();
  };

  const isNumberPress = (e) => {
    const validKeyForPayment = ["-", "."];
    if (validKeyForPayment.includes(e.key)) {
      e.preventDefault();
    }
  };

  const isNumberCopy = (e) => {
    let data = e.clipboardData.getData("text");
    if (data.match(/[^\d]/)) {
      e.preventDefault();
    }
  };

  return (
    show && (
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") handleClose();
        }}
      >
        <div className="col-sm-4 modal1">
          <form onSubmit={handleSubmitForm}>
            <div className="mb-2">
              <b>Số sao</b>
            </div>
            <input
              name="soSao"
              type="number"
              className="form-control pb-2 pt-2 mb-2"
              onChange={handleChange}
              value={formState.soSao}
              onKeyDown={isNumberPress}
              onPaste={isNumberCopy}
            />
            <div className="mb-2">
              <b>Đánh giá</b>
            </div>
            <input
              className="form-control pb-2 pt-2 mb-2"
              name="danhGia"
              onChange={handleChange}
              value={formState.danhGia}
            />
            {errors && <div className="error">{errors}</div>}
            <div className="text-end">
              <button
                type="submit"
                className="btn pb-2 pt-2 ps-3 pe-3 mt-2"
                style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
