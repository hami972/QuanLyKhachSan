import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function AddMaGiamGia(props) {
    const [idMa, setidMa] = useState('');
    const [phanTram, setphanTram] = useState('');
    const [thoiGianBatDau, setthoiGianBatDau] = useState('');
    const [thoiGianKetThuc, setthoiGianKetThuc] = useState('');
    const [dichVuApDung, setdichVuApDung] = useState('');
    
    const [show, setShow] = useState(props.show);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                onClick={props.toggleShow}
                className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Thêm
            </button>

            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mã giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setidMa('');
                            setphanTram('');
                            setthoiGianBatDau('');
                            setthoiGianKetThuc('');
                            setdichVuApDung('');
                            props.newCustomer(idMa, phanTram, thoiGianBatDau, thoiGianKetThuc, dichVuApDung);
                        }}
                        id="editmodal"
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="idMa"
                                >
                                    Id mã giảm giá
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="idMa"
                                    placeholder="ID"
                                    type="text"
                                    value={idMa}
                                    onChange={(e) => {
                                        setidMa(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="phanTram"
                                >
                                    Phần trăm
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="phanTram"
                                    placeholder="phần trăm"
                                    type="number"
                                    value={phanTram}
                                    onChange={(e) => {
                                        setphanTram(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="thoiGianBatDau"
                                >
                                    Thời gian bắt đầu
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="thoiGianBatDau"
                                    placeholder=""
                                    type="date"
                                    value={phanTram}
                                    onChange={(e) => {
                                        thoiGianBatDau(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="thoiGianKetThuc"
                                >
                                    Thời gian kết thúc
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="thoiGianKetThuc"
                                    placeholder=""
                                    type="date"
                                    value={thoiGianKetThuc}
                                    onChange={(e) => {
                                        thoiGianKetThuc(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="dichVuApDung"
                                >
                                    Dịch vụ áp dụng
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="dichVuApDung"
                                    placeholder="dịch vụ áp dụng"
                                    type="text"
                                    value={dichVuApDung}
                                    onChange={(e) => {
                                        dichVuApDung(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="graycolor bg-gray hover:bg-gray text-black font-bold py-2 px-4 rounded"
                        onClick={props.toggleShow}
                    >
                        Hủy
                    </button>
                    <button
                        className="bluecolor hover:bg-blue text-white font-bold py-2 px-4 rounded"
                        form="editmodal"
                    >
                        Lưu
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
