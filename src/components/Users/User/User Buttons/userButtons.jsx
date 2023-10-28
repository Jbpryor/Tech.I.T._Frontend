import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../../Store/Slices/userSlice";


function UserButtons({ user, setAccountActive, setNotificationsActive, setPasswordActive, viewUserButtons, setViewUserButtons, theme }) {

    const demoUser = useSelector((state) => state.demoUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAccountActive = () => {
        setAccountActive(true);
        setNotificationsActive(false);
        setPasswordActive(false);

        if (window.innerWidth < 1200) {
            setViewUserButtons(false)
        }
    };

    const handleNotificationsActive = () => {
        setAccountActive(false);
        setNotificationsActive(true);
        setPasswordActive(false);

        if (window.innerWidth < 1200) {
            setViewUserButtons(false)
        }
    };

    const handlePasswordActive =() => {
        setAccountActive(false);
        setNotificationsActive(false);
        setPasswordActive(true);

        if (window.innerWidth < 1200) {
            setViewUserButtons(false)
        }
    };

    const handleRemoveUser = () => {
        // this needs a nav to enter password to delete
        dispatch(removeUser(user.id));
        alert('User Deleted');
        navigate('/users');
    };

    const handleResize = () => {
        if (window.innerWidth < 1200) {
            setAccountActive(false);
            setNotificationsActive(false);
            setPasswordActive(false);
        } else {
            setAccountActive(true);
            setNotificationsActive(false);
            setPasswordActive(false);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div className={`user-buttons-container ${viewUserButtons ? 'active' : ''}`}>
            <div className="user-buttons-content">
                <div className="account-settings" onClick={handleAccountActive} style={{ background: theme.primary_color, border: `1px solid ${theme.border}` }} >
                    <div className="button-title">Account</div>
                    <div className="button-details">Details about your Personal information</div>
                </div>
                <div className="notification-settings" onClick={handleNotificationsActive} style={{ background: theme.primary_color, border: `1px solid ${theme.border}` }} >
                    <div className="button-title">Notifications</div>
                    <div className="button-details">Details about your Notifications</div>
                </div>
                <div className="password-settings" onClick={handlePasswordActive} style={{ background: theme.primary_color, border: `1px solid ${theme.border}` }} >
                    <div className="button-title">Password & Security</div>
                    <div className="button-details">Details about your Password & Security</div>
                </div>
                {(demoUser === 'admin') && <div className="remove-user" onClick={handleRemoveUser} style={{ background: theme.primary_color, border: `1px solid ${theme.border}` }} >
                    <div className="button-title">Delete Account</div>
                    <div className="button-details">This will remove this user</div>
                </div>}
            </div>
        </div>
    )
};

export default UserButtons;