import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const RoomDetail = ({ rooms }) => {
  const { roomId } = useParams();
  const history = useHistory();
  const room = rooms.find(room => room.id === roomId);
  const collection = [
    { src: '/images/nvsgdcaocap.png', alt: "Caption one" },
    { src: '/images/nvstieuchuan1.png', alt: "Caption two" },
    { src: '/images/doicaocap2.png', alt: "Caption three" },
    { src: '/images/doitieuchuan1.png', alt: "Caption four" },
    { src: '/images/doncaocap1.png', alt: "Caption five" },
    { src: '/images/doncaocap2.png', alt: "Caption six" },
  ];
  const handleGoBack = () => {
    history.goBack();
  };
  if (!room) return <div>Phòng không tồn tại.</div>;
  return (
    <div>
      <TopNav />
      <section>
        <div className="row g-0" style={{ backgroundColor: "#905700", color: "#FFF" }}>
          <div >
            <button > <img src="/images/GoBack_128px.png" style={{ width: '50px' }} alt="Back" /> </button>
            <h3 align="center">{room.name}</h3>
            <p className='px-5' style={{ fontSize: '24px' }}>Giá thành: {room.cost}/đêm</p>
            <p className='px-5' style={{ fontSize: '20px' }}>{room.description}</p>
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
                  <NavLink to="/thanhtoan" className='btn d-flex align-items-center justify-content-center' style={{ fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700', fontSize: '22px', fontWeight: 'bold', align: 'middle' }}>
                    Đặt phòng
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="slide-container" style={{ width: '100%', height: '100%' }}>
          <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF", fontSize: '24px' }}>
            <h3 align="center">Các hình ảnh về phòng</h3>
          </header>
          <Slide >
            {collection.map((image, index) => (
              <div className="each-slide" key={index}>
                <div style={{ height: '900px', width: '100%', 'backgroundImage': `url(${image.src})` }}>
                  <span >Ảnh {index + 1}</span>
                </div>
              </div>
            ))}
          </Slide>
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

    </div >
  );
};
export default RoomDetail;