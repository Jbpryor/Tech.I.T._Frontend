import './sideBar.scss';
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";


function SideBar() {

  const demoUser = useSelector((state) => state.demoUser);

  const userName = `Demo-User ${capitalizeFirstLetter(demoUser)}`;

  const theme = useSelector((state) => state.settings.themes[state.settings.theme]);

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
  };


  return (
    <section className="sideBar" style={{ background: theme.primary_color, color: theme.font_color }}>
      <div className="sideBar-links">
        <NavLink to="/dashboard" activeclassname='active' className="nav-link dashboard-link" style={{color: theme.font_color}}>
          Dashboard
        </NavLink>
        {(demoUser === 'admin' || demoUser === 'manager') && <NavLink to="/users" activeclassname='active' className="nav-link users-link" style={{color: theme.font_color}}>
          Users
        </NavLink>}
        {(demoUser === 'admin' || demoUser === 'manager') && <NavLink to="/projects" activeclassname='active' className="nav-link projects-link" style={{color: theme.font_color}}>
          Projects
        </NavLink>}
        <NavLink to="/issues" activeclassname='active' className="nav-link issues-link" style={{color: theme.font_color}}>
          Issues
        </NavLink>
        <NavLink to="/reports" activeclassname='active' className="nav-link reports-link" style={{color: theme.font_color}}>
          Reports
        </NavLink>
      </div>
      <div className="settings-container">
        <NavLink to='/settings'>
            <i className="bx bx-cog settings-icon" style={{color: theme.font_color}}></i>
        </NavLink>        
      </div>
      <div className="user-container">
        <NavLink to='users/user-1697405766098-499'>
            <i className="bx bxs-user-rectangle user-icon" style={{ color: getIconColor() }}></i>
        </NavLink>
        <div className="user-name">Hello, <br />{userName}</div>
      </div>
    </section>
  );
}

export default SideBar;