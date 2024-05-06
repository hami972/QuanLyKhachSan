// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAEbtjcbfUT5PenbIUyXLqkoVpEQRjBVrs",
//   authDomain: "phongmachtu-52829.firebaseapp.com",
//   projectId: "phongmachtu-52829",
//   storageBucket: "phongmachtu-52829.appspot.com",
//   messagingSenderId: "633126895578",
//   appId: "1:633126895578:web:ccc702be563e893955cae3",
//   measurementId: "G-JMP2N8LRFE"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDZlvBikxj3Z_edNtNvbQR2971r-fzoNQk",
  authDomain: "managehotel-1cae3.firebaseapp.com",
  projectId: "managehotel-1cae3",
  storageBucket: "managehotel-1cae3.appspot.com",
  messagingSenderId: "774724583614",
  appId: "1:774724583614:web:a3259da14e2292fd5c5eef",
  measurementId: "G-L1SGFZFTHW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
