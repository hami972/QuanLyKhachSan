import React, { useState, useRef } from 'react'
import './style.css'
import ReactPaginate from 'react-paginate';
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
const ServicesPage = (props) => {
    //fake list services
    const pageToRef = useRef(null);

    const serviceList = [
        {
            image: "images/gym.png",
            name: "Phòng Gym",
            price: "Miễn phí khi đã đặt phòng",
            description: " Một phòng gym đầy đủ trang thiết bị và máy móc để khách hàng có thể tập luyện và giữ gìn sức khỏe trong thời gian lưu trú tại khách sạn."
        },
        {
            image: "images/hoboi.png",
            name: "Hồ Bơi",
            price: "Miễn phí khi đã đặt phòng",
            description: "Hồ bơi trong nhà hoặc ngoài trời cung cấp cho khách hàng một cơ hội để thư giãn và tận hưởng thời gian nghỉ ngơi."
        },
        {
            image: "images/spa.png",
            name: "Trung Tâm Massage Và Spa",
            price: "200.000-1.500.000 đồng",
            description: "Cung cấp các liệu pháp spa và massage để giảm căng thẳng, giải tỏa stress và tạo ra một trạng thái thư giãn cho khách hàng."
        },
        {
            image: "images/giatui.png",
            name: "Dịch Vụ Giặt Ủi",
            price: "Chỉ từ 100.000 đồng/Kg",
            description: "Cung cấp các dịch vụ giặt là và ủi, và các dịch vụ khác để tạo ra một trải nghiệm thuận tiện và thoải mái cho khách hàng."
        },
        {
            image: "images/nhahang.png",
            name: "Nhà Hàng",
            price: "Chỉ từ 40.000 đồng",
            description: "Các nhà hàng nội bộ hoặc ngoài trời cung cấp cho khách hàng các lựa chọn ẩm thực phong phú."
        },
        {
            image: "images/bar.png",
            name: "Quán Bar",
            price: "Chỉ từ 35.000 đồng",
            description: "Các quán bar nội bộ hoặc ngoài trời cung cấp cho khách hàng các lựa chọn thức uống phong phú."
        },
        {
            image: "images/tieccuoi.png",
            name: "Dịch Vụ Hội Nghị Và Tiệc Cưới",
            price: "Có các gói theo yêu cầu, từ 1.000.000 đồng",
            description: "Cho thuê các phòng hội nghị, phòng hội thảo và cung cấp dịch vụ tổ chức tiệc cưới và sự kiện khác."
        },
        
    ]
    const doctorPerPage = 3;
    const [startOffset, setStartOffset] = useState(0);
    const endOffset = startOffset + doctorPerPage;
    const currentDoctorList = serviceList.slice(startOffset, endOffset);
    const totalPages = Math.ceil(serviceList.length / doctorPerPage);

    const handlePageClick = (event) => {

        setStartOffset((event.selected * doctorPerPage) % serviceList.length)
        pageToRef.current.scrollIntoView();;
    }

    return (
        <div>
            <TopNav />
            <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF" }}><h3 align="center">Dịch vụ</h3></header>

            <section class="container mt-5 mb-5">
                <div class="row" ref={pageToRef}>
                    {currentDoctorList.map((item, index) => {
                        return (
                            <div class="row">
                                <div className="col-md-4 mt-2">
                                    <img alt="" src={item.image} style={{ width: "100%" }} />
                                </div>
                                <div className="col-md-8 align-self-center px-3">
                                    <p style={{ fontSize: "26px" }}>{item.name}</p>
                                    <p><h6>{item.price}</h6></p>
                                    <p style={{ color: "#666" }} className='mb-5'>{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}//change when click new page
                        pageRangeDisplayed={2}//number page show in range 
                        marginPagesDisplayed={1} //1 left neighbor and 1 right neighbor
                        pageCount={totalPages}//totalPage
                        previousLabel="<"

                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link next-and-previous-button"
                        nextClassName="page-item"
                        nextLinkClassName="page-link next-and-previous-button"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination justify-content-center"
                        activeClassName="active"

                    />
                </div>

            </section >
            <Footer style={{ marginTop: 0 }} />
        </div >
    );
}
export default ServicesPage;