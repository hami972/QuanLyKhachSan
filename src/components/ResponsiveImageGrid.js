import React, { useState, useEffect } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../hook/FirebaseConfig.js";

const ResponsiveImageGrid = ({ updateImages, uploadedImages }) => {

    // change image
    const storage = getStorage(app);
    const [file, setFile] = useState([]);
    const [images, setImages] = useState(uploadedImages);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploaded, setUploaded] = useState(true);
    const [percentUploaded, setPercentUploaded] = useState("");
    const addImage = (e) => {
        const files = e.target.files;

        // Tạo một mảng mới để lưu trữ danh sách các tệp
        const fileList = [];

        // Lặp qua mảng các tệp và đọc từng tệp một
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = (readerEvent) => {
                // Thêm tệp đã đọc vào mảng fileList
                fileList.push({
                    name: files[i].name,
                    dataURL: readerEvent.target.result
                });

                // Nếu đã đọc hết tất cả các tệp, thực hiện việc đặt state
                if (fileList.length === files.length) {
                    // Cập nhật state cho file và images với mảng fileList
                    setFile(fileList);
                    setImages([...images, ...fileList.map(file => file.dataURL)]);
                    updateImages([...images, ...fileList.map(file => file.dataURL)]);
                }
            };

            reader.readAsDataURL(files[i]);
        }
    };

    useEffect(() => {
        const upload = () => {
            setUploaded(false);

            // Lặp qua mỗi tệp trong fileList và thực hiện việc tải lên cho từng tệp
            file.forEach((fileItem) => {
                const name = new Date().getTime() + fileItem.name;
                const storageRef = ref(storage, name);

                const uploadTask = uploadBytesResumable(storageRef, fileItem);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setPercentUploaded("Upload " + Math.round(progress) + "%");
                    },
                    (error) => { },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            const updatedImages = [...images, downloadURL];
                            setImages(updatedImages);
                            updateImages(updatedImages);
                            setUploaded(true);
                        });
                    }
                );
            });
        };

        // Nếu fileList không rỗng, thực hiện việc tải lên
        file.length > 0 && upload();
    }, [file]);

    const handleDeleteImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        updateImages(updatedImages);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModalImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="masonry-grid">
            {images.map((image, index) => (
                <div className="masonry-item" key={index}>
                    <img src={image} onClick={() => handleImageClick(image)} />
                    <button type="button" className="delete-btn-images" onClick={() => handleDeleteImage(index)}>
                        <i className="fa-solid fa-xmark" style={{ color: "#ebe9e4" }}></i>
                    </button>
                </div>
            ))}
            <div className="masonry-item add-image-container">
                <div className='add-image-form'>
                    <input id="imageIcon" type="file" multiple accept="image/*" onChange={(e) => addImage(e)} />
                </div>
            </div>
            {selectedImage && (
                <div className="image-modal">
                    <div className="image-modal-content">
                        <img src={selectedImage} />
                        <button className="close-modal" onClick={closeModalImage}>Close</button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ResponsiveImageGrid;