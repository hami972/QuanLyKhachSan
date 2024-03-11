import React, { useState, useRef } from 'react'
import './style.css'
import ReactPaginate from 'react-paginate';
import TopNav from '../components/TopNav'
import Footer from '../components/Footer';
const RoomsPage = (props) => {
    //fake list doctor
    const pageToRef = useRef(null);

    const doctorList = [
        {
            image: "images/nvstieuchuan.png",
            fullName: "",
            brach: "Quận 7, HCM",
        },
        
    ]
    const doctorPerPage = 4;
    const [startOffset, setStartOffset] = useState(0);
    const endOffset = startOffset + doctorPerPage;
    const currentDoctorList = doctorList.slice(startOffset, endOffset);
    const totalPages = Math.ceil(doctorList.length / doctorPerPage);

    const handlePageClick = (event) => {

        setStartOffset((event.selected * doctorPerPage) % doctorList.length)
        pageToRef.current.scrollIntoView();;
    }

    return (
        <div>
            <TopNav />
            <header className="pt-4 pb-4" style={{ backgroundColor: "#905700", color: "#FFF" }}><h3 align="center">Bác sĩ của chúng tôi</h3></header>
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img alt="" src="images/gdcaocap2.png" style={{ width: "90%" }} />
                    </div>
                    <div className="col-md-7 align-self-center mt-2">
                        <p><h4>Các loại phòng trong khách sạn</h4></p>
                        <p>Chúng tôi tự hào giới thiệu các hạng phòng đa dạng và tiện nghi, đảm bảo đáp ứng mọi nhu cầu của quý khách và mang lại trải nghiệm lưu trú đích thực. Dù bạn đang tìm kiếm một kỳ nghỉ sang trọng, một cuộc họp kinh doanh hiệu quả hay một chuyến du lịch gia đình đầy niềm vui, chúng tôi luôn sẵn lòng phục vụ.</p>
                    </div>
                </div>
            </section>

            <section class="container mt-5 mb-5">
                <div class="row" ref={pageToRef}>
                    {currentDoctorList.map((item, index) => {
                        return (
                            <div class="col-sm-6 col-md-3 p-4">
                                <img src={item.image} alt="" style={{ width: "100%" }} />
                                <p class="mt-3">
                                    {item.fullName}<br />
                                    Giá tiền:<br />
                                </p>

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

            </section>
            <Footer style={{ marginTop: "0px" }} />
        </div >
    );
}
export default RoomsPage;