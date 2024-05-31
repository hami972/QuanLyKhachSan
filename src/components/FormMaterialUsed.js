import { useState } from "react";
import Select from 'react-select';
export const FormMaterialUsed = ({ closeModal, onSubmit, defaultValue, materials }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      maVatTu: "",
      tenVatTu: "",
      soLuongTonKho: "",
      donGiaNhap: "",
      NgaySuDung: "",
      SL: "",
      lyDo: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.maVatTu != '' && formState.tenVatTu != '' && formState.NgaySuDung != '' && formState.SL != '' && formState.lyDo != '') {
      const SD = formState.NgaySuDung.split('-')
      const namSD = parseInt(SD[0])
      const thangSD = parseInt(SD[1])
      const ngaySD = parseInt(SD[2])
      const currentDate = new Date();
      const Day = currentDate.getDate();
      const Month = currentDate.getMonth() + 1;
      const Year = currentDate.getFullYear();
      const vattu = materials.find(item => item.maVatTu === formState.maVatTu)
      if (parseInt(formState.SL) <= 0) {
        setErrors("Số lượng phải là một số nguyên dương lớn hơn 0.");
        return false;
      }
      else if (parseInt(formState.SL) > vattu.soLuongTonKho) {
        setErrors("Số lượng tồn kho của vật tư " + formState.tenVatTu + " chỉ còn lại " + vattu.soLuongTonKho);
        return false;
      }
      else if (namSD > Year || thangSD > Month || ngaySD > Day) {
        setErrors("Ngày tháng năm sử dụng phải là ngày trong quá khứ hoặc hiện tại.");
        return false;
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
            case 'maVatTu':
              errorFields.push("Mã Vật Tư"); break;
            case 'tenVatTu':
              errorFields.push("Tên Vật Tư"); break;
            case 'NgaySuDung':
              errorFields.push("Ngày sử dụng"); break;
            case 'SL':
              errorFields.push("Số lượng"); break;
            case 'lyDo':
              errorFields.push("Lý do"); break;
            default: break;
          }
        }
      }
      setErrors("Vui lòng nhập: " + errorFields.join(", "));
      return false;
    }
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
          <div className="mb-2"><b>Mã vật tư thiết bị</b></div>
          <Select className="mb-2"
            value={materials.find(item => item.maVatTu === formState.maVatTu) || ''}
            onChange={(value) => value !== null ? setFormState({ ...formState, maVatTu: value.maVatTu, tenVatTu: value.tenVatTu, soLuongTonKho: value.soLuongTonKho, donGiaNhap: value.donGiaNhap }) : setFormState({ ...formState, maVatTu: "", tenVatTu: "" })}
            options={materials}
            isClearable
            getOptionLabel={(item) => item.maVatTu}
            getOptionValue={(item) => item}
            placeholder=""
          />
          <div className="mb-2"><b>Tên vật tư thiết bị</b></div>
          <Select className="mb-2"
            value={materials.find(item => item.maVatTu === formState.maVatTu) || ''}
            onChange={(value) => value !== null ? setFormState({ ...formState, maVatTu: value.maVatTu, tenVatTu: value.tenVatTu, soLuongTonKho: value.soLuongTonKho, donGiaNhap: value.donGiaNhap }) : setFormState({ ...formState, maVatTu: "", tenVatTu: "" })}
            options={materials}
            isClearable
            getOptionLabel={(item) => item.tenVatTu}
            getOptionValue={(item) => item}
            placeholder=""
          />
          <div className="mb-2"><b>Ngày sử dụng</b></div>
          <input type="date" className="form-control pb-2 pt-2 mb-2" id="NgaySuDung" name="NgaySuDung" value={formState.NgaySuDung} onChange={(e) => { setFormState({ ...formState, [e.target.name]: e.target.value }) }} />
          <div className="mb-2"><b>Số lượng</b></div>
          <input type="number" className="form-control pb-2 pt-2 mb-2" min="0" max={formState.soLuongTonKho}
            onKeyDown={isNumberPress}
            onPaste={isNumberCopy}
            id="SL" name="SL" value={formState.SL} onChange={(e) => { setFormState({ ...formState, [e.target.name]: e.target.value }) }} required />
          <div className="mb-2"><b>Đơn giá nhập</b></div>
          <div className="form-control pb-2 pt-2 mb-2" style={{ minHeight: "40px" }}>{formState.donGiaNhap}</div>
          <div className="mb-2"><b>Lý do</b></div>
          <input type="text" className="form-control pb-2 pt-2 mb-2" id="lyDo" name="lyDo" value={formState.lyDo} onChange={(e) => { setFormState({ ...formState, [e.target.name]: e.target.value }) }} />
          {errors && <div className="error">{errors}</div>}

          <div className="text-end">
            <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3 mt-2" style={{ backgroundColor: "#0096FF", color: "#FFFFFF" }} onClick={(e) => handleSubmit(e)}>
              Lưu
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};
