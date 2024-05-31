import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../hook/AuthProvider";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../hook/FirebaseConfig.js";

export const FormCSVC = ({
  closeModal,
  onSubmit,
  defaultValue,
  branches,
}) => {
  const { user } = useContext(AuthContext);
  const [formState, setFormState] = useState(
    defaultValue || {
      maCSVC: "",
      tenCSVC: "",
      icon: "",
      chiNhanh: "",
    }
  );
  const [errors, setErrors] = useState("");

  // change image
  const storage = getStorage(app);
  const [file, setFile] = useState(null);
  const [isUploaded, setUploaded] = useState(true);
  const [percentUploaded, setPercentUploaded] = useState("");
  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      //setFile(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setFile(e.target.files[0])
      setFormState({ ...formState, icon: readerEvent.target.result })
    }
  };

  const validateForm = () => {
    if (
      formState.maCSVC != "" &&
      formState.tenCSVC != "" &&
      formState.icon != ""
    ) {
      setErrors("");
      return true;
    }
    else {
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
            case "icon":
              errorFields.push("Icon minh họa");
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

  useEffect(() => {

    const upload = () => {
      setUploaded(false)
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log("Upload is " + progress + "% done");
          setPercentUploaded("Upload " + Math.round(progress) + "%")
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormState({ ...formState, icon: downloadURL })
            setUploaded(true)
          });
        }
      );
    };

    file && upload();
  }, [file]);

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
          <div className="mb-2"><b>Mã CSVC</b></div>
          <input
            name="maCSVC"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            value={formState.maCSVC}
          />
          <div className="mb-2"><b>Tên CSVC</b></div>
          <input
            name="tenCSVC"
            className="form-control pb-2 pt-2 mb-2"
            onChange={handleChange}
            type="text"
            value={formState.tenCSVC}
          />
          <div className="mb-2"><b>Icon minh họa</b></div>
          <label htmlFor="imageIcon">
            <img src={formState?.icon || "img_facility.png"} class="imageFacility" style={{ width: "100%" }} />
          </label>
          <input id="imageIcon" type="file" accept="image/*" style={{ opacity: 0 }} onChange={(e) => addImage(e)} />

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
            <button type="submit" className="btn pb-2 pt-2 ps-3 pe-3" style={{ backgroundColor: "#905700", color: "#FFFFFF" }} onClick={handleSubmit}>
              Lưu
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};
