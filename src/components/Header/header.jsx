import './header.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    const [isSearchIconVisible, setSearchIconVisible] = useState(true);
    const [isGridVisible, setGridVisible] = useState(true);

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
                    <NavLink to='/NewTicket'>
                        <button className='new-button'>New +</button>
                    </NavLink>
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