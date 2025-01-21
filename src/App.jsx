import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
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

const App = () => {
  return (
    <div className='app'>
      <Navbar/>   
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
      </Routes> 
    </div>
  )
}

export default App
