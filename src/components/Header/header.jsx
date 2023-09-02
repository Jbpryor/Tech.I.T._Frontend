import './header.scss'
import React, { useEffect } from 'react';

function Header() {

    useEffect (() => {
        const searchIcon = document.querySelector('.search-icon');
        const iconContainer = document.querySelector('.icon-container');
        const searchBar = document.querySelector('.search-bar');
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');

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

        return () => {
            searchIcon.removeEventListener('click', () => {});
            searchButton.removeEventListener('click', () => {});
        }


    }, []);
    

    return (
        <section className="header">
            <div className="header-links">
                <ul>
                    <li className="home">Home</li>
                    <li className="page1">Page1</li>
                    <li className="page2">Page2</li>
                    <li className="page3">Page3</li>
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