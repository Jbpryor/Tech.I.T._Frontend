import './header.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    const [isSearchIconVisible, setSearchIconVisible] = useState(true);
    const [isGridVisible, setGridVisible] = useState(true);
    const [ isNewMenuVisible, setIsNewMenuVisible ] = useState(false);

    const handleSearchIconClick = () => {
        setSearchIconVisible(false);
    }

    const handleSearchButtonClick = () => {
        setSearchIconVisible(true);
    }

    const handleGridIconClick = () => {
        setGridVisible(false);
    }

    const handleListIconClick = () => {
        setGridVisible(true);
    }

    const handleNotificationClick = () => {

    }

    const handleNewMenuVisibility = () => {
        setIsNewMenuVisible(!isNewMenuVisible);
    }

    return (
        <section className="header">
            <div className="header-links">
                <div className="search-container">
                    {isSearchIconVisible ? (
                     <div className="icon-container">
                        <i className='bx bx-search-alt-2 search-icon' onClick={handleSearchIconClick}></i>
                    </div>
                    ) : (   
                    <div className="search-bar">
                        <input className='search-input' type="text" placeholder="Search..." />
                        <button className='search-button' onClick={handleSearchButtonClick}>Search</button>
                    </div>
                    )}
                </div>
                <div className="new-container">
                    <button className='new-button' onClick={handleNewMenuVisibility} onMouseLeave={() => setIsNewMenuVisible(false)}>New +</button>
                    <div className={`new-menu-container ${isNewMenuVisible ? 'active' : ''}`} onMouseEnter={() => setIsNewMenuVisible(true)} onMouseLeave={() => setIsNewMenuVisible(false)}>
                        <NavLink className='nav-link' to='/users/newUser'>New User</NavLink>
                        <NavLink className='nav-link' to='/projects/newProject'>New Project</NavLink>
                        <NavLink className='nav-link' to='/issues/newIssue'>New Issue</NavLink>
                        <NavLink className='nav-link' to='/reports/newReport'>New Report</NavLink>
                    </div>
                </div>
                <div className="notification-container">
                    <i className='bx bxs-bell notification-icon' onClick={handleNotificationClick}></i>
                </div>
                <div className="view-container">{isGridVisible ? (
                    <div className='grid-container'>
                        <i className='bx bxs-grid-alt grid-icon' onClick={handleGridIconClick}></i>
                    </div>
                    ) : (
                    <div className='list-container'>
                        <i className='bx bx-list-ul list-icon' onClick={handleListIconClick}></i>
                    </div>
                    )}

 
                </div>
            </div>
        </section>
    )
}

export default Header;