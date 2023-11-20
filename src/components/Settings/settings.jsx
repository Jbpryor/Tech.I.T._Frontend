import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from "../../Store/Slices/settingsSlice";
import './settings.scss';
import { capitalizeFirstLetter } from "../../utils";


function Settings() {

    const currentTheme = useSelector((state) => state.settings.theme);
    const theme = useSelector((state) => state.settings.themes[state.settings.theme]);


    const dispatch = useDispatch();

    const [ darkModeActive, setDarkModeActive ] = useState(false);
    const [ lightModeActive, setLightModeActive ] = useState(true);
  
    const toggleDarkMode = () => {
        setDarkModeActive(true);
        setLightModeActive(false);
        dispatch(setTheme('dark-mode'));
    };
  
    const toggleLightMode = () => {
        setLightModeActive(true);
        setDarkModeActive(false);
        dispatch(setTheme('light-mode'));
    };

    return (
        <section className="settings" style={{ background: theme.background_color, color: theme.font_color }}>
            <div className="settings-title">Settings</div>
            
            <div className="settings-container">            

                <div className="theme-settings">                    
                    <div className="theme-settings-title">Current Theme: {capitalizeFirstLetter(currentTheme)}</div>
                    <div className="theme-buttons-container">
                        <button className={`light-mode-button ${lightModeActive ? 'active' : ''}`} onClick={toggleLightMode}>Light Mode</button>
                        <button className={`dark-mode-button ${darkModeActive ? 'active' : ''}`} onClick={toggleDarkMode}>Dark Mode</button>
                    </div>
                </div>


            </div>
     
        </section>
    )
}

export default Settings;