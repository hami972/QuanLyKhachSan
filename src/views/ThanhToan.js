import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';

const ThanhToan = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const bookingInfo = {
    id: 'room1', name: 'Phòng 1', image: '/images/doncaocap1.png', description: 'Mô tả phòng 1', cost: '300000'
  }

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  

  return (
    <div>
      <TopNav/>
      <section>
        <div className="container mt-4">
            <h2>Thông tin phòng đã đặt</h2>
            <p style={{fontSize: '24px'}}>Tên phòng: {bookingInfo.name}</p>
            <p style={{fontSize: '24px'}}>Giá phòng/đêm: {bookingInfo.cost}</p>
            {/* Hiển thị các thông tin khác của phòng */}
        </div>
      </section>

      <section>
        <div className="container mt-4">
            <h2>Thông tin khách hàng</h2>
            <form >
                <div className='row'>
                    <div className="col-3 mb-3">
                    <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700'}} type='date' placeholder='Ngày check in'/>
                    </div>
                    <div className="col-3 mb-3">
                    <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700'}} type='date' placeholder='Ngày check out'/>
                    </div>
                    <div className="col-3 mb-3">
                    <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700'}} type='number' placeholder='Số lượng người lớn'/>
                    </div>
                    <div className="col-3 mb-3">
                    <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700'}} type='number' placeholder='Số lượng trẻ em'/>
                    </div>
                </div>
                <div className="">
                  <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700'}} type='name' placeholder='Tên người đặt phòng'/>
                </div>
                <div className="mt-3">
                  <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700'}} type='email' placeholder='Email'/>
                </div>
                <div className="mt-3">
                  <input className='form-control' style={{fontSize: '24px', height: '90px', borderRadius: '9px', borderColor: '#905700'}} type='telephone' placeholder='Số điện thoại'/>
                </div>
                
            </form>
            <p style={{fontSize: '24px'}}>Tổng tiền: {}</p>
        </div>
      </section>

      <section>
        <div className="container mt-4">
            <h2>Lựa chọn thanh toán</h2>
            <div className="payment-options">
            <label style={{fontSize: '24px'}}>
                <input 
                type="radio"
                name="payment"
                value="BIDV"
                checked={selectedPayment === "BIDV"}
                onChange={() => handlePaymentSelection("BIDV")}
                />
                BIDV
                
            </label>
            <br/>
            <label style={{fontSize: '24px'}}>
                <input 
                type="radio"
                name="payment"
                value="Momo"
                checked={selectedPayment === "Momo"}
                onChange={() => handlePaymentSelection("Momo")}
                />
                Momo
                
            </label>
            </div>
      </div>
      {/* Hiển thị mã QR thanh toán dựa trên hình thức thanh toán được chọn */}
      {selectedPayment === 'BIDV' && (
        <div className="payment-method container mt-4">
          <h2>Mã chuyển tiền bằng ngân hàng BIDV</h2>
          <img src="/images/qr.png" alt="" />
        </div>
      )}
      {selectedPayment === 'Momo' && (
        <div className="payment-method container mt-4">
          <h2>Mã chuyển tiền bằng Momo</h2>
          <img src="/images/qr.png" alt="" />
        </div>
      )}
      </section>
      <Footer style={{ marginTop: "80px" }} />
    </div>
    
  );
};

export default ThanhToan;
