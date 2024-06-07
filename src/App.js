import React from 'react';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RoomsPage from './views/RoomsPage.js';
import SignInPage from './views/SignInPage';
import SignUpPage from './views/SignUpPage';
import IntroductionPage from './views/IntroductionPage'
import Manager from './views/Manager'
import RoomDetail from './views/RoomDetail.js';
import ThanhToan from './views/ThanhToan.js';
import ServicesPage from './views/ServicesPage';
import ContactPage from './views/ContactPage';
import ForgetPassword from './views/ForgetPassword';
import { ThemeContextProvider } from "./context/ThemeContext";
import ThemeProvider from "./hook/ThemeProvider";
import ButtonScrollToTop from './components/ButtonScrollToTop.js';
import { AuthProvider } from './hook/AuthProvider.js';
import RoomManage from './views/RoomManage.js';
import HoSoCaNhan from './views/HoSoCaNhan.js';
import BookingOnline from './views/BookingOnline.js'
function App() {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <Router>
            <ButtonScrollToTop />
            <ScrollToTop />
            <Switch>
              <Route path="/rooms" exact>
                <RoomsPage />
              </Route>
              <Route path="/rooms/:roomId">
                <RoomDetail />
              </Route>
              <Route path="/thanhtoan">
                <ThanhToan />
              </Route>
              <Route path="/services">
                <ServicesPage />
              </Route>
              <Route path="/contacts">
                <ContactPage />
              </Route>
              <Route path="/sign_in">
                <SignInPage />
              </Route>
              <Route path="/sign_up">
                <SignUpPage />
              </Route>
              <Route path="/manager">
                <Manager />
              </Route>
              <Route path="/forgetpassword">
                <ForgetPassword />
              </Route>
              <Route path="/hosocanhan">
                <HoSoCaNhan />
              </Route>

              <Route path="/" exact>
                <IntroductionPage />
              </Route>
              <Route path="/abc" exact>
                <BookingOnline />
              </Route>

            </Switch>
          </Router >
        </ThemeProvider>

      </ThemeContextProvider>
    </AuthProvider>
  );
}

export default App;
