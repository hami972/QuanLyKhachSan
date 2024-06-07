import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { NavLink } from 'react-router-dom';
import api from '../api/Api';

const RoomDetail = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const { room } = location.state || {};
  const [kindOfRoom, setKindOfRoom] = useState([]);

  useEffect(() => {
    getAllKindOfRoom();
  }, []);

  const getAllKindOfRoom = async () => {
    const kindOfRoom = await api.getAllKindOfRoom();
    setKindOfRoom(kindOfRoom);
  };

  // Ensure room data is available
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
  }]
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
                <div className="col-2 mb-3">
                  <input className='form-control' style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700' }} type='date' placeholder='Ngày check in' />
                </div>
                <div className="col-2 mb-3">
                  <input className='form-control' style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700' }} type='date' placeholder='Ngày check out' />
                </div>
                <div className="col-2 mb-3">
                  <input className='form-control' style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700' }} type='number' placeholder='Số lượng người lớn' />
                </div>
                <div className="col-2 mb-3">
                  <input className='form-control' style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700' }} type='number' placeholder='Số lượng trẻ em' />
                </div>
                <div className="col-3 mb-3 ">
                  <NavLink to="/thanhtoan" className='btn d-flex align-items-center justify-content-center' style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700', fontWeight: 'bold', align: 'middle' }}>
                    Đặt phòng
                  </NavLink>
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
              Đơn giá: {room.donGia}/đêm
            </div>
            <NavLink to="/xacNhanDatPhong">
              Đặt phòng
            </NavLink>
          </div>
        </div>
      </section>
      <section>
        <div className="slide-container" style={{ width: '100%', height: '100%' }}>
          <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF", fontSize: '24px' }}>
            <h3 align="center">Các đánh giá về phòng</h3>
          </header>
        </div>
      </section>
      <Footer style={{ marginTop: "80px" }} />
    </div>
  );
};

export default RoomDetail;