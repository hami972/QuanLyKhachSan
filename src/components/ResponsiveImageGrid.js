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
        const newFiles = Array.from(files);
        setFile((prevFiles) => [...prevFiles, ...newFiles]);
    };

    useEffect(() => {
        const upload = async () => {
            if (file.length === 0) return;

            setUploaded(true);

            try {
                const uploadTasks = file.map(async (fileItem) => {
                    const name = new Date().getTime() + fileItem.name;
                    const storageRef = ref(storage, name);
                    const uploadTask = uploadBytesResumable(storageRef, fileItem);

                    return new Promise((resolve, reject) => {
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setPercentUploaded(`Upload ${Math.round(progress)}%`);
                            },
                            reject,
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref)
                                    .then((downloadURL) => {
                                        resolve(downloadURL);
                                    })
                                    .catch(reject);
                            }
                        );
                    });
                });

                const urls = await Promise.all(uploadTasks);
                const updatedImages = [...images, ...urls];
                setImages(updatedImages);
                updateImages(updatedImages);
            } catch (error) {
                console.error("Error uploading images:", error);
            } finally {
                setUploaded(false);
                setFile([]);
            }
        };

        upload();
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