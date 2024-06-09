import React, { useState, useContext, useEffect } from "react";
import ResponsiveMansonryGrid from "./ResponsiveMasonryGrid";
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider'
import Select from "react-select";

export const FormLoaiPhong = ({
  closeModal,
  onSubmit,
  defaultValue,
  kindOfRoom,
  branches
}) => {
  const { user } = useContext(AuthContext);
  const [formState, setFormState] = useState(
    defaultValue || {
      maLoaiPhong: '',
      tenLoaiPhong: '',
      donGia: '',
      soLuongNguoiToiDa: '',
      viewPhong: '',
      dienTich: '',
      images: [],
      coSoVatChat: [],
      chiNhanh: user?.Loai === 'ChuHeThong' && branches.length > 0 ? branches[0].tenChiNhanh : user?.chinhanh,
    }
  );
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
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChangeBranch = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      coSoVatChat: []
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

  const handleAddMaterial = () => {
    setFormState({
      ...formState,
      coSoVatChat: [...formState.coSoVatChat, { maCSVC: '', tenCSVC: '', soLuong: '', icon: '' }]
    });
  };

  const handleChangeMaterialQuantity = (index, key, value) => {
    const newMaterials = [...formState.coSoVatChat];
    newMaterials[index][key] = value;
    setFormState({
      ...formState,
      coSoVatChat: newMaterials
    });
  };

  const handleChangeMaterial = (index, selectedOption) => {
    const updatedMaterials = [...formState.coSoVatChat];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      maCSVC: selectedOption?.maCSVC || '',
      tenCSVC: selectedOption?.tenCSVC || '',
      icon: selectedOption?.icon || ''
    };
    setFormState({
      ...formState,
      coSoVatChat: updatedMaterials
    });
  };

  const handleRemoveMaterial = (index) => {
    const newMaterials = [...formState.coSoVatChat];
    newMaterials.splice(index, 1);
    setFormState({
      ...formState,
      coSoVatChat: newMaterials
    });
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="col-lg-6 col-11 modal1" style={{ height: '80%', overflowY: 'auto' }}>
        <form>
          <div className="row">
            <div className='col-lg-6'>
              <div className="mb-2"><b>Mã loại phòng</b></div>
              <input
                name="maLoaiPhong"
                className="form-control pb-2 pt-2 mb-2"
                onChange={handleChange}
                value={formState.maLoaiPhong}
              />
            </div>
            <div className='col-lg-6'>
              <div className="mb-2"><b>Tên loại phòng</b></div>
              <input
                name="tenLoaiPhong"
                onChange={handleChange}
                className="form-control pb-2 pt-2 mb-2"
                type="text"
                value={formState.tenLoaiPhong}
              />
            </div>
            <div className='col-lg-6'>
              <div className="mb-2"><b>Diện tích (m2)</b></div>
              <input
                name="dienTich"
                onChange={handleChange}
                className="form-control pb-2 pt-2 mb-2"
                type="text"
                value={formState.dienTich}
              />
            </div>
            <div className='col-lg-6'>
              <div className="mb-2"><b>Đơn giá</b></div>
              <input
                name="donGia"
                className="form-control pb-2 pt-2 mb-2"
                onChange={handleChange}
                type="number"
                value={formState.donGia}
                onKeyDown={isNumberPress}
                onPaste={isNumberCopy}
              />
            </div>
            <div className='col-lg-6'>
              <div className="mb-2"><b>Số lượng người tối đa</b></div>
              <input
                name="soLuongNguoiToiDa"
                onChange={handleChange}
                type="number"
                value={formState.soLuongNguoiToiDa}
                className="form-control pb-2 pt-2 mb-2"
                onKeyDown={isNumberPress}
                onPaste={isNumberCopy}
              />
            </div>
            <div className='col-lg-6'>
              <div className="mb-2"><b>View phòng</b></div>
              <input
                name="viewPhong"
                onChange={handleChange}
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
                onChange={handleChangeBranch}
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
            <div className="row">
              {formState.coSoVatChat.map((material, index) => (
                <div key={index} className="row">
                  <Select
                    className="mb-2 col-lg-7"
                    placeholder="Nhập tên CSVC"
                    value={
                      materials
                        .filter((item) => item.chiNhanh === formState.chiNhanh)
                        .find((item) => `${item.maCSVC} - ${item.tenCSVC}` === `${material.maCSVC} - ${material.tenCSVC}`) || ""
                    }
                    onChange={(selectedOption) => handleChangeMaterial(index, selectedOption)
                    }
                    options={materials
                      .filter((item) => item.chiNhanh === formState.chiNhanh)
                      .filter((item) => !formState.coSoVatChat.some((cs) => cs.maCSVC === item.maCSVC))}
                    isClearable
                    getOptionLabel={(item) => `${item.maCSVC} - ${item.tenCSVC}`}
                    getOptionValue={(item) => item}
                  />
                  <div className="mb-2 col-lg-4">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Số lượng"
                      value={material.soLuong}
                      min={1}
                      onChange={(e) => handleChangeMaterialQuantity(index, 'soLuong', e.target.value)}
                    />
                  </div>
                  <div className="col-auto mb-2">
                    <button type="button" className="delete-btn-base" onClick={() => handleRemoveMaterial(index)}>
                      <i className="fa-solid fa-xmark" style={{ color: "#ebe9e4" }}></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-end">
                <button type="button" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
                  onClick={handleAddMaterial}>
                  Thêm
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2 mt-2"><b>Ảnh phòng</b></div>
          <ResponsiveMansonryGrid updateImages={updateImages} uploadedImages={formState.images} />



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
