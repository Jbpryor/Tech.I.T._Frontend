import './sideBar.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar() {
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
        <NavLink to="/users" activeclassname='active' className="nav-link users-link">
          Users
        </NavLink>
        <NavLink to="/projects" activeclassname='active' className="nav-link projects-link">
          Projects
        </NavLink>
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
            <i className="bx bxs-user-rectangle user-icon"></i>
        </NavLink>
        <div className="user-name">Hello, <br />user-name</div>
      </div>
    </section>
  );
}

export default SideBar;