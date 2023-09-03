import './header.scss'
import React, { useEffect } from 'react';

function Header() {

    useEffect (() => {
        const searchIcon = document.querySelector('.search-icon');
        const iconContainer = document.querySelector('.icon-container');
        const searchBar = document.querySelector('.search-bar');
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        const gridIcon = document.querySelector('.grid-icon');
        const gridContainer = document.querySelector('.grid-container');
        const listContainer = document.querySelector('.list-container');
        const listIcon = document.querySelector('.list-icon');

        searchIcon.addEventListener('click', () => {
        searchBar.style.display = 'flex';
        iconContainer.style.display = 'none';
        searchInput.focus();
        });

        searchButton.addEventListener('click', () => {
        searchBar.style.display = 'none';
        iconContainer.style.display = 'flex';
        searchInput.value = '';
        });

        gridIcon.addEventListener('click', () => {
            listContainer.style.display = 'flex';
            gridContainer.style.display = 'none';
        })

        listIcon.addEventListener('click', () => {
            gridContainer.style.display = 'flex';
            listContainer.style.display = 'none';
        })

        return () => {
            searchIcon.removeEventListener('click', () => {});
            searchButton.removeEventListener('click', () => {});
            gridIcon.removeEventListener('click', () => {});
            listIcon.removeEventListener('click', () => {});
        }


    }, []);
    

    return (
        <section className="header">
            <div className="header-links">
                <ul>
                    <li className="home">Home</li>
                    <div className="new-container">
                        <button className='new-button'>New +</button>
                    </div>
                    <div className="notification-container">
                        <i className='bx bxs-bell notification-icon' ></i>
                    </div>
                    <div className="view-container">
                        <div className="grid-container">
                            <i className='bx bxs-grid-alt grid-icon' ></i>
                        </div>
                        <div className="list-container">
                            <i className='bx bx-list-ul list-icon' ></i>
                        </div>
                    </div>
                    <div className="search-container">
                        <div className="icon-container">
                            <i className='bx bx-search-alt-2 search-icon'></i>
                        </div>
                        <div className="search-bar">
                            <input className='search-input' type="text" placeholder="Search..." />
                            <button className='search-button'>Search</button>
                        </div>
                    </div>
                </ul>
            </div>
        </section>
    )
}

export default Header;