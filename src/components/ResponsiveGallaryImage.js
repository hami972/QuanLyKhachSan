import React, { useState, useEffect } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../hook/FirebaseConfig.js";

const ResponsiveGalleryImage = ({ updateImages, uploadedImages, isRead }) => {

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
                                        const fileType = fileItem.type.startsWith('video/') ? 'video' : 'image';
                                        resolve({ url: downloadURL, type: fileType });
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
        <div className="gallery-flex-grid">
            {images.map((image, index) => (
                <div className="gallery-flex-item" key={index}>
                    {image.type === 'video' ? (
                        <video controls>
                            <source src={image.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={image.url} onClick={() => handleImageClick(image)} />
                    )}
                    {isRead && (<button type="button" className="delete-btn-images" onClick={() => handleDeleteImage(index)}>
                        <i className="fa-solid fa-xmark" style={{ color: "#ebe9e4" }}></i>
                    </button>)}
                </div>
            ))}
            {isRead && (<div className="gallery-flex-grid gallery-add-image-container">
                <div className='add-image-form'>
                    <input id="imageIcon" type="file" multiple accept="image/*,video/mp4" onChange={(e) => addImage(e)} />
                </div>
            </div>)}
            {selectedImage && (
                <div className="image-modal">
                    <div className="image-modal-content">
                        {selectedImage.type === 'video' ? (
                            <video controls>
                                <source src={selectedImage.url} type="video/mp4" />
                            </video>
                        ) : (
                            <img src={selectedImage.url} alt="Selected content" />
                        )}
                        <button className="close-modal" onClick={closeModalImage}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResponsiveGalleryImage;
