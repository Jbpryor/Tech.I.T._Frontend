import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login/login'
import Dashboard from './components/Dashboard/dashboard'
// import Header from './components/Header/header'
// import SideBar from './components/Side Bar/sideBar'
import './App.scss'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Navigate to='login' />} />
      </Routes>
    </Router>
  )
}

export default App;
