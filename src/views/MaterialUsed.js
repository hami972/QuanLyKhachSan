import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";
import api from '../api/Api';
import Select from 'react-select';
import { FormMaterialUsed } from "../components/FormMaterialUsed";
import { AuthContext } from '../hook/AuthProvider'
import moment from "moment";
const MaterialUsed = () => {
    
    const [modalOpen, setModalOpen] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [materialsUsed, setMaterialUsed] = useState(null)
    const [khoiphucSL, setKhoiPhucSL] = useState(null)
    const { user } = useContext(AuthContext);
    useEffect(async () => {
        await getMaterials();
        getMatierialUsed()
    }, []);
    const getMaterials = async () => {
        const materials = await api.getAllMaterials()
        const fil = materials.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        setMaterials(fil);
    }
    const getMatierialUsed = async () => {
        const res = await api.getMaterialsUsed()
        const fil = res.filter((item, idx) => item.chiNhanh === user?.chinhanh)
        setMaterialUsed(fil)

    }
    const handleDeleteRow = async (item, id) => {
        const S = item.NgaySuDung.split('-')
        const namS = parseInt(S[0])
        const thangS = parseInt(S[1])
        const ngayS = parseInt(S[2])
        const currentDate = new Date();
        const Day = currentDate.getDate();
        const Month = currentDate.getMonth() + 1;
        const Year = currentDate.getFullYear();
        if (namS < Year || thangS < Month || ngayS < Day) {
            window.confirm('Vật tư đã sử dụng này đã hết thời hạn có thể điều chỉnh');
            return;
        }

        const shouldDelete = window.confirm('Bạn có chắc muốn xóa không?');
        if (shouldDelete) {
            await api.deleteMaterialUsed(item.Id)
            setMaterialUsed(materialsUsed.filter((_, idx) => idx !== id));
            const result = materials.filter((item1, idx) => item1.maVatTu === item.maVatTu)
            let x = parseInt(result[0].soLuongTonKho) + parseInt(item.SL)
            console.log('1:' + result[0].soLuongTonKho + '2:' + item.SL + 'll' + x)
            let updated2 = materials.map((item1, idx) => {
                if (item1.maVatTu !== item.maVatTu) return item1;
                return { ...item1, soLuongTonKho: x };
            })
            setMaterials(updated2)
            await api.updateMaterial({ soLuongTonKho: x.toString() }, result[0].Id)
        }
    }
    const handleEditRow = (index) => {
        const S = materialsUsed[index].NgaySuDung.split('-')
        const namS = parseInt(S[0])
        const thangS = parseInt(S[1])
        const ngayS = parseInt(S[2])
        const currentDate = new Date();
        const Day = currentDate.getDate();
        const Month = currentDate.getMonth() + 1;
        const Year = currentDate.getFullYear();
        if (namS < Year || thangS < Month || ngayS < Day) {
            window.confirm('Vật tư đã sử dụng này đã hết thời hạn có thể điều chỉnh');
            return;
        }
        setRowToEdit(index);
        const result = materials.filter((item1, idx) => item1.maVatTu === materialsUsed[index].maVatTu)
        let lamlai = parseInt(result[0].soLuongTonKho) + parseInt(materialsUsed[index].SL)
        console.log('1:' + result[0].soLuongTonKho + '2:' + materialsUsed[index].SL + 'll' + lamlai)
        setKhoiPhucSL(lamlai)
        setModalOpen(true);
    }
    const handleSubmit = async (newRow) => {
        if (rowToEdit == null) {
            const id = await api.addMaterialUsed({ ...newRow, chiNhanh: user.chinhanh });
            newRow.Id = id.docId;
            setMaterialUsed([newRow, ...materialsUsed]);
            const result = materials.filter((item1, idx) => item1.maVatTu === newRow.maVatTu)
            let x = parseInt(result[0].soLuongTonKho) - parseInt(newRow.SL)
            let updated2 = materials.map((item, idx) => {
                if (item.maVatTu !== newRow.maVatTu) return item;
                return { ...item, soLuongTonKho: x };
            })
            setMaterials(updated2)
            await api.updateMaterial({ soLuongTonKho: x.toString() }, result[0].Id)
        }
        else {
            await api.updateMaterialUsed(newRow, newRow.Id);
            let updated = materialsUsed.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return newRow;
            })
            const result = materials.filter((item1, idx) => item1.maVatTu === newRow.maVatTu)
            let x = parseInt(khoiphucSL) - parseInt(newRow.SL)
            console.log('x' + x)
            let updated2 = materials.map((item, idx) => {
                if (item.maVatTu !== newRow.maVatTu) return item;
                return { ...item, soLuongTonKho: x };
            })
            setMaterials(updated2)
            await api.updateMaterial({ soLuongTonKho: x.toString() }, result[0].Id)
            setMaterialUsed(updated)
        }
    }
    const [searchCriteria, setSearchCriteria] = useState({
        maVatTu: "",
        tenVatTu: "",
        NgaySuDung: "",
        SL: ""
    })
    const onSearch = async () => {

        const searchResults = await api.getMaterialUsedBySearch(searchCriteria);
        console.log(searchResults);
        const fil = searchResults.filter((item, idx) => item.chiNhanh === user.chinhanh)
        console.log(fil)
        setMaterialUsed(fil);
    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Mã vật tư</b></div>
                    <Select className="mb-2"
                        value={materials.find(item => item.maVatTu === searchCriteria.maVatTu) || ''}
                        onChange={(value) => value !== null ? setSearchCriteria({ ...searchCriteria, maVatTu: value.maVatTu, tenVatTu: value.tenVatTu }) : setSearchCriteria({ ...searchCriteria, maVatTu: "", tenVatTu: "" })}
                        options={materials}
                        isClearable
                        getOptionLabel={(item) => item.maVatTu}
                        getOptionValue={(item) => item}
                        placeholder=""
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Tên vật tư</b></div>
                    <Select className="mb-2"
                        value={materials.find(item => item.maVatTu === searchCriteria.maVatTu) || ''}
                        onChange={(value) => value !== null ? setSearchCriteria({ ...searchCriteria, maVatTu: value.maVatTu, tenVatTu: value.tenVatTu }) : setSearchCriteria({ ...searchCriteria, maVatTu: "", tenVatTu: "" })}
                        options={materials}
                        isClearable
                        placeholder=""
                        getOptionLabel={(item) => item.tenVatTu}
                        getOptionValue={(item) => item}
                    />
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="mb-2"><b>Ngày sử dụng</b></div>
                    <input type="date" className="form-control pb-2 pt-2" id="NgaySuDung" name="NgaySuDung" value={searchCriteria.NgaySuDung} onChange={(e) => { setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value }) }} />
                </div>
                <div className="text-end">
                    <button type="submit" className="btn pb-2 pt-2 mt-3 me-2" style={{ backgroundColor: "#905700", color: "#FFFFFF" }} onClick={onSearch}>
                        Tìm kiếm
                    </button>
                    <button type="submit" className="btn pb-2 pt-2 mt-3" style={{ backgroundColor: "#905700", color: "#FFFFFF" }} onClick={() => setModalOpen(true)}>
                        Thêm
                    </button>
                </div>
            </div>
            <table className="table" >
                <thead style={{ verticalAlign: "middle" }}>
                    <tr className="table-secondary">
                        <th>Mã vật tư thiết bị</th>
                        <th>Tên vật tư thiết bị</th>
                        <th>Số lượng</th>
                        <th>Đơn giá nhập</th>
                        <th>Ngày sử dụng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {materialsUsed?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.maVatTu}</td>
                            <td>{item.tenVatTu}</td>
                            <td>{item.SL}</td>
                            <td> {new Intl.NumberFormat("en-DE").format(item.donGiaNhap)}</td>
                            <td>{moment(new Date(item.NgaySuDung)).format("DD/MM/YYYY")}</td>
                            <td className="fit">
                                <span className="actions">
                                    <BsFillTrashFill
                                        className="delete-btn"
                                        onClick={() => handleDeleteRow(item, index)}
                                    />
                                    <BsFillPencilFill
                                        className="edit-btn"
                                        onClick={() => handleEditRow(index)}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen && (
                <FormMaterialUsed
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && materialsUsed[rowToEdit]}
                    materials={materials}
                />
            )}
        </div>
    )
}
export default MaterialUsed;