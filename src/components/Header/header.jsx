import './header.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleViewMode } from '../../Store/Slices/viewModeSlice';

function Header() {
    const [ isSearchIconVisible, setSearchIconVisible ] = useState(true);
    const [ isGridVisible, setGridVisible ] = useState(true);
    const [ isNewMenuVisible, setIsNewMenuVisible ] = useState(false);
    const dispatch = useDispatch();
    const viewMode = useSelector((state) => state.viewMode);
    const demoUser = useSelector((state) => state.demoUser);
    const theme = useSelector((state) => state.settings.themes[state.settings.theme]);

    const handleSearchIconClick = () => {
        setSearchIconVisible(false);
    }

    const handleSearchButtonClick = () => {
        setSearchIconVisible(true);
    }

    const handleGridIconClick = () => {
        setGridVisible(false);
        dispatch(toggleViewMode());
    }

    const handleListIconClick = () => {
        setGridVisible(true);
        dispatch(toggleViewMode());
    }

    const handleNotificationClick = () => {

    }

    const handleNewMenuVisibility = () => {
        setIsNewMenuVisible(!isNewMenuVisible);
    }

    return (
        <section className="header" style={{background: theme.primary_color, color: theme.font_color}}>
            <div className="header-links">
                <div className="search-container">
                    {isSearchIconVisible ? (
                     <div className="icon-container">
                        <i className='bx bx-search-alt-2 search-icon' onClick={handleSearchIconClick}></i>
                    </div>
                    ) : (   
                    <div className="search-bar">
                        <select name="" id="">
                            <option value="">All</option>
                            <option value="">Users</option>
                            <option value="">Projects</option>
                            <option value="">Issues</option>
                            <option value="">Reports</option>
                        </select>
                        <input className='search-input' type="text" placeholder="Search..." />
                        <button className='search-button' onClick={handleSearchButtonClick}>Search</button>
                    </div>
                    )}
                </div>
                <div className="new-container">
                    <button className='new-button' onClick={handleNewMenuVisibility} onMouseLeave={() => setIsNewMenuVisible(false)}>New +</button>
                    <div className={`new-menu-container ${isNewMenuVisible ? 'active' : ''} ${demoUser}` } onMouseEnter={() => setIsNewMenuVisible(true)} onMouseLeave={() => setIsNewMenuVisible(false)} style={{background: theme.primary_color, borderTop: isNewMenuVisible ? `2px solid ${theme.primary_color}` : 'none'}}>
                        {(demoUser === 'admin' || demoUser === 'manager') && <NavLink className='nav-link' to='/users/newUser' style={{color: theme.font_color}}>New User</NavLink>}
                        {(demoUser === 'admin' || demoUser === 'manager') && <NavLink className='nav-link' to='/projects/newProject' style={{color: theme.font_color}}>New Project</NavLink>}
                        {(demoUser === 'admin' || demoUser === 'manager' || demoUser === 'developer') && <NavLink className='nav-link' to='/issues/newIssue' style={{color: theme.font_color}}>New Issue</NavLink>}
                        <NavLink className='nav-link' to='/reports/newReport' style={{color: theme.font_color}}>New Report</NavLink>
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