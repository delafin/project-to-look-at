import './App.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Verify from './components/Auth/Verify/verify';
import EmailVerified from './components/Auth/Verify/email_verified';
import Payment from './components/Payments/payment';
import Info from './components/Dashboard/Instructions/info';
import Success from './components/Payments/success';
import Invalid from './components/Payments/invalid';
import Home from './components/Pages/home';

import Log from './components/Auth/logIn/log';
import Register from './components/Auth/Signup/register';
import EmailVerifyLogin from './components/Auth/Verify/email_verify_login';
import ForgotPassword from './components/Auth/ForgotPassword/forgotPassword';
import EmailVerification from './components/Auth/ForgotPassword/emailVerification';
import PasswordChange from './components/Auth/ForgotPassword/passwordChange';

import SideBar from './components/Dashboard/Header/sidebar';

import PlaceOrder from './components/Dashboard/makeOrder/placeOrder';

function App(){
  return(
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        
        <Route exact path='/verify' element={<Verify />} />
        <Route exact path='/email-verified/:token' element={<EmailVerified />} />
        <Route exact path='/order/pay/:id' element={<Payment />} />
        <Route exact path='/info/:id' element={<Info />} />
        <Route exact path='pay/success' element={<Success />} />
        <Route exact path='pay/invalid' element={<Invalid />} />

        <Route exact path='/log' element={<Log />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/verified/:token' element={<EmailVerifyLogin />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route exact path='/email-verification' element={<EmailVerification />} />
        <Route exact path='/password-change/:token' element={<PasswordChange />} />

        <Route exact path='/dashboard/orders' element={<SideBar />} />

        <Route exact path='/dashboard/placeorder' element={<PlaceOrder />} />

      </Routes>
    </Router>
  )
}

export default App;