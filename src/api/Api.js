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

  export default {
    addUser,
    updateUser,
    setUserInfo,
    getUserData,
  };