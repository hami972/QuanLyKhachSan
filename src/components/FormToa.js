import React, { useState } from "react";
import moment from "moment";

export const FormToa = ({
    closeModal,
    onSubmit,
    defaultValue,
    toa,
}) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            maToa: "",
            tenToa: "",
            chiNhanh: "",
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (
            formState.maToa != "" &&
            formState.tenToa != ""

        ) {
            const isIdExists = toa.some(
                (t) => t.maToa == formState.maToa
            );
            if (!defaultValue && isIdExists) {
                setErrors(
                    "Tòa này đã tồn tại! Vui lòng nhập một tòa khác."
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
            else {
                setErrors("");
                return true;
            }
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (value == "") {
                    switch (key) {
                        case "maToa":
                            errorFields.push("Mã tòa");
                            break;
                        case "tenToa":
                            errorFields.push("Tên tòa");
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
                    <div className="mb-2">
                        <b>Mã tòa</b>
                    </div>
                    <input
                        name="maToa"
                        className="form-control pb-2 pt-2 mb-2"
                        onChange={handleChange}
                        value={formState.maToa}
                    />
                    <div className="mb-2">
                        <b>Tên tòa</b>
                    </div>
                    <input
                        className="form-control pb-2 pt-2 mb-2"
                        name="tenToa"
                        onChange={handleChange}
                        type="text"
                        value={formState.tenToa}
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
