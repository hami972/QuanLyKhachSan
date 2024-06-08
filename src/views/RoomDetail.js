import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import api from '../api/Api';

const RoomDetail = () => {
  const { roomId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { room, searchCriteria } = location.state || {};
  const [branches, setBranches] = useState([]);
  const [soLuong, setSoLuong] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    getBranchs();
    getComments();
  }, []);

  const getBranchs = async () => {
    const branches = await api.getAllBranchs();
    setBranches(branches);
  };

  const getComments = async () => {
    const comments = await api.getAllReview();
    const filteredComments = comments.filter(review =>
      review?.chiNhanh === room.chiNhanh &&
      review.maLoaiPhong === room.maLoaiPhong
    );
    filteredComments.sort((a, b) => new Date(b.ngayDanhGia) - new Date(a.ngayDanhGia));
    setComments(filteredComments);
  }

  const handleSearchChange = (e) => {
    // Do something when search criteria changes
  };

  const handleSearch = () => {
    history.push({
      pathname: '/rooms',
      state: { searchCriteria: searchCriteria }
    });
  };

  if (!room) return <div>Phòng không tồn tại.</div>;

  const images = room.images.map((img) => ({
    original: img,
    thumbnail: img
  }));

  const coSoVatChat = [...room.coSoVatChat, {
    maCSVC: 'CSVC000',
    tenCSVC: "Wifi",
    soLuong: "Miễn phí",
    icon: "/images/iconwifi.png"
  }];

  const handleSubmit = async () => {
    if (!soLuong || soLuong <= 0) {
      alert("Vui lòng nhập số lượng phòng cần đặt.");
      return;
    }

    // Lặp để thêm số lượng phòng đã nhập
    for (let i = 0; i < soLuong; i++) {
      // Lấy mã phòng từ danh sách mã phòng của phòng hiện tại
      const maPhong = room.dsPhong.split('-')[0]; // Lấy mã phòng đầu tiên

      // Gọi API để thêm phòng đã đặt
      try {
        await api.addBookedRoom({
          maPhong: maPhong,
          // Thêm các thông tin khác bạn muốn lưu
        });
      } catch (error) {
        console.error("Lỗi khi thêm phòng đã đặt:", error);
        alert("Đã xảy ra lỗi khi đặt phòng, vui lòng thử lại sau.");
        return;
      }
    }

    // Hiển thị thông báo khi đặt phòng thành công
    alert(`Đã đặt ${soLuong} phòng thành công!`);

    history.push('/thanhtoan');
  }

  return (
    <div>
      <TopNav />
      <section>
        <div className="row g-0" style={{ backgroundColor: "#905700", color: "#FFF" }}>
          <div>
            <h3 align="center">{room.tenLoaiPhong}</h3>
          </div>
          <div style={{ backgroundColor: "#fff", padding: '50px', color: '#905700' }}>
            <div className='form'>
              <form className='row'>
                <div className="col-md-3 mb-3">
                  <input
                    className='form-control'
                    style={{ fontSize: '24px', height: '60px', borderRadius: '9px', borderColor: '#905700' }}
                    type='date'
                    placeholder='Ngày check in'
                    value={searchCriteria.ngayBatDau}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    className='form-control'
                    style={{ fontSize: '24px', height: '60px', borderRadius: '9px', borderColor: '#905700' }}
                    type='date'
                    placeholder='Ngày check out'
                    value={searchCriteria.ngayKetThuc}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    className='form-control'
                    style={{ fontSize: '24px', height: '60px', borderRadius: '9px', borderColor: '#905700' }}
                    type='number'
                    placeholder='Số lượng người lớn'
                    value={searchCriteria.soLuongNguoi}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <select
                    className="form-select"
                    style={{ fontSize: '24px', height: '60px', borderRadius: '9px', borderColor: '#905700' }}
                    id="chiNhanh"
                    value={searchCriteria.chiNhanh}
                    onChange={handleSearchChange}
                  >
                    <option value="">Chọn chi nhánh</option>
                    {branches.map((item, index) => (
                      <option key={index} value={item.tenChiNhanh}>
                        {item.tenChiNhanh}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-3 mb-3">
                  <button className='form-control'
                    onClick={handleSearch}
                    style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#fff', fontWeight: 'bold' }} type='button'
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF", fontSize: '24px' }}>
            <h3 align="center">Các hình ảnh về phòng</h3>
          </header>
          <ImageGallery
            items={images}
            showPlayButton={true}
            showFullscreenButton={true}
            slideInterval={1000}
            slideOnThumbnailOver={true}
            showIndex={true}
            lazyLoad={true}
            onPlay={() => {
              alert("slideshow is now playing!");
            }}
          />
        </div>
      </section>
      <section>
        <div className="slide-container" style={{ width: '100%', height: '100%' }}>
          <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF", fontSize: '24px' }}>
            <h3 align="center">Thông tin phòng</h3>
          </header>
          <div>
            {coSoVatChat.map((item, index) => (
              <div key={index}>
                <div>
                  <img src={item.icon} alt={item.tenCSVC} style={{ width: '40px' }} />
                </div>
                <div>
                  <p><strong>Mã CSVC:</strong> {item.maCSVC}</p>
                  <p><strong>Tên CSVC:</strong> {item.tenCSVC}</p>
                  <p><strong>Số lượng:</strong> {item.soLuong}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>
              <input
                className="form-control pb-2 pt-2 mb-2"
                name="soLuong"
                onChange={(e) => setSoLuong(e.target.value)}
                type="number"
                value={soLuong}
              />
            </div>
            <div>
              Đơn giá: {room.donGia}/đêm
            </div>

            <div>
              <button onClick={handleSubmit}
                className="form-control" style={{
                  fontSize: '24px', height: '60px',
                  borderRadius: '9px', borderColor: '#905700'
                }}>Đặt phòng</button>
            </div>

          </div>
        </div>
      </section>
      <section>
        <div className="slide-container" style={{ width: '100%', height: '100%' }}>
          <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF", fontSize: '24px' }}>
            <h3 align="center">Các đánh giá về phòng</h3>
          </header>
          <div>
            {comments?.map((comment, index) => (
              <div key={index} className=''>
                <div className='col-auto' style={{ backgroundColor: "yellow", borderRadius: "5px" }}>
                  {comment.soSao}
                </div>
                <div className='col-auto' style={{ color: "gray" }}>
                  {new Date(comment.ngayDanhGia).toLocaleDateString()} {/* Hiển thị ngày đánh giá */}
                </div>
                <div className='col-12'>
                  {comment.danhGia}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer style={{ marginTop: "80px" }} />
    </div>
  );
};

export default RoomDetail;