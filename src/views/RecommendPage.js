import React, { useState, useEffect } from 'react';
import api from '../api/Api';

const RecommendPage = () => {

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
                const currentUser = '066303007350'; // replace with current user id
                const recs = getItemBasedRecommendations(roomTypes, itemSimilarityMatrix, currentUser);

                // Set recommendations state
                console.log("rec", recs)
                setRecommendations(recs);
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

    return (
        <div>
            <h1>Recommended Room Types</h1>
            <ul>
                {recommendations.map(roomTypeName => (
                    <li key={roomTypeName}>{roomTypeName}</li>
                ))}
            </ul>
        </div>
    );
};


export default RecommendPage