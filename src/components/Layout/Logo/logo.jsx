import React from "react";
import { useSelector } from "react-redux";
import './logo.scss';
import { selectTheme } from "../../Users/User/Settings/settingsSlice";
import { selectDemoUser } from "../../Auth/Demo Login/demoUserSlice";

function Logo() {

    const demoUser = useSelector(selectDemoUser);
    const theme = useSelector(selectTheme);

    const getLogoColor = () => {
        if (demoUser === 'admin') {
            return 'rgb(1, 182, 1)';
        } else if (demoUser === 'manager') {
            return 'rgb(255, 165, 0)';
        } else if (demoUser === 'developer') {
            return 'rgb(232, 232, 15)';
        } else if (demoUser === 'submitter') {
            return 'rgb(224, 1, 1)';
        }
        return 'white';
    }

    return (
        <section className="logo" style={{background: theme.primary_color}}>
            <div className="logo-container">
                <div className="header-logo">
                    <div className="user-initial-first" style={{color: theme.font_color}}>D</div>
                    <div className="user-initial-last" style={{ color: getLogoColor() }}>U</div>
                </div>
            </div>
        </section>
    )
}

export default Logo;