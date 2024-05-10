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
  const getBranchsBySeacrh = async (searchCriteria) => {
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
  const getStaffsBySeacrh = async (searchCriteria) => {
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
  const getDocsBySeacrh = async (endpoint, searchCriteria) => {
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
    getBranchsBySeacrh,
    getAllStaffs,
    addStaff,
    updateStaff,
    deleteStaff,
    getStaffsBySeacrh,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocByField,
    getDocsBySeacrh,
    findAccountofStaff,    };