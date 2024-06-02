import React, { useState, useContext, useEffect } from "react";
import ResponsiveImageGrid from "../views/ResponsiveImageGrid";
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'

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
  branches
}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maLoaiPhong: '',
      tenLoaiPhong: '',
      donGia: '',
      soLuongNguoiToiDa: '',
      viewPhong: '',
      dienTich: '',
      images: '',
      coSoVatChat: defaultCoSoVatChat.map((item) => ({ name: item, quantity: 0 })),
    }
  );
  const { user } = useContext(AuthContext);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    getMaterials();
  }, []);

  const updateImages = (newImages) => {
    setFormState({
      ...formState,
      images: newImages
    });
  };

  const getMaterials = async () => {
    const materials = await api.getAllMaterials()
    if (user?.Loai !== 'ChuHeThong') {
      const fil = materials.filter((item, idx) => item.chiNhanh === user?.chinhanh)
      setMaterials(fil);
    }
    else {
      setMaterials(materials);
    }
  }

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.maLoaiPhong != "" &&
      formState.tenLoaiPhong != "" &&
      formState.dienTich != "" &&
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
            case "tenLoaiPhong":
              errorFields.push("Tên loại phòng");
              break;
            case "dienTich":
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

  // add materials in room type
  const [items, setItems] = useState([{ facility: '', quantity: '' }]);

  const handleAddItem = () => {
    setItems([...items, { facility: '', quantity: '' }]);
  };

  const handleChangeItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="col-11 modal1" style={{ height: '80%', overflowY: 'auto' }}>
        <form>
          <div className="row">
            <div className='col-lg-4 col-md-6'>
              <div className="mb-2"><b>Mã loại phòng</b></div>
              <input
                name="maLoaiPhong"
                className="form-control pb-2 pt-2 mb-2"
                onChange={handleChange1}
                value={formState.maLoaiPhong}
              />
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className="mb-2"><b>Tên loại phòng</b></div>
              <input
                name="tenLoaiPhong"
                onChange={handleChange1}
                className="form-control pb-2 pt-2 mb-2"
                type="text"
                value={formState.tenLoaiPhong}
              />
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className="mb-2"><b>Diện tích (m2)</b></div>
              <input
                name="dienTich"
                onChange={handleChange1}
                className="form-control pb-2 pt-2 mb-2"
                type="text"
                value={formState.dienTich}
              />
            </div>
            <div className='col-lg-4 col-md-6'>
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
            </div>
            <div className='col-lg-4 col-md-6'>
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
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className="mb-2"><b>View phòng</b></div>
              <input
                name="viewPhong"
                onChange={handleChange1}
                type="text"
                value={formState.viewPhong}
                className="form-control pb-2 pt-2 mb-2"
              />
            </div>
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
            <div className="mb-2"><b>Cơ sở vật chất</b></div>
            {formState.coSoVatChat.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <input
                  type="number"
                  className="form-control pb-2 pt-2 mb-2"
                  placeholder={`Nhập số lượng`}
                  value={item.quantity}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}

            {items.map((item, index) => (
              <div key={index}>
                <select
                  value={item.facility}
                  onChange={(e) => handleChangeItem(index, 'facility', e.target.value)}
                >
                  <option value="">-- Select Facility --</option>
                  {/* Option items here */}
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                />
                <button type="button" onClick={() => handleRemoveItem(index)}>X</button>
              </div>
            ))}
            <button type="button" onClick={handleAddItem}>Add</button>

          </div>

          <div className="mb-2"><b>Ảnh phòng</b></div>
          <ResponsiveImageGrid updateImages={updateImages} />



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
