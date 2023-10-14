import './sideBar.scss';
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

function SideBar() {

  const demoUser = useSelector((state) => state.demoUser);

  const userName = `Demo-user ${demoUser}`;

  const getIconColor = () => {
    if (demoUser === 'admin') {
        return 'rgb(1, 182, 1)';
    } else if (demoUser === 'manager') {
        return 'rgb(255, 165, 0)';
    } else if (demoUser === 'developer') {
        return 'rgb(232, 232, 15)';
    } else if (demoUser === 'submitter') {
        return 'rgb(224, 1, 1)';
    }
    return 'black';
};


  return (
    <section className="sideBar">
      <div className="logo-container">
        <div className="header-logo">
          <img src="#" alt="#" />
        </div>
      </div>
      <div className="sideBar-links">
        <NavLink to="/dashboard" activeclassname='active' className="nav-link dashboard-link">
          Dashboard
        </NavLink>
        {(demoUser === 'admin' || demoUser === 'manager') && <NavLink to="/users" activeclassname='active' className="nav-link users-link">
          Users
        </NavLink>}
        {(demoUser === 'admin' || demoUser === 'manager') && <NavLink to="/projects" activeclassname='active' className="nav-link projects-link">
          Projects
        </NavLink>}
        <NavLink to="/issues" activeclassname='active' className="nav-link issues-link">
          Issues
        </NavLink>
        <NavLink to="/reports" activeclassname='active' className="nav-link reports-link">
          Reports
        </NavLink>
      </div>
      <div className="settings-container">
        <NavLink to='/settings'>
            <i className="bx bx-cog settings-icon"></i>
        </NavLink>        
      </div>
      <div className="user-container">
        <NavLink to='/logout'>
            <i className="bx bxs-user-rectangle user-icon" style={{ color: getIconColor() }}></i>
        </NavLink>
        <div className="user-name">Hello, <br />{userName}</div>
      </div>
    </section>
  );
}

export default SideBar;