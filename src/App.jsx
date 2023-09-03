import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login/login'
import SignUp from './components/SignUp/signup'
import DemoLogin from './components/Demo Login/demoLogin'
import Layout from './components/Layout/layout'
import Dashboard from './components/Dashboard/dashboard'
import Details from "./components/Details/details";
import ProjectUsers from "./components/Project Users/projectUsers";
import RoleAssignment from "./components/Role Assignment/roleAssignment";
import Tickets from "./components/Tickets/tickets";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/demoLogin" element={<DemoLogin />} />

            <Route path="/*" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="details" element={<Details />} />
              <Route path="projectUsers" element={<ProjectUsers />} />
              <Route path="roleAssignment" element={<RoleAssignment />} />
              <Route path="tickets" element={<Tickets />} />
            </Route>



            {/* <Route path="/dashboard" element={<Layout />} >
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/details" element={<Layout />} >
              <Route index element={<Details />} />
            </Route>
            <Route path="/projectUsers" element={<Layout />} >
              <Route index element={<ProjectUsers />} />
            </Route>
            <Route path="/roleAssignment" element={<Layout />} >
              <Route index element={<RoleAssignment />} />
            </Route>
            <Route path="/tickets" element={<Layout />} >
              <Route index element={<Tickets />} />
            </Route> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    </Router>
  );
}


export default App;
