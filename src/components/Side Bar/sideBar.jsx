import './sideBar.scss'
import 'boxicons/css/boxicons.min.css';
// import React, { useeffect } from 'react';

function SideBar() {

    // useeffect() {

    // }
    return (
        <section className="sideBar">
            <div className="logo-container">
                <div className="header-logo">
                    <img src="#" alt="#" />
                </div>
            </div>
            <div className="sideBar-links">
                <ul>
                    <li className="page1">Dashboard</li>
                    <li className="page2">Manage Users</li>
                    <li className="page3">Tickets</li>
                </ul>
            </div>
            <div className="settings-container">
                <i class='bx bx-cog' ></i>
            </div>
            <div className="user-container">
                <i className='bx bxs-user-rectangle user-icon'></i>
                <div className="user-name">Hello, <br />user-name</div>
            </div>           
        </section>
    )
}

export default SideBar;