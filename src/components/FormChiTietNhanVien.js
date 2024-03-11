import React, { useState } from "react";

export const FormChiTietNhanVien = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      phone: "",
      position: "",
      email:"",
      basicSalary: "",
      branch: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.name && formState.phone && formState.position && formState.email && formState.branch) {
        setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
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

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="col-sm-4 modal1">
        <form>
          <div className="form-group">
            <label for="name">Họ và tên</label>
            <input name="name" 
            onChange={handleChange} 
            value={formState.name} />
          </div>
          <div className="form-group">
            <label for="phone">Số điện thoại</label>
            <input
              name="phone"
              onChange={handleChange}
              type="number"
              value={formState.phone}
            />
          </div>
          <div className="form-group">
            <label for="position">Chức vụ</label>
            <input
              name="position"
              onChange={handleChange}
              type="text"
              value={formState.position}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="text"
              value={formState.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="basicSalary">Lương cơ bản</label>
            <input
            type="number"
              name="basicSalarybasicSalary"
              onChange={handleChange}
              value={formState.basicSalary}
            />
          </div>
          <div className="form-group">
            <label htmlFor="branch">Chi nhánh làm việc</label>
            <textarea
              name="branch"
              onChange={handleChange}
              value={formState.branch}
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btnSummit" onClick={handleSubmit}>
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};
