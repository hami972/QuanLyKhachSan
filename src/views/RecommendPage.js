import React, { useState, useEffect, useContext } from 'react';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider';
import { NavLink } from "react-router-dom";
import FloatInEffect from '../components/FloatInEffect';

const RecommendPage = () => {

    const { user } = useContext(AuthContext);

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from APIs
                const [roomTypes, bookedRooms] = await Promise.all([
                    api.getAllKindOfRoom(),
                    api.getAllBookedRoom()
                ]);

                // Process data
                const itemSimilarityMatrix = calculateItemSimilarityMatrix(roomTypes, bookedRooms);
                const currentUser = user?.CCCD // search by CCCD
                const recs = getItemBasedRecommendations(roomTypes, itemSimilarityMatrix, currentUser);

                // Chỉnh sửa recs để chứa đầy đủ thông tin của mỗi loại phòng
                const fullRecommendations = recs.map(roomTypeName => {
                    // Tìm thông tin của loại phòng từ roomTypes
                    const roomType = roomTypes.find(roomType => roomType.tenLoaiPhong === roomTypeName);
                    return roomType; // Trả về đối tượng đầy đủ thông tin của loại phòng
                });

                setRecommendations(fullRecommendations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to calculate item similarity matrix
    const calculateItemSimilarityMatrix = (roomTypes, bookedRooms) => {
        const similarityMatrix = {};

        // Loop through all room types
        roomTypes.forEach(roomTypeA => {
            similarityMatrix[roomTypeA.tenLoaiPhong] = {};
            roomTypes.forEach(roomTypeB => {
                if (roomTypeA.tenLoaiPhong !== roomTypeB.tenLoaiPhong) {
                    // Calculate similarity based on shared bookings (maDatPhong) and clicks (soLanClick)
                    const sharedInteractions = calculateSharedInteractions(roomTypeA.tenLoaiPhong, roomTypeB.tenLoaiPhong, bookedRooms, roomTypes);
                    similarityMatrix[roomTypeA.tenLoaiPhong][roomTypeB.tenLoaiPhong] = sharedInteractions;
                }
            });
        });

        console.log("A", similarityMatrix)

        return similarityMatrix;
    };

    // Function to calculate shared interactions between two room types
    const calculateSharedInteractions = (roomTypeNameA, roomTypeNameB, bookedRooms, roomTypes) => {
        // Filter booked rooms for each room type
        const bookedRoomsA = bookedRooms.filter(room => room.tenLoaiPhong === roomTypeNameA);
        const bookedRoomsB = bookedRooms.filter(room => room.tenLoaiPhong === roomTypeNameB);

        // Count shared interactions between two room types
        let sharedInteractions = 0;

        // Create a set of CCCD for rooms of roomTypeA
        const CCCDSetA = new Set(bookedRoomsA.map(room => room.CCCD));

        // Calculate shared bookings (maDatPhong)
        bookedRoomsB.forEach(roomB => {
            if (CCCDSetA.has(roomB.CCCD)) {
                sharedInteractions += 1; // Increment for each shared booking
            }
        });

        // Calculate shared clicks (soLanClick)
        const clickedRoomTypeA = roomTypes.find(roomType => roomType.tenLoaiPhong === roomTypeNameA);
        const clickedRoomTypeB = roomTypes.find(roomType => roomType.tenLoaiPhong === roomTypeNameB);
        if (clickedRoomTypeA && clickedRoomTypeB) {
            const totalClicksA = clickedRoomTypeA.clickArr.reduce((total, click) => total + click.soLanClick, 0);
            const totalClicksB = clickedRoomTypeB.clickArr.reduce((total, click) => total + click.soLanClick, 0);
            sharedInteractions += Math.min(totalClicksA, totalClicksB);
        }

        console.log(sharedInteractions);

        return sharedInteractions;
    };
    // Function to get item-based recommendations
    const getItemBasedRecommendations = (roomTypes, itemSimilarityMatrix, currentUser) => {
        const recommendedRooms = {};

        // Loop through all room types
        roomTypes.forEach(roomType => {
            // Calculate recommendation score for each room type
            recommendedRooms[roomType.tenLoaiPhong] = 0;
            roomTypes.forEach(clickedRoomType => {
                recommendedRooms[roomType.tenLoaiPhong] += itemSimilarityMatrix[clickedRoomType.tenLoaiPhong][roomType.tenLoaiPhong] || 0;
            });
        });

        console.log("Recommended Rooms:", recommendedRooms);

        // Sort recommended rooms by score and return all
        const topRecommendations = Object.entries(recommendedRooms)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
            .map(([roomTypeName]) => roomTypeName)
            .slice(0, 5)

        console.log("Top Recommendations:", topRecommendations);

        return topRecommendations;
    };

    const getRatingDescription = (rating) => {
        rating = parseFloat(rating);
        if (rating >= 1 && rating < 2) return "Cực tệ";
        if (rating >= 2 && rating < 3) return "Tệ";
        if (rating >= 3 && rating < 4) return "Bình thường";
        if (rating >= 4 && rating < 5) return "Tốt";
        if (rating === 5) return "Cực tốt";
        return "";
    };

    return (
        <section className='container mt-4'>
            <h3 align="center">Một số loại phòng trong khách sạn</h3>
            <div className='mt-4'>
                {recommendations.map((item, index) => {
                    return (
                        <FloatInEffect key={index}>
                            <div className={`wrapperRoom mb-4 ${index % 2 === 0 ? '' : 'ms-auto'}`}>
                                <img alt="" src={item?.images && item.images[0]} style={{ width: "100%" }} />
                                <div className='p-3'>
                                    <div>
                                        <h5>{item.tenLoaiPhong}</h5>
                                    </div>
                                    <div className='row g-2 pb-3'>
                                        <div className='col-auto' style={{ backgroundColor: "yellow", borderRadius: "5px" }}>{item.soSao}</div>
                                        <div className='col-auto' >{getRatingDescription(item.soSao)}</div>
                                        <div className='col-auto spaceText' style={{ color: "gray" }}>{item.slDanhGia} đánh giá</div>
                                    </div>
                                </div>
                            </div>
                        </FloatInEffect>
                    )
                })}
            </div>
            <h4 align="center"><NavLink to="/services" className="text-decoration-none customLink" style={{ color: "#000" }}>Xem thêm &rarr;</NavLink></h4>
        </section>
    );
};


export default RecommendPage