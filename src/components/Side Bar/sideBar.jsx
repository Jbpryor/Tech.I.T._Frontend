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
        <NavLink to="/Dashboard" activeclassname='active' className="nav-link dashboard-link">
          Dashboard
        </NavLink>
        <NavLink to="/Users" activeclassname='active' className="nav-link users-link">
          Users
        </NavLink>
        <NavLink to="/Projects" activeclassname='active' className="nav-link projects-link">
          Projects
        </NavLink>
        <NavLink to="/Issues" activeclassname='active' className="nav-link issues-link">
          Issues
        </NavLink>
        <NavLink to="/Reports" activeclassname='active' className="nav-link reports-link">
          Reports
        </NavLink>
      </div>
      <div className="settings-container">
        <NavLink to='/Settings'>
            <i className="bx bx-cog settings-icon"></i>
        </NavLink>        
      </div>
      <div className="user-container">
        <NavLink to='/Logout'>
            <i className="bx bxs-user-rectangle user-icon"></i>
        </NavLink>
        <div className="user-name">Hello, <br />user-name</div>
      </div>
    </section>
  );
}

export default SideBar;