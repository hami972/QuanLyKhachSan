import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./FirebaseConfig";
import Api from "../api/Api";
import CustomModal from '../components/MessageBox.js';
import nav from './PhanQuyen'
import api from "../api/Api.js"
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [ndshow, setNdshow] = useState('');
  const [scope, setScope] = useState(nav.nav0);
  const [scopeQL, setScopeQL] = useState(nav.nav2_1);
  const [scopeQLLH, setScopeQLLH] = useState(nav.nav2_5_1);
  const [user, setUser] = useState(null);

  const handleShowDialog = (body) => {
    setNdshow(body)
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const FirstLogin = async (id) => {
    console.log('id' + id)
    const userData = await Api.getUserData(id)
      .catch(error => console.error(error));
    console.log(userData)
    if (userData && userData.id) {
      // console.log(userData)
      setUser(userData)
      if (userData.Loai === 'KhachHang') {
        // if (userData.CCCD !== "") {
        //   const patients = await api.getPatientsBySeacrh({
        //     maBenhNhan: "",
        //     tenBenhNhan: "",
        //     CCCD: userData.CCCD,
        //     soDienThoai: ""
        //   })
        //   if (patients.length > 0) {
        //     setScope(nav.nav1)
        //   }
        //   else setScope(nav.nav0)
        // }
        // else setScope(nav.nav0)

      }
      else {
        //setScope(nav.nav2)
        if (userData.Loai === 'Quản lý') {
          setScope(nav.nav2_1)
          setScopeQL(nav.nav2_1)
        }
        else if (userData.Loai === 'Lễ tân') {
          setScope(nav.nav2_3)
          setScopeQL(nav.nav2_3)
          setScopeQLLH(nav.nav2_3)
        }
        else if (userData.Loai === 'Chủ hệ thống') {
          setScope(nav.nav2_2)
          setScopeQL(nav.nav2_2)
        }
        
      }
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (u) => {
      if (u && u.metadata.creationTime === u.metadata.lastSignInTime) return null
      if (u) {
        console.log('hahaah')
        FirstLogin(u.uid)
      } else {
        setUser(null);
      }
    });
    return () => {
      listen();
    }
  }, []);

  const Login = async (email, password, history) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          await FirstLogin(user.uid); // Gọi FirstLogin để lấy thông tin user
          history.push("/"); // Điều hướng sau khi đăng nhập thành công
        })
        .catch((error) => {
          console.log("Error sign in", error);
          handleShowDialog("Tài khoản đăng nhập không đúng!");
        });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  const forgotPassword = async (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        handleShowDialog("Đã gửi email đặt lại mật khẩu! Vui lòng kiểm tra email của bạn.");
        console.log("Đã gửi email đặt lại mật khẩu.");
      })
      .catch((error) => {
        console.error("Lỗi khi gửi email đặt lại mật khẩu: ", error);
      });
  };

  // Các hàm khác của bạn ở đây...

  return (
    <AuthContext.Provider
      value={{
        scopeQLLH,
        scopeQL,
        scope,
        user,
        setUser,
        Login,
        forgotPassword,
        // Các hàm khác của bạn ở đây...
        Logout: async (history) => {
          try {
            // await auth().signOut();
            signOut(auth).then(val => {
              console.log('sign out')
              setUser(null)
              setScope(nav.nav0)
              setScopeQL([])
              setScopeQLLH([])
              //window.location.href = '/'
              history.push("/")
            })
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      <CustomModal
        show={showDialog}
        handleClose={handleCloseDialog}
        body={ndshow}
      />
      {children}
    </AuthContext.Provider>
  );
};
