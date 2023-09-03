import './sideBar.scss'
import 'boxicons/css/boxicons.min.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SideBar() {

    const navigate = useNavigate();

    useEffect(() => {
        
        const links = document.querySelectorAll('li');
        const dashboard = document.querySelector('.dashboard');
        const projectUsers = document.querySelector('.project-users');
        const roleAssignment = document.querySelector('.role-assignment');
        const tickets = document.querySelector('.tickets');

        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const clickedText = event.target.textContent;

                switch (clickedText) {
                    case 'Dashboard':
                        navigate('/Dashboard');
                        break;
                    case 'Project Users':
                        navigate('/ProjectUsers');
                        break;
                    case 'Role Assignment':
                        navigate('/RoleAssignment');
                        break;
                    case 'Tickets':
                        navigate('/Tickets');
                        break;
                    default:
                        break;
                }

            })
        })
    })
    return (
        <section className="sideBar">
            <div className="logo-container">
                <div className="header-logo">
                    <img src="#" alt="#" />
                </div>
            </div>
            <div className="sideBar-links">
                <li className="dashboard">Dashboard</li>
                <li className="project-users">Project Users</li>
                <li className="role-assignment">Role Assignment</li>
                <li className="tickets">Tickets</li>
            </div>
            <div className="settings-container">
                <i className='bx bx-cog settings-icon' ></i>
            </div>
            <div className="user-container">
                <i className='bx bxs-user-rectangle user-icon'></i>
                <div className="user-name">Hello, <br />user-name</div>
            </div>           
        </section>
    )
}

export default SideBar;