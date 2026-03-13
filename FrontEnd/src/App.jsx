import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./Home/Home";
import Login from "./Dashboards/Login";
import Signup from "./Dashboards/SignUp";
import DriverMain from "./Dashboards/DriverDashboard/DriverMain";
import AccountInformation from "./Dashboards/DriverDashboard/AccountInformation";
import VehicleRegistration from "./Dashboards/VehicleRegistration";
// import "./App.css";

// ADMIN
import Login2 from './Adminf/Login';
import SignupForm from './Adminf/Signup';
import LoginPage from './Adminf/LoginPage';
import Admin from './Adminf/Admin';
import ChangePassword from './Adminf/ChangePassword';
import DriverList from './Adminf/DriverList';
import Complaints from './Adminf/Complaints';
import OrderHistory from './Adminf/OrderHistory';
import 'boxicons/css/boxicons.min.css';

// Ordermng

import Interface1 from './Ordermng/Interface1';
import Interface2 from './Ordermng/Interface2';


// Complaign
import Complaintss from './Complaints/comm';
import Reviews from './Reviews/ReviewsSection';
// status
import Driver from './Status/driver/driverpage';
import Userpage from './user/userpage';
// pay
import Payment from './Pay/GooglePayButton';


function App() {

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/Login/Signup" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/DriverD" element={<DriverMain />} />
        <Route path="/AccountInformation" element={<AccountInformation />} />
        <Route path="/VehicleRegistration" element={<VehicleRegistration />} />

{/* ADMIN  */}

        <Route path="/login" element={<Login2 />} />
        <Route path="/signup1" element={<SignupForm />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/driver-list" element={<DriverList />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/order_history" element={<OrderHistory/>}/>
        <Route path="/Userpage" element={<Userpage/>} />
     
     {/* Ordewrmng */}
     
        <Route path="/Interface1" element={<Interface1 />} />
        <Route path="/Interface2" element={<Interface2 />} />
      
     {/* Complaints */}

        <Route path="/complaintss" element={<Complaintss />} />
        <Route path="/reviews" element={<Reviews />} />

{/* status */}

        <Route path="/driver" element={<Driver />} />
<Route path="/payment"  element={<Payment />} />          
     
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
