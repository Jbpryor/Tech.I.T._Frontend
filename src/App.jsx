import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login/login'
import DemoLogin from './components/Auth/Demo Login/demoLogin'
import Layout from './components/Layout/layout'

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
          <Route path="/demoLogin" element={<DemoLogin />} />
            <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
