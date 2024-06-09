import React, { useEffect, useState, useContext, useRef } from "react";
import "./style.css";
import moment from "moment";
import ReactToPrint from 'react-to-print';
import api from "../api/Api";
import Select from "react-select";
import { AuthContext } from "../hook/AuthProvider";

const BillManagement = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [maGiamGia, setMaGiamGia] = useState([]);
  const [recentDiscount, setRecentDiscount] = useState(null);
  const [ThanhTienSauGiamGia, setTTSGG] = useState(0);
  const [stayDays, setStayDays] = useState(0);
  const [SoTienGiam, setSoTienGiam] = useState(0);
  const [disableDiscount, setDisableDiscount] = useState(true);

  const componentToPrintRef = useRef();

  const [searchCriteria, setSearchCriteria] = useState({
    maHoaDon: "",
    tenKhachHang: "",
    ngayLap: "",
    tinhTrang: "",
  });

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const setSelectedRowById = (id) => {
    setSelectedRow(id);
    setPage(2);
  };

  const calculatorStayDays = (checkin) => {
    const checkInDate = moment(checkin.ngayCheckIn);
    const checkOutDate = moment();
    const days = checkOutDate.diff(checkInDate, 'days');
    if (days===0) return 1;
    return days;
  }
  const calculatorTotal= (checkin) => {
    const checkInDate = moment(checkin.ngayCheckIn);
    const checkOutDate = moment();
    const days = checkOutDate.diff(checkInDate, 'days');
    if (checkin.donGia!=null)
      if (days===0)
        return parseInt(checkin.donGia)
      else
        {const total = (days)*parseInt(checkin.donGia);
        return total;}
    else return 0;
  }
  const [page, setPage] = useState(1);
  const nextPage = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };
  const prevPage = () => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const getBills = async () => {
    const bills = await api.getAllBills();
    const fil = bills.filter(item => item.chiNhanh === user?.chinhanh);
    fil.forEach(item => {
      item.soLuong = calculatorStayDays(item);
      item.thanhTien = calculatorTotal(item);
    });
    setBills(fil);
  };

  const getStaffs = async () => {
    const staffs = await api.getAllStaffs();
    const fil = staffs.filter(item => item.tenChiNhanh === user?.chinhanh);
    setStaffs(fil);
  };

  const getDiscounts = async () => {
    const discounts = await api.getAllDiscounts();
    const discountsFilter = discounts.filter((discount) => {
      const dateBD = new Date(discount.TGBatDau);
      let dateKT = new Date(discount.TGKetThuc);
      dateKT.setHours(23);
      dateKT.setMinutes(59);

      const matchDateBD = !(dateBD > new Date());
      const matchDateKT = !(dateKT < new Date());
      return matchDateBD && matchDateKT;
    });
    setMaGiamGia(discountsFilter);
  };

  const validSubmitData = () => {
    if (bills[selectedRow]?.tinhTrang === "Đã thanh toán") {
      return true;
    }
    return true;
  };

  const handleSubmit = async () => {
    const choice = window.confirm("Xác nhận thanh toán?");
    if (choice) {
      // if (validSubmitData()) {
        bills[selectedRow].tinhTrang = "Đã thanh toán";
        bills[selectedRow].ngayLap = moment().format("YYYY-MM-DD");
        bills[selectedRow].ngayCheckOut = moment().format("YYYY-MM-DD");
        bills[selectedRow].SoTienGiam = SoTienGiam;
        bills[selectedRow].ThanhTienSauGiamGia = ThanhTienSauGiamGia;
        api.updateBill(bills[selectedRow], bills[selectedRow].Id);
        // const newBill = { ...bills[selectedRow] };
        // const Id = newBill.Id;

        // newBill.daThanhToan = ThanhTienSauGiamGia;
        // const thanhtoan = {
        //   ngayThanhToan: moment().format("YYYY-MM-DD"),
        //   tienThanhToan: ThanhTienSauGiamGia,
        // };
        // let dsThanhToan = newBill.dsThanhToan || [];
        // dsThanhToan.push(thanhtoan);
        // newBill.dsThanhToan = dsThanhToan;
        // newBill.ngayLap = thanhtoan.ngayThanhToan;

        // if (!disableDiscount) {
        //   newBill.maGiamGia = recentDiscount?.maGiamGia || "";
        //   newBill.phanTram = recentDiscount?.phanTram || 0;
        //   newBill.maNhanVien = user?.maNV;
        //   newBill.tenNhanVien = user?.ten;
        // }
        // newBill.tinhTrang = "Đã thanh toán";

        setDisableDiscount(true);
        setRecentDiscount(null);
        alert("Lưu thành công");
      
    }
  };

  const onSearch = async () => {
    const searchResults = await api.getBillsBySearch(searchCriteria);
    setBills(searchResults);
  };

  useEffect(() => {
    getBills();
    getStaffs();
    getDiscounts();
    
  }, []);

  useEffect(() => {
    if (!disableDiscount) {
      const checkInDate = moment(bills[selectedRow]?.ngayCheckIn);
      const checkOutDate = moment(bills[selectedRow]?.ngayCheckOut);
      const daysStayed = checkOutDate.diff(checkInDate, 'days');
      setStayDays(daysStayed)
      const tongTien = bills[selectedRow]?.thanhTien;
      setSoTienGiam((tongTien * recentDiscount?.phanTram) / 100 || 0);
      setTTSGG(tongTien - ((tongTien * recentDiscount?.phanTram) / 100 || 0));
    }
    
  }, [recentDiscount]);

  return (
    <div>
      <div style={{ minHeight: "630px" }}>
        {page === 1 ? (
          <div>
            <div className="row">
              <div className="row ms-0 me-0" style={{ fontWeight: "500" }}>
                <div className="col-md-6">
                  <div className="mb-2 col-md-6">Mã hóa đơn</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="maHoaDon"
                    name="maHoaDon"
                    onChange={handleChange}
                    value={searchCriteria.maHoaDon}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Tên khách hàng</div>
                  <input
                    type="text"
                    className="form-control pb-2 pt-2 mb-2"
                    id="tenKhachHang"
                    name="tenKhachHang"
                    onChange={handleChange}
                    value={searchCriteria.tenKhachHang}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Ngày lập</div>
                  <input
                    type="date"
                    className="form-control pb-2 pt-2 mb-2"
                    id="ngayLap"
                    name="ngayLap"
                    onChange={handleChange}
                    value={searchCriteria.ngayLap}
                  />
                </div>
                <div className="col-md-6">
                  <div className="mb-2">Tình trạng</div>
                  <select
                    className="form-control"
                    id="tinhTrang"
                    name="tinhTrang"
                    onChange={handleChange}
                    value={searchCriteria.tinhTrang}
                  >
                    <option value="">Tất cả</option>
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                    <option value="Đã thanh toán">Đã thanh toán</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-4 mt-4"></div>
              <button className="btn btn-primary col-md-2" onClick={onSearch}>
                Tìm kiếm
              </button>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Mã hóa đơn</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Ngày lập</th>
                    <th scope="col">Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedRowById(index)}
                      className={index === selectedRow ? "selected-row" : ""}
                    >
                      <td>{bill.maHoaDon}</td>
                      <td>{bill.tenKhachHang}</td>
                      <td>{moment(bill.ngayLap).format("DD/MM/YYYY")}</td>
                      <td>{bill.tinhTrang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : page === 2 ? (
          <div>
            <div ref={componentToPrintRef}>
              <div className="container mt-5 mb-5" style={{ fontSize: "12px" }}>
                <div className="d-flex justify-content-center row">
                  <div className="col-md-8">
                    <div className="p-3 bg-white rounded">
                      <div className="row">
                      <div className="row">
                        <div className="col mt-3">
                          <div
                            align=""
                            style={{ fontSize: "25px", fontWeight: "bold" }}
                          >
                            HÓA ĐƠN
                          </div>
                          <div className=''>
                            <span style={{ fontWeight: "600" }}>#</span>
                              {bills[selectedRow]?.maHoaDon}
                          </div>
                        </div>
                        <div className="col-md-auto">
                          <img alt="" src="/images/royalHotelLogo.png" />
                        </div>
                      </div>
                      
                      <div className="row">
                        <table className='mt-3' style={{borderTop: '1px solid #DDDDDD', borderBottom: '1px solid #DDDDDD', tableLayout: 'fixed'}}>
                          <thead>
                            <tr>
                              <th style={{borderRight: '1px solid #DDDDDD', width: '50%', padding: '25px'}}>
                                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                                  Khách sạn Hoàng Gia
                                </div>
                                <div>
                                  <span style={{ fontWeight: "600" }}>Địa chỉ:</span> 2 Lô E,
                                  KD5, Dương Bá Trạc, Phường 1, quận 8, HCM
                                </div>
                                <div>
                                  <span style={{ fontWeight: "600" }}>SĐT:</span> 0843593598
                                </div>
                                <div>
                                  <span style={{ fontWeight: "600" }}>Email:</span>{" "}
                                  khachsanhoanggia@gmail.com
                                </div>
                              </th>

                              <th style={{ width: '50%', padding: '25px'}}>
                                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                                  Thông tin khách hàng
                                </div>
                                <div className=''>
                                  <span style={{ fontWeight: "600" }}>Tên Khách hàng: </span>
                                  {bills[selectedRow]?.tenKhachHang}
                                </div>
                                <div className=''>
                                  <span style={{ fontWeight: "600" }}>Địa chỉ: </span>
                                  {bills[selectedRow]?.DiaChi}
                                </div>
                                <div className=''>
                                  <span style={{ fontWeight: "600" }}>Số điện thoại: </span>
                                  {bills[selectedRow]?.soDienThoai}
                                </div>
                              </th>
                            </tr>
                          </thead>

                        </table>
                      </div>
                       
                      </div>
                      <div className="mt-3">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Tên phòng</th>
                                <th>Số lượng</th>
                                <th>Ngày check in</th>
                                <th>Ngày check out</th>
                                
                                <th className="text-right">Đơn giá</th>
                                <th className="text-right">Thành tiền</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{bills[selectedRow]?.maPhong}</td>
                                <td>{bills[selectedRow]?.soLuong}</td>
                                <td>{bills[selectedRow]?.ngayCheckIn} </td>
                                <td>
                                  {bills[selectedRow]?.tinhTrang === "Chưa thanh toán"
                                    ? moment().format("YYYY-MM-DD")
                                    : bills[selectedRow]?.ngayCheckOut}
                                </td>
                                <td className="text-right">
                                  {parseInt(bills[selectedRow]?.donGia)
                                  .toLocaleString("vi-VN", 
                                  { style: "currency", currency: "VND" })}
                                </td>
                                <td className="text-right">
                                  {bills[selectedRow]?.thanhTien?.toLocaleString("vi-VN", 
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4 text-right">
                          <div className="border-bottom">
                            <div className="d-flex justify-content-between">
                              <span>Thành tiền</span>
                              <span>
                                {(
                                  bills[selectedRow]?.thanhTien
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Giảm giá</span>
                              <span>
                              <Select
                            className="dropdown"
                            options={maGiamGia}
                            onChange={(e) => {
                              setRecentDiscount(e);
                              setDisableDiscount(false);
                            }}
                            getOptionLabel={(option) => option.maGiamGia}
                            getOptionValue={(option) => option.Id}
                            placeholder="Chọn mã giảm giá"
                            value={recentDiscount}
                            isDisabled={bills[selectedRow]?.tinhTrang === "Đã thanh toán"}
                          />
                              {
                              (() => {
                                const amount =
                                  bills[selectedRow]?.tinhTrang === "Chưa thanh toán"
                                    ? SoTienGiam
                                    : bills[selectedRow]?.SoTienGiam;

                                return amount !== undefined
                                  ? amount.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })
                                  : "N/A";
                              })()
                            }
                                
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <span className="font-weight-bold">
                              Thành tiền sau giảm giá
                            </span>
                            <span className="font-weight-bold text-success">
                            {
                              (() => {
                                const amount =
                                  bills[selectedRow]?.tinhTrang === "Chưa thanh toán"
                                    ? ThanhTienSauGiamGia
                                    : bills[selectedRow]?.ThanhTienSauGiamGia;

                                return amount !== undefined
                                  ? amount.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })
                                  : "N/A";
                              })()
                            }
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <p>
                            <b>Ngày lập:</b> 
                            {bills[selectedRow]?.tinhTrang === "Chưa thanh toán"
                                    ? moment().format("YYYY-MM-DD")
                                    : bills[selectedRow]?.ngayLap}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="d-flex flex-column mt-3">
                          <span className="font-weight-bold">
                            Chữ ký của nhân viên
                          </span>
                          <span className="mt-4">
                            <b>{user?.ten}</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ReactToPrint
              trigger={() => (
                <button className="btn btn-success">In hóa đơn</button>
              )}
              content={() => componentToPrintRef.current}
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Thanh toán
            </button>
            <button className="btn btn-secondary ms-2" onClick={prevPage}>
              Quay lại
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default BillManagement;
