import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login/login'
import SignUp from './components/SignUp/signup'
import DemoLogin from './components/Demo Login/demoLogin'
import Layout from './components/Layout/layout'
// import Header from './components/Header/header'
// import SideBar from './components/Side Bar/sideBar'
import './App.scss'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/demoLogin' element={<DemoLogin />} />
        <Route path='/layout' element={<Layout />} />
        <Route path='*' element={<Navigate to='login' />} />
      </Routes>
    </Router>
  )
}

export default App;
