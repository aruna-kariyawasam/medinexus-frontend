import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Routes, Route, useLocation} from 'react-router-dom'
import Services from './Pages/Services/Services'
import Contact from './Pages/Contact/Contact'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Register_doctor from './Pages/Register/users/Register_doctor'
import Register_pharmacist from './Pages/Register/users/Register_pharmacist'
import Register_nurse from './Pages/Register/users/Register_nurse'
import Register_patient from './Pages/Register/users/Register_patient'
import Nursing from './Pages/Nursing/Nursing'
import TermsAndConditions from './Pages/Register/users/TermsandConditions'
import DocAfterLogin from './DoctorDashboard/DocAfterLogin'
import PatAfterLogin from './PatientDashboard/PatAfterLogin'
import NurseAfterLogin from './NurseDashboard/NurseAfterLogin'
import DoctorList from './DoctorDashboard/DoctorList'
import PaymentGateway from './Pages/Payment_gateway'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminDashboard from './Admin Dashboard/AdminDashboard'


const App = () => {
  const location = useLocation();
  
  const hideNavbarPaths = [
    '/docafterlogin',
    '/patafterlogin',
    '/nurafterlogin',
    '/doclist',
    '/payment',
    '/admindash',
    '/patafterlogin'
  ];
  
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  
  return (
    <div className='app'>
      {shouldShowNavbar && <Navbar/>}   
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/nursing' element={<Nursing/>}/>
        <Route path='/docRegi' element={<Register_doctor/>}/>
        <Route path='/pharmRegi' element={<Register_pharmacist/>}/>
        <Route path='/nurRegi' element={<Register_nurse/>}/>
        <Route path='/patRegi' element={<Register_patient/>}/>
        <Route path='/tc' element={<TermsAndConditions/>}/>
        <Route path='/docafterlogin' element={<DocAfterLogin/>}/>
        <Route path='/patafterlogin' element={<PatAfterLogin/>}/>
        <Route path='/nurafterlogin' element={<NurseAfterLogin/>}/>
        <Route path='/doclist' element={<DoctorList/>}/>
        <Route path='/payment' element={<PaymentGateway/>}/>
        <Route path='/admindash' element={<AdminDashboard/>}/>
      </Routes> 
    </div>
  )
}

export default App