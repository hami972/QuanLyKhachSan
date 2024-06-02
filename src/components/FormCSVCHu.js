import React, { useState, useContext } from "react";
import { AuthContext } from "../hook/AuthProvider";
import moment from "moment";
import Select from "react-select";
export const FormCSVCHu = ({
    closeModal,
    onSubmit,
    defaultValue,
    branches,
    materials
}) => {
    const { user } = useContext(AuthContext);
    const [formState, setFormState] = useState(
        defaultValue || {
            maCSVC: "",
            tenCSVC: "",
            slHu: "",
            ngayGhiNhan: moment().format("YYYY-MM-DD"),
            chiNhanh: user?.Loai === 'ChuHeThong' && branches.length > 0 ? branches[0].tenChiNhanh : "",
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (
            formState.maCSVC != "" &&
            formState.tenCSVC != "" &&
            formState.slHu != "" &&
            formState.ngayGhiNhan != ""
        ) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (value == "") {
                    switch (key) {
                        case "maCSVC":
                            errorFields.push("Mã CSVC");
                            break;
                        case "tenCSVC":
                            errorFields.push("Tên CSVC");
                            break;
                        case "slHu":
                            errorFields.push("Số lượng hư");
                            break;
                        case "ngayGhiNhan":
                            errorFields.push("Ngày ghi nhận");
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
            <div
                className="col-sm-4 modal1"
            >
                <form>
                    <div className="mb-2" style={{ fontWeight: "500" }}>
                        Tên CSVC
                    </div>
                    <Select
                        className="mb-2"
                        value={
                            materials
                                .filter((item) => item.chiNhanh === formState.chiNhanh)
                                .find((item) => `${item.maCSVC} - ${item.tenCSVC}` == `${formState.maCSVC} - ${formState.tenCSVC}`) || ""
                        }
                        onChange={(value) =>
                            value !== null
                                ? setFormState({
                                    ...formState,
                                    maCSVC: `${value.maCSVC}`,
                                    tenCSVC: `${value.tenCSVC}`
                                })
                                : setFormState({ ...formState, maTenCSVC: "" })
                        }
                        options={materials.filter((item) => item.chiNhanh === formState.chiNhanh)}
                        isClearable
                        getOptionLabel={(item) => `${item.maCSVC} - ${item.tenCSVC}`}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                    <div className="mb-2"><b>Số lượng hư</b></div>
                    <input
                        name="slHu"
                        onChange={handleChange}
                        type="number"
                        value={formState.slHu}
                        onKeyDown={isNumberPress}
                        onPaste={isNumberCopy}
                        className="form-control pb-2 pt-2 mb-2"
                    />
                    <div>
                        <div className="mb-2"><b>Ngày ghi nhận</b></div>
                        <input
                            name="ngayGhiNhan"
                            onChange={handleChange}
                            className="form-control pb-2 pt-2 mb-2"
                            type="date"
                            value={formState.ngayGhiNhan}
                        />
                    </div>
                    {user?.Loai === "ChuHeThong" && (
                        <div>
                            <div className="mb-2"><b>Chi nhánh</b></div>
                            <select
                                className="form-select pb-2 pt-2 mb-2"
                                id="type"
                                name="chiNhanh"
                                onChange={handleChange}
                                value={formState.chiNhanh}
                            >
                                {branches.map((item, index) => {
                                    if (item.tenChiNhanh !== "Tất cả")
                                        return (
                                            <option key={index} value={item.tenChiNhanh}>
                                                {item.tenChiNhanh}
                                            </option>
                                        );
                                })}
                            </select>
                        </div>
                    )}

                    {errors && <div className="error">{errors}</div>}
                    <div className="text-end">
                        <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3" style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
                            onClick={handleSubmit}>
                            Lưu
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};