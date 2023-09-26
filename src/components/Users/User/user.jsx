import React, { useState } from "react";
import './user.scss';

function User() {

    const [ accountActive, setAccountActive ] = useState(true);
    const [ notificationsActive, setNotificationsActive ] = useState(false);
    const [ passwordActive, setPasswordActive ] = useState(false);

    const handleAccountActive = () => {
        setAccountActive(true);
        setNotificationsActive(false);
        setPasswordActive(false);
    }

    const handleNotificationsActive = () => {
        setAccountActive(false);
        setNotificationsActive(true);
        setPasswordActive(false);
    }

    const handlePasswordActive =() => {
        setAccountActive(false);
        setNotificationsActive(false);
        setPasswordActive(true);
    }


    return (
        <section className="user">
            <div className="user-container">

                <div className="user-buttons-container">
                    <div className="user-buttons-content">
                        <div className="account-settings" onClick={handleAccountActive}>
                            <div className="button-title">Account</div>
                            <div className="button-details">Details about your Personal information</div>
                        </div>
                        <div className="notification-settings" onClick={handleNotificationsActive}>
                            <div className="button-title">Notifications</div>
                            <div className="button-details">Details about your Notifications</div>
                        </div>
                        <div className="password-settings" onClick={handlePasswordActive}>
                            <div className="button-title">Password & Security</div>
                            <div className="button-details">Details about your Password & Security</div>
                        </div>
                    </div>
                </div>

                <div className={`user-account-container ${accountActive ? 'active' : ''}`}>

                    <div className="user-img-container">
                        <img src="" alt="" />
                        <div className="user-name-content">
                            <div className="user-name">User Name</div>
                            <div className="user-role">User Role</div>
                        </div>
                        <div className="user-img-update-button">
                            <button className="update">Update</button>
                        </div>
                    </div>

                    <div className="user-info-container">
                        <div className="user-name-container">
                            <div className="user-name-input">
                                <div className="user-name-title">Full Name*</div>
                                <input type="text" />
                            </div>
                            <div className="user-email-input">
                                <div className="user-email-title">Email*</div>
                                <input type="email" />
                            </div>
                        </div>
                        <div className="address-container">
                            <div className="address-input">
                                <div className="address-title">Address*</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="city-state-container">
                            <div className="city-content">
                                <div className="city-title">City</div>
                                <input type="text" />
                            </div>
                            <div className="state-content">
                                <div className="state-title">State/Province</div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="zip-country-container">
                            <div className="zip-content">
                                <div className="zip-title">Zip Code</div>
                                <input type="text" />
                            </div>
                            <div className="country-content">
                                <div className="country-title">Country</div>
                                <select name="" id="">
                                    <option value="">USA</option>
                                </select>
                            </div>
           
                        </div>
                        <div className="edit-info-button-container">
                            <button className="edit-info-button">Edit Information</button>
                        </div>
                    </div>
                </div>

                <div className={`user-notifications-container ${notificationsActive ? 'active' : ''}`}>
                    <div className="notifications-content">
                        <div className="notifications-global">
                            <div className="notification-content">
                                <div className="notification-title">All Notifications</div>
                                <div className="notification-button-container">
                                    <button className="enable">Enable</button>
                                    <button className="disable">Disable</button>
                                </div>
                            </div>
                            <div className="notification-content">
                                <div className="notification-title">Notification bell icon</div>
                                <div className="notification-button-container">
                                    <button className="enable">Enable</button>
                                    <button className="disable">Disable</button>
                                </div>
                            </div>
                        </div>
                        <div className="notifications-local">
                            <div className="notification-header">Notify me when:</div>
                            <div className="notifications">
                                <div className="notification-content">
                                    <div className="notification-title">new project added</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">new issue added</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">new user added</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">new report added</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue closed</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue status change</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue is commented</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue attachment is added</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">user role change</div>
                                    <div className="notification-button-container">
                                        <button className="enable">Enable</button>
                                        <button className="disable">Disable</button>
                                    </div>
                                </div>

                                <div className="notification-save-button-container">
                                    <button className="notifications-save-button">Save Changes</button>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`user-password-container ${passwordActive ? 'active' : ''}`}>

                    <div className="title-container">
                        <div className="title-content">
                            <div className="title">Change Password</div>
                            <div className="password-details">Update your password regularly and make sure it is unique from other passwords you use.</div>
                        </div>
                        <div className="password-icon">
                            <i className='bx bxs-lock'></i>
                        </div>
                    </div>

                    <div className="password-content">
                        <div className="current-password">
                            <div className="title">Current Password*</div>
                            <input type="password" />
                        </div>
                        <div className="new-password">
                            <div className="title">New Password*</div>
                            <input type="password" />
                        </div>
                        <div className="re-enter-password">
                            <div className="title">Re-enter New Password*</div>
                            <input type="password" />
                        </div>
                    </div>

                    <div className="new-password-button-container">
                        <button className="new-password-submit-button">Submit</button>
                    </div>

                </div>

            </div>
        </section>
    )


}

export default User;