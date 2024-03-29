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

import ServicesPage from './views/ServicesPage';
import ContactPage from './views/ContactPage';
import ForgetPassword from './views/ForgetPassword';

function App() {

  return (

    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/rooms">
          <RoomsPage />
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
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/manager">
          <Manager/>
        </Route>

        <Route path="/" exact>
          <IntroductionPage />
        </Route>
        
      </Switch>
    </Router >
  );
}

export default App;
