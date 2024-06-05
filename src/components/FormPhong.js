import React, { useState } from "react";
import moment from "moment";

export const FormPhong = ({
    closeModal,
    onSubmit,
    defaultValue,
    tang,
}) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            maTang: "",
            tenTang: "",
            loaiPhong: "",
            chiNhanh: "",
            toa: "",
            soLuongPhong: "",
            tenPhong: "",
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (
            formState.maTang != "" &&
            formState.tenTang != "" &&
            formState.loaiPhong != "" &&
            formState.chiNhanh != "" &&
            formState.soLuongPhong != "" &&
            formState.tenPhong != ''

        ) {
            const isIdExists = tang.some(
                (tang) => tang.maGiamGia == formState.Tầng
            );
            if (!defaultValue && isIdExists) {
                setErrors(
                    "Tầng này đã tồn tại! Vui lòng nhập một tầng khác."
                );
                return false;
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
            }
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
                        case "chiNhanh":
                            errorFields.push("Chi nhánh");
                            break;
                        case "soLuongPhong":
                            errorFields.push("Số lượng phòng");
                            break;
                        case "tenPhong":
                            errorFields.push("Danh sách tên phòng");
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
                            {tang.map((item, index) => {
                                return (
                                    <option key={index} value={item.tenToa}>
                                        {item.tenToa}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <div className="mb-2"><b>Tầng</b></div>
                        <select
                            className="form-select pb-2 pt-2 mb-2"
                            id="type"
                            name="toa"
                            onChange={handleChange}
                            value={formState.toa}
                        >
                            {tang.map((item, index) => {
                                return (
                                    <option key={index} value={item.tenToa}>
                                        {item.tenToa}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-2">
                        <b>Mã phòng</b>
                    </div>
                    <input
                        name="maTang"
                        className="form-control pb-2 pt-2 mb-2"
                        onChange={handleChange}
                        value={formState.maTang}
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
