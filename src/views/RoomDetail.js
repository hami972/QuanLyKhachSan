import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import api from '../api/Api';
import { AuthContext } from '../hook/AuthProvider';

const RoomDetail = () => {
  const { roomId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { room, searchCriteria: searchCriteriaProp } = location.state || {};
  const [searchCriteria, setSearchCriteria] = useState(searchCriteriaProp);
  const [branches, setBranches] = useState([]);
  const [soLuong, setSoLuong] = useState();
  const [comments, setComments] = useState();
  const { user } = useContext(AuthContext)

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
    setSearchCriteria(prevSearchCriteria => ({
      ...prevSearchCriteria,
      [e.target.name]: e.target.value
    }));
  };

  const handleSearch = () => {
    if (checkError()) {
      history.push({
        pathname: '/rooms',
        state: { searchCriteria: searchCriteria }
      });
    }
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

  const checkError = () => {

    if (user?.Loai !== "KhachHang") {
      alert("Vui lòng đăng nhập để lưu lại lịch sử đặt phòng")
      return false;
    }

    if (!searchCriteria.ngayBatDau || !searchCriteria.ngayKetThuc || !searchCriteria.chiNhanh || !searchCriteria.soLuongNguoi) {
      alert("Nhập đầy đủ thông tin");
      return false;
    }

    if (searchCriteria.ngayBatDau && searchCriteria.ngayKetThuc && searchCriteria.ngayBatDau > searchCriteria.ngayKetThuc) {
      alert("Ngày nhập 'Từ' phải nhỏ hơn hoặc bằng ngày nhập 'Đến'");
      return false;
    }

    return true;
  }

  const handleSubmit = async () => {
    if (checkError()) {
      if (!soLuong || soLuong <= 0) {
        alert("Vui lòng nhập số lượng phòng cần đặt.");
        return;
      }

      // Lặp để thêm số lượng phòng đã nhập
      for (let i = 0; i < soLuong; i++) {
        // Lấy mã phòng từ danh sách mã phòng của phòng hiện tại
        const maPhong = room.dsPhong.split('-')[0]; // Lấy mã phòng đầu tiên

        console.log(room);
        try {
          await api.addBookedRoom({
            maPhong: maPhong,
            CCCD: user?.CCCD,
            tenKhachHang: user?.ten,
            donGia: room.donGia,
            email: user?.email,
            ngayBatDau: searchCriteria.ngayBatDau,
            ngayKetThuc: searchCriteria.ngayKetThuc,
            soDienThoai: user?.SDT,
            tenLoaiPhong: room.tenLoaiPhong,
            toa: room.toa,
            Id: "",
            maDatPhong: "",
            tang: room.tang,
            tinhTrang: "Đặt phòng",
            chiNhanh: room.chiNhanh,

          });
        } catch (error) {
          console.error("Lỗi khi thêm phòng đã đặt:", error);
          alert("Đã xảy ra lỗi khi đặt phòng, vui lòng thử lại sau.");
          return;
        }
      }

      // Hiển thị thông báo khi đặt phòng thành công
      alert(`Đã đặt ${soLuong} phòng thành công!`);

      history.push('/manager/lichsudatphong');
    }
  }

  const styles = {
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
    },
    gridItem: {
      border: '1px solid #ddd',
      padding: '16px',
      borderRadius: '8px',
    },
  };
  return (
    <div>
      <TopNav />
      <section>
        <div className="row g-0" style={{ backgroundColor: "#905700", color: "#FFF" }}>
          <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF", fontSize: '24px' }}>
            <h3 align="center">{room.tenLoaiPhong}</h3>
          </header>
          <div style={{ backgroundColor: "#fff", padding: '50px', color: '#905700' }}>
            <div className='form'>
              <form className='row'>
                <div className="col-3 mb-3">
                  <input
                    className='form-control'
                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                    type='date'
                    placeholder='Ngày check in'
                    value={searchCriteria.ngayBatDau}
                    onChange={handleSearchChange}
                    name="ngayBatDau"
                  />
                </div>
                <div className="col-3 mb-3">
                  <input
                    className='form-control'
                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                    type='date'
                    placeholder='Ngày check out'
                    value={searchCriteria.ngayKetThuc}
                    onChange={handleSearchChange}
                    name="ngayKetThuc"
                  />
                </div>
                <div className="col-2 mb-3">
                  <input
                    className='form-control'
                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                    type='number'
                    placeholder='Số lượng người'
                    value={searchCriteria.soLuongNguoi}
                    name="soLuongNguoi"
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-2 mb-3">
                  <select
                    className="form-select"
                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', borderColor: '#905700' }}
                    id="chiNhanh"
                    name='chiNhanh'
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

                <div className="col-2 mb-3">
                  <button className='form-control'
                    onClick={handleSearch}
                    style={{ fontSize: '24px', height: '80px', borderRadius: '9px', color: '#fff', fontWeight: 'bold', backgroundColor: '#905700' }} type='button'
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
          <div className='mt-5' style={styles.gridContainer}>
            {coSoVatChat.map((item, index) => (
              <div key={index} style={styles.gridItem}>
                <div>
                  <img src={item.icon} alt={item.tenCSVC} style={styles.image} />
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
            <div className='container mt-3'>
              <label style={{ fontWeight: 'bold', fontSize: '24px' }} >Số lượng phòng muốn đặt</label>
              <input
                className="form-control pb-2 pt-2 mb-2"
                name="soLuong"
                onChange={(e) => setSoLuong(e.target.value)}
                type="number"
                value={soLuong}
              />
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '24px' }} className='container mt-3' >
              Đơn giá: {Intl.NumberFormat("en-DE").format(room.donGia)}/đêm
            </div>

            <div className='container mt-3'>
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
        <div className="slide-container mt-5 " style={{ width: '100%', height: '100%' }}>
          <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF", fontSize: '24px' }}>
            <h3 align="center">Các đánh giá về phòng</h3>
          </header>
          <div>
            {comments?.map((comment, index) => (
              <div key={index} className='container collumn'
                style={{
                  backgroundColor: '#fff', alignItems: 'center', display: 'flex',
                  borderRadius: '5px', borderStyle: 'groove', marginTop: '50px'
                }}
              >
                <div className='col-2' style={{ borderRadius: "5px" }}>
                  <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Điểm đánh giá: </p>{comment.soSao}
                </div>
                <div className='col-1' style={{ color: "gray" }}>
                  {new Date(comment.ngayDanhGia).toLocaleDateString()} {/* Hiển thị ngày đánh giá */}
                </div>
                <div className='col-9'>
                  <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Đánh giá: </p>{comment.danhGia}
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