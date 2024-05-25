import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../hook/AuthProvider';
import api from "../api/Api";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import ReviewModal from '../components/ReviewModal'; // This component will handle review submissions

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      if (user?.Loai === "KhachHang") {
        const rooms = await api.getAllBookedRoom();
        const filteredRooms = rooms.filter(room => room.mail === user.email );
        setBookedRooms(filteredRooms);
      }
    };
    fetchBookedRooms();
  }, [user]);

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = async (review) => {
    // Update the review in the database using the API
    await api.submitReview(selectedBooking.id, review);
    setShowReviewModal(false);
    setSelectedBooking(null);
  };

  return (
    <div>
      <div className="container mt-5 pb-5">
        <h2 className="mt-3 mb-3" align="center" style={{ color: "#905700" }}>Lịch sử đặt phòng</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Tên phòng</th>
              <th>Ngày check-in</th>
              <th>Ngày check-out</th>
              <th>Mã tầng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookedRooms.map((booking, index) => (
              <tr key={index}>
                <td>{booking.tenPhong}</td>
                <td>{booking.ngayCheckIn}</td>
                <td>{booking.ngayCheckOut}</td>
                <td>{booking.maTang}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleReviewClick(booking)}>Đánh giá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBooking && (
        <ReviewModal
          show={showReviewModal}
          handleClose={() => setShowReviewModal(false)}
          handleSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default BookingHistory;
