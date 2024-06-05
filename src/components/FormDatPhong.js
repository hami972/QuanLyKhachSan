import React, { useState, useContext, useEffect } from "react";
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'
import Select from "react-select";

export const FormDatPhong = ({
    closeModal,
    onSubmit,
    defaultValue,
}) => {
    const { user } = useContext(AuthContext);
    const [roomTypes, setRoomTypes] = useState([]);
    const [formState, setFormState] = useState(
        defaultValue || {
            tang: "",
            chiNhanh: "",
            toa: "",
            tenLoaiPhong: "",
            maPhong: "",
            soDienThoai: "",
            CCCD: "",
            tinhTrang: "",
            email: "",
            tenKhachHang: ""
        }
    );
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (
            formState.soDienThoai != "" &&
            formState.CCCD != "" &&
            formState.email != "" &&
            formState.tenKhachHang != ""
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
                        case "tenKhachHang":
                            errorFields.push("Tên khách hàng");
                            break;
                        case "CCCD":
                            errorFields.push("CCCD");
                            break;
                        case "Email":
                            errorFields.push("Email");
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
                    <div className="mb-2">
                        <b>Tòa</b>
                    </div>
                    <div
                        name="toa"
                        className="form-control pb-2 pt-2 mb-2"
                        onChange={handleChange}
                        value={formState.toa}
                    ></div>
                    <div className="mb-2">
                        <b>Tầng</b>
                    </div>
                    <div
                        name="tang"
                        className="form-control pb-2 pt-2 mb-2"
                        onChange={handleChange}
                        value={formState.tang}
                    ></div>
                    <div className="mb-2">
                        <b>Loại phòng</b>
                    </div>
                    <div
                        name="tenLoaiPhong"
                        className="form-control pb-2 pt-2 mb-2"
                        onChange={handleChange}
                        value={formState.tenLoaiPhong}
                    ></div>
                    <div className="mb-2"><b>Danh sách phòng</b></div>
                    <input
                        className="form-control pb-2 pt-2 mb-2"
                        name="tenKhachHang"
                        onChange={handleChange}
                        type="text"
                        value={formState.tenKhachHang}
                    />
                    <div className="mb-2"><b>Tên khách hàng</b></div>
                    <input
                        className="form-control pb-2 pt-2 mb-2"
                        name="tenKhachHang"
                        onChange={handleChange}
                        type="text"
                        value={formState.tenKhachHang}
                    />
                    <div className="mb-2"><b>CCCD</b></div>
                    <input
                        className="form-control pb-2 pt-2 mb-2"
                        name="CCCD"
                        onChange={handleChange}
                        type="text"
                        value={formState.CCCD}
                    />
                    <div className="mb-2"><b>Email</b></div>
                    <input
                        className="form-control pb-2 pt-2 mb-2"
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={formState.email}
                    />
                    <div className="mb-2"><b>Email</b></div>
                    <input
                        className="form-control pb-2 pt-2 mb-2"
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={formState.email}
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
