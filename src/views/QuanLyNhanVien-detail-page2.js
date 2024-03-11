import React from 'react'
import './mistyles.css'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from 'react';
import { FormChiTietNhanVien } from '../components/FormChiTietNhanVien';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const XemThongTinNhanVien = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [nvien, setRows] = useState([
      {
        name: 'John Doe',
        phone: '123456789',
        position: 'Phục vụ phòng',
        email: 'john@example.com',
        basicSalary: '40000000',
        branch: 'Quận 8'
      },
      {
        name: 'Jane Smith',
        phone: '987654321',
        position: 'Tiếp tân',
        email: 'jane@example.com',
        basicSalary: '21000000',
        branch: 'Thủ Đức'
      },
    ]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const handleDeleteRow = (targetIndex) => {
        setRows(nvien.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
        ? setRows([...nvien, newRow])
        : setRows(
            nvien.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;

                return newRow;
            })
            );
    };
    return (
        <div >
            <div className="mb-3 mt-3">

              <input className="block m-2 customBox" type="text" id="name" placeholder="Nhập tên" name="name" />
            </div>
              <button type="submit" className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Tìm kiếm</button>
              <button onClick={() => setModalOpen(true)} className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Thêm
              </button>
            <h1 className="noteVND">**Tính theo đơn vị VNĐ</h1>
            <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Chức vụ</th>
                        <th>Email</th>
                        <th>Lương cơ bản</th>
                        <th>Chi nhánh làm việc</th>
                        <th></th>
                    </tr>
                </thead>
                {nvien.map((row, idx) => {
                    return (
                    <tr key={row}>
                        <td>{row.name}</td>
                        <td>{row.phone}</td>
                        <td>{row.position}</td>
                        <td>{row.email}</td>
                        <td>{row.basicSalary}</td>
                        <td>{row.branch}</td>
                        <td className="fit">
                            <span className="actions">
                                <BsFillTrashFill
                                className="delete-btn"
                                onClick={() => handleDeleteRow(idx)}
                                />
                                <BsFillPencilFill
                                className="edit-btn"
                                onClick={() => handleEditRow(idx)}
                                />
                            </span>
                        </td>
                    </tr>
                    );
                    })}
                <tbody>

                </tbody>
            </table>
            {modalOpen &&(
        <FormChiTietNhanVien
        closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && nvien[rowToEdit]}
        />
      )}
        </div>
    );
}
export default XemThongTinNhanVien;

