import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001/api",
});

const updateUser = async (userData) => {
  const endpoint = "/updateUser/" + userData.id;
  console.log(endpoint);
  try {
    const response = await client.put(endpoint, userData);
    console.log(response.data);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getUserData = async (userId) => {
  const endpoint = "/UserData/" + userId;
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.userData;
    } else {
      console.log("not get user data");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return 0;
  }
};
const setUserInfo = async (userData) => {
  const endpoint = "/setUserInfo/" + userData.id;
  console.log(endpoint);
  try {
    const response = await client.put(endpoint, userData);
    console.log(response.data);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const addUser = async (data) => {
  try {
    const response = await client.post("/addUser", data);
    return response.data;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getAllBranchs = async () => {
  try {
    const response = await client.get("/BranchManagement/getBranchs");
    if (response.data.success) {
      return response.data.branchs;
    } else {
      console.log("not get branchs");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addBranch = async (data) => {
  const endpoint = "/BranchManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const deleteBranch = async (id) => {
  try {
    await client.delete("/BranchManagement/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateBranch = async (data, id) => {
  const endpoint = "/BranchManagement/update/" + id;
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const getBranchsBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `/BranchManagement/Branchs?${queryParams}`
    );

    if (response.data.success) {
      return response.data.branchs;
    } else {
      console.log("not get branchs");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getAllStaffs = async () => {
  try {
    const response = await client.get("/StaffManagement/getStaffs");
    if (response.data.success) {
      return response.data.staffs;
    } else {
      console.log("not get staffs");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addStaff = async (data) => {
  const endpoint = "/StaffManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const deleteStaff = async (id) => {
  try {
    await client.delete("/StaffManagement/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateStaff = async (data, id) => {
  const endpoint = "/StaffManagement/update/" + id;
  console.log(id);
  console.log(data);
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const getStaffsBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`/StaffManagement/Staffs?${queryParams}`);

    if (response.data.success) {
      return response.data.staffs;
    } else {
      console.log("not get staffs");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

const findAccountofStaff = async (maNV) => {
  try {
    const response = await client.get("/findAccountofStaff/" + maNV);
    if (response.data.success) {
      return response.data.idTK;
    } else {
      console.log("not get");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return {};
  }
};
const addDoc = async (endpoint, data) => {
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const updateDoc = async (endpoint, data) => {
  try {
    const response = await client.put(endpoint, data);
    return response.data.success;
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteDoc = async (endpoint) => {
  try {
    const response = await client.delete(endpoint);
    return response.data.success;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getDoc = async (endpoint) => {
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.item;
    } else return null;
  } catch (error) {
    console.log("error: ", error.message);
    return null;
  }
};
const getDocs = async (endpoint) => {
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.list;
    } else {
      console.log("not get list");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getDocByField = async (endpoint) => {
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data.list;
    } else {
      console.log("not get list");
      return [];
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getDocsBySearch = async (endpoint, searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`${endpoint}?${queryParams}`);

    if (response.data.success) {
      return response.data.list;
    }
    return [];
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getAllDiscounts = async () => {
  try {
    const response = await client.get("/DiscountManagement/getDiscounts");
    if (response.data.success) {
      return response.data.discounts;
    } else {
      console.log("not get discounts");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addDiscount = async (data) => {
  const endpoint = "/DiscountManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateDiscount = async (data, id) => {
  const endpoint = "/DiscountManagement/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteDiscount = async (id) => {
  try {
    await client.delete("/DiscountManagement/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getDiscountsBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `/DiscountManagement/Discounts?${queryParams}`
    );

    if (response.data.success) {
      return response.data.discounts;
    } else {
      console.log("not get discounts");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getAllBills = async () => {
  try {
    const response = await client.get("/BillManagement/getBills");
    if (response.data.success) {
      return response.data.bills;
    } else {
      console.log("not get bills");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addBill = async (data) => {
  const endpoint = "/BillManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateBill = async (data, id) => {
  const endpoint = "/BillManagement/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteBill = async (id) => {
  try {
    await client.delete("/BillManagement/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getBillsBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`/BillManagement/Bills?${queryParams}`);

    if (response.data.success) {
      return response.data.bills;
    } else {
      console.log("not get bills");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getHSDT = async (id) => {
  try {
    const response = await client.get("/PatientManagement/getHSDT/" + id);
    if (response.data.success) {
      return response.data.HSDT;
    } else {
      console.log("not get HSDT");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return {};
  }
};
// router.post('/PatientManagement/chitietHSDT/add', addchitietHSDT);
// router.put('/PatientManagement/chitietHSDT/update/:Id', updateCTHSDT);
const addCTHSDT = async (data) => {
  const endpoint = "/PatientManagement/chitietHSDT/add";
  try {
    const response = await client.post(endpoint, data);
    return { id: response.data.docId, image: response.data.image };
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateCTHSDT = async (data, id) => {
  const endpoint = "/PatientManagement/chitietHSDT/update/" + id;
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
// router.get('/PatientManagement/getCTHSDT/:HSId', getCTHSDT);
const getListCTHSDT = async (id) => {
  try {
    const response = await client.get("/PatientManagement/getCTHSDT/" + id);
    if (response.data.success) {
      return response.data.cthsdt;
    } else {
      console.log("not get list CTHSDT");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getTreatmentRecordDetailById = async (id) => {
  try {
    const response = await client.get(
      "/TreatmentRecordDetailManagement/getTreatmentRecordDetailById/" + id
    );
    if (response.data.success) {
      console.log(response.data.cthsdtById);
      return response.data.cthsdtById;
    } else {
      console.log("not get treatment record detail");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getAllKindOfRoom = async () => {
  try {
    const response = await client.get("/KindOfRoom/getKindOfRoom");
    if (response.data.success) {
      return response.data.kindOfRoom;
    } else {
      console.log("not get king of room");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addKindOfRoom = async (data) => {
  const endpoint = "/KindOfRoom/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateKindOfRoom = async (data, id) => {
  const endpoint = "/KindOfRoom/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteKindOfRoom = async (id) => {
  try {
    await client.delete("/KindOfRoom/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getKindOfRoomBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`/KindOfRoom/KindOfRoom?${queryParams}`);

    if (response.data.success) {
      return response.data.kindOfRoom;
    } else {
      console.log("not get kindOfRoom");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getAllFloors = async () => {
  try {
    const response = await client.get("/Floor/getFloors");
    if (response.data.success) {
      return response.data.tang;
    } else {
      console.log("not get floor");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addFloor = async (data) => {
  const endpoint = "/Floor/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateFloor = async (data, id) => {
  const endpoint = "/Floor/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteFloor = async (id) => {
  try {
    await client.delete("/Floor/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const getAllBookedRoom = async () => {
  try {
    const response = await client.get("/BookedRoom/getBookedRoom");
    if (response.data.success) {
      return response.data.bookedRoom;
    } else {
      console.log("not get booked room");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addBookedRoom = async (data) => {
  const endpoint = "/BookedRoom/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateBookedRoom = async (data, id) => {
  const endpoint = "/BookedRoom/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteBookedRoom = async (id) => {
  try {
    await client.delete("/BookedRoom/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const getBookedRoomBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `/BookedRoom/bookedRoom?${queryParams}`
    );

    if (response.data.success) {
      return response.data.list;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

const getAllReview = async () => {
  try {
    const response = await client.get("/Review/getReview");
    if (response.data.success) {
      return response.data.review;
    } else {
      console.log("not get review");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addReview = async (data) => {
  const endpoint = "/Review/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateReview = async (data, id) => {
  const endpoint = "/Review/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteReview = async (id) => {
  try {
    await client.delete("/Review/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getMaterialsUsed = async () => {
  try {
    const response = await client.get("/MaterialUsed/get");
    if (response.data.success) {
      return response.data.MU;
    } else {
      console.log("not get material use");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addMaterialUsed = async (data) => {
  const endpoint = "/MaterialUsed/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const deleteMaterialUsed = async (id) => {
  try {
    await client.delete("/MaterialUsed/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateMaterialUsed = async (data, id) => {
  const endpoint = "/MaterialUsed/update/" + id;
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const getMaterialUsedBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`/MaterialUsed/search?${queryParams}`);

    if (response.data.success) {
      return response.data.list;
    } else {
      console.log("not get VatTuDaSuDung");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};


const getAllMaterials = async () => {
  try {
    const response = await client.get(
      "/Material/get"
    );
    if (response.data.success) {
      return response.data.materials;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

const addMaterial = async (data) => {
  const endpoint = "/Material/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const deleteMaterial = async (id) => {
  try {
    await client.delete("/Material/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateMaterial = async (data, id) => {
  const endpoint = "/Material/update/" + id;
  console.log(id);
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const getMaterialsBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `Material/search?${queryParams}`
    );

    if (response.data.success) {
      return response.data.materials;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

const getAllReceivingStock = async () => {
  try {
    const response = await client.get(
      "/ReceivingStock/get"
    );
    if (response.data.success) {
      return response.data.materials;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addReceivingStock = async (data) => {
  const endpoint = "/ReceivingStock/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const deleteReceivingStock = async (id) => {
  try {
    await client.delete("/ReceivingStock/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateReceivingStock = async (data, id) => {
  const endpoint = "/ReceivingStock/update/" + id;
  console.log(id);
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const getReceivingStockBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `ReceivingStock/search?${queryParams}`
    );

    if (response.data.success) {
      return response.data.list;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

const getAllDamagedMaterial = async () => {
  try {
    const response = await client.get(
      "/DamagedMaterial/get"
    );
    if (response.data.success) {
      return response.data.materials;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addDamagedMaterial = async (data) => {
  const endpoint = "/DamagedMaterial/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const deleteDamagedMaterial = async (id) => {
  try {
    await client.delete("/DamagedMaterial/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateDamagedMaterial = async (data, id) => {
  const endpoint = "/DamagedMaterial/update/" + id;
  console.log(id);
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const getDamagedMaterialBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `DamagedMaterial/search?${queryParams}`
    );

    if (response.data.success) {
      return response.data.list;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

const getWashingMachine = async () => {
  try {
    const response = await client.get("/WashingMachine/get");
    if (response.data.success) {
      return response.data.washingMachine;
    } else {
      console.log("not get washing machine");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addWashingMachine = async (data) => {
  const endpoint = "/WashingMachine/add";
  try {
    const washingMachine = await client.post(endpoint, data); // <- POST
    return washingMachine.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const updateWashingMachine = async (data, id) => {
  const endpoint = "/WashingMachine/update/" + id;
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};

const deleteWashingMachine = async (id) => {
  try {
    await client.delete("/WashingMachine/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const getWashingMachineUsedBySearch = async (searchCriteria) => {
  try {
    // Xây dựng query parameter từ searchCriteria object
    const queryParams = new URLSearchParams(searchCriteria).toString();

    const response = await client.get(`/WashingMachine/search?${queryParams}`);

    if (response.data.success) {
      return response.data.washingMachine;
    } else {
      console.log("not get washingMachine");
      return [];
    }
  } catch (error) {
    console.error("error: ", error.message);
    return [];
  }
};

const getAllBlocks = async () => {
  try {
    const response = await client.get(
      "/Block/get"
    );
    if (response.data.success) {
      return response.data.materials;
    } else {
      console.log("not get materials");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addBlock = async (data) => {
  const endpoint = "/Block/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const updateBlock = async (data, id) => {
  const endpoint = "/Block/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};

const deleteBlock = async (id) => {
  try {
    await client.delete("/Block/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const getBlocksBySearch = async (searchCriteria) => {
  try {
    // Xây dựng query parameter từ searchCriteria object
    const queryParams = new URLSearchParams(searchCriteria).toString();

    const response = await client.get(`/Block/search?${queryParams}`);

    if (response.data.success) {
      return response.data.list;
    } else {
      console.log("not get washingMachine");
      return [];
    }
  } catch (error) {
    console.error("error: ", error.message);
    return [];
  }
};

export default {
  getAllDiscounts,
  addDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountsBySearch,
  addUser,
  updateUser,
  setUserInfo,
  getUserData,
  getAllBranchs,
  addBranch,
  updateBranch,
  deleteBranch,
  getBranchsBySearch,
  getAllStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
  getStaffsBySearch,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocByField,
  getDocsBySearch,
  findAccountofStaff,
  getAllBills,
  addBill,
  updateBill,
  getBillsBySearch,
  getTreatmentRecordDetailById,
  getHSDT,
  addCTHSDT,
  updateCTHSDT,
  getListCTHSDT,
  getAllKindOfRoom,
  addKindOfRoom,
  updateKindOfRoom,
  deleteKindOfRoom,
  getAllFloors,
  addFloor,
  updateFloor,
  deleteFloor,
  getAllBookedRoom,
  addBookedRoom,
  updateBookedRoom,
  deleteBookedRoom,
  getAllReview,
  addReview,
  updateReview,
  deleteReview,
  getAllMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialsBySearch,
  addMaterialUsed,
  getMaterialsUsed,
  updateMaterialUsed,
  deleteMaterialUsed,
  getMaterialUsedBySearch,
  getWashingMachine,
  addWashingMachine,
  updateWashingMachine,
  deleteWashingMachine,
  getWashingMachineUsedBySearch,
  getAllReceivingStock,
  addReceivingStock,
  deleteReceivingStock,
  updateReceivingStock,
  getReceivingStockBySearch,
  getAllDamagedMaterial,
  addDamagedMaterial,
  deleteDamagedMaterial,
  updateDamagedMaterial,
  getDamagedMaterialBySearch,
  getAllBlocks,
  addBlock,
  updateBlock,
  deleteBlock,
  getBlocksBySearch,
  getBookedRoomBySearch,
  getKindOfRoomBySearch
};