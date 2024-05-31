import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../hook/AuthProvider';
import api from "../api/Api";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import ReviewModal from '../components/ReviewModal';

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [tang, setFloors] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAdd, setIsAdd] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);

  const handleSubmit = async (newReview) => {
    if (isAdd) {
      const id = await api.addReview(newReview);
      newReview.id = id;
      setReview([...review, newReview]);
    } else {
      await api.updateReview(newReview, currentReview.id);
      const updatedReviews = review.map((currReview) => {
        if (currReview.id !== currentReview.id) return currReview;
        return newReview;
      });
      setReview(updatedReviews);
    }
    setShowReviewModal(false);
    setCurrentReview(null);
    setSelectedBooking(null);
  };

  const getAllReview = async () => {
    const review = await api.getAllReview();
    setReview(review);
  };

  const getAllFloors = async () => {
    const tang = await api.getAllFloors();
    setFloors(tang);
  };

  useEffect(() => {
    const fetchBookedRooms = async () => {
      if (user?.Loai === "KhachHang") {
        const bills = await api.getAllBills();
        const filteredRooms = bills.filter(bill => bill.email === user.email);
        setBookedRooms(filteredRooms);
      }
    };
    fetchBookedRooms();
    getAllReview();
    getAllFloors();
  }, [user]);

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    const floor = tang.find(floor => floor.maTang === booking.maTang);
    const existingReview = review.find(r => r.Id === booking.Id);
    const maLoaiPhong = floor ? floor.maLoaiPhong : "";
    const Id = booking.Id;
    if (existingReview) {
      setCurrentReview({ ...existingReview, maLoaiPhong, Id: Id });
      setIsAdd(false);
    } else {
      setCurrentReview({ soSao: "", danhGia: "", maLoaiPhong, Id: Id });
    }
    setShowReviewModal(true);
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
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#905700", color: "#FFFFFF" }}
                    onClick={() => handleReviewClick(booking)}
                  >
                    Đánh giá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showReviewModal && (
        <ReviewModal
          show={showReviewModal}
          handleClose={() => {
            setShowReviewModal(false);
            setSelectedBooking(null);
            setCurrentReview(null);
          }}
          handleSubmit={handleSubmit}
          defaultValue={currentReview}
          maLoaiPhong={currentReview ? currentReview.maLoaiPhong : ""}
          Id={currentReview ? currentReview.id : ""}
        />
      )}
    </div>
  );
};

export default BookingHistory;
