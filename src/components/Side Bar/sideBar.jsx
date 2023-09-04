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
        <NavLink to="/Dashboard" className="nav-link dashboard">
          Dashboard
        </NavLink>
        <NavLink to="/ProjectUsers" className="nav-link project-users">
          Project Users
        </NavLink>
        <NavLink to="/RoleAssignment" className="nav-link role-assignment">
          Role Assignment
        </NavLink>
        <NavLink to="/Tickets" className="nav-link tickets">
          Tickets
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
