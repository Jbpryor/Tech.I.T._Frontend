import './sideBar.scss';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from '../../../utils';
import { selectTheme } from '../../Users/User/Settings/settingsSlice';
import { selectDemoUser } from '../../Auth/Demo Login/demoUserSlice';
import useAuth from '../../../Hooks/useAuth'


function SideBar() {

  const { userName, role } = useAuth();

  const theme = useSelector(selectTheme);

  const getIconColor = () => {
    if (role === 'Admin') {
        return 'rgb(1, 182, 1)';
    } else if (role === 'Manager') {
        return 'rgb(255, 165, 0)';
    } else if (role === 'Developer') {
        return 'rgb(232, 232, 15)';
    } else if (role === 'Submitter') {
        return 'rgb(224, 1, 1)';
    }
  };

  return (
    <section className={`sideBar ${role === 'Admin' || role === 'Manager' ? 'grid-1' : 'grid-2'}`} style={{ background: theme.primary_color, color: theme.font_color }}>
      <div className="sideBar-links">
        <NavLink to="/dashboard" activeclassname='active' className="nav-link dashboard-link" style={{color: theme.font_color}}>
          <span className='dashboard-link text'>Dashboard</span>
          <span className='dashboard-link icon' style={{ fontSize: '30px', color: theme.font_color}} ><i className='bx bxs-dashboard dashboard-link' /></span>
        </NavLink>
        {(role === 'Admin' || role === 'Manager') && <NavLink to="/users" activeclassname='active' className="nav-link users-link" style={{color: theme.font_color}}>
          <span className='users-link text'>Users</span>
          <span className='users-link icon' style={{ fontSize: '30px', color: theme.font_color}} ><i className='bx bxs-group users-link' /></span>
        </NavLink>}
        {(role === 'Admin' || role === 'Manager') && <NavLink to="/projects" activeclassname='active' className="nav-link projects-link" style={{color: theme.font_color}}>
          <span className='projects-link text'>Projects</span>
          <span className='projects-link icon' style={{ fontSize: '30px', color: theme.font_color}} ><i className='bx bx-task projects-link' /></span>
        </NavLink>}
        <NavLink to="/issues" activeclassname='active' className="nav-link issues-link" style={{color: theme.font_color}}>
          <span className='issues-link text'>Issues</span>
          <span className='issues-link icon' style={{ fontSize: '30px', color: theme.font_color}} ><i className='bx bxs-bug issues-link' /></span>
        </NavLink>
        <NavLink to="/reports" activeclassname='active' className="nav-link reports-link" style={{color: theme.font_color}}>
          <span className='reports-link text'>Reports</span>
          <span className='reports-link icon' style={{ fontSize: '30px', color: theme.font_color}} ><i className='bx bxs-report reports-link' /></span>
        </NavLink>
      </div>
      <div className="settings-icon-container">
        <NavLink to='/settings' className="nav-link settings-link" >
            <i className="bx bx-cog settings-icon" style={{color: theme.font_color}}></i>
        </NavLink>        
      </div>
      <div className="user-icon-container">
        {/* change this to logout function */}
        <NavLink to='/' className="nav-link user-link" >
            <i className="bx bxs-user-rectangle user-icon" style={{ color: getIconColor() }}></i>
        </NavLink>
        <div className="user-name-welcome">Hello, <br />{userName}</div>
      </div>
    </section>
  );
}

export default SideBar;