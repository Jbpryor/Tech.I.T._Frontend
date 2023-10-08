import React, { useState, useRef } from "react";
import './user.scss';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { modifyUser } from "../../../Store/userSlice";
import CountryMenu from "./Country Menu/countryMenu";
import PictureContent from "./Picture Content/pictureContent";

function User() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

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

    const users = useSelector((state) => state.users);
    const { userId } = useParams();

    const user = users.find((user) => {
        if (typeof user.id === 'string') {
          return user.id === userId;
        } else {
          return user.id.toString() === userId;
        }
    });

    const [ editMode, setEditMode ] = useState(false);
    const [ showSaveButton, setShowSaveButton ] = useState(false);
    const [ email, setEmail ] = useState(user.email ? user.email : '');
    const [ street, setStreet ] = useState(user.address && user.address.street ? user.address.street : '');
    const [ city, setCity ] = useState(user.address && user.address.city ? user.address.city : '');
    const [ state, setState ] = useState(user.address && user.address.state ? user.address.state : '');
    const [ zip, setZip ] = useState(user.address && user.address.zip ? user.address.zip : '');
    const [ country, setCountry ] = useState(user.address && user.address.country ? user.address.country : '');

    const handleEdit = () => {
        setEditMode(true);
        setShowSaveButton(true);
      };

    const handleCancel = () => {
        setEmail(user.email),
        setStreet(street),
        setCity(city),
        setState(state),
        setZip(zip),
        setCountry(country),
        setEditMode(false);
        setShowSaveButton(false);
    };

    const saveEditedUser = () => {

        const updatedAddress = {
            street: street,
            city: city,
            state: state,
            zip: zip,
            country: country,
        };
    
        const updatedUser = {
            ...user,
            email: email,
            address: updatedAddress,
        };
    
    
        dispatch(modifyUser(updatedUser));
    
        setShowSaveButton(false);
        setEditMode(false);

        alert('Information Saved!');
    };

    const [, setProfilePicture] = useState(null);

    const handleFileSelected = (file) => {
      setProfilePicture(file);
    };
    

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
                        <PictureContent onFileSelected={handleFileSelected} />
                    </div>

                    <div className="user-info-container">
                        <div className="user-name-container">
                            <div className="user-name-input">
                                <div className="user-name title">Full Name:</div>
                                <div className="user-full-name space">
                                    {user.name.first} {user.name.last}
                                </div>
                            </div>
                            <div className="user-email-input">
                                <div className="user-email title">Email:</div>
                                {editMode ? (
                                    <input className="user-email-title" type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                                ) : (
                                    <div className="user-email space">{email}</div>
                                )}
                            </div>
                        </div>
                        <div className="address-container">
                            <div className="address-input">
                                <div className="address title">Address:</div>
                                {editMode ? (
                                    <input className="user-address" type="text" value={street} onChange={(event) => setStreet(event.target.value)}/>
                                ) : (
                                    <div className="user-address space">{street}</div>
                                )}
                            </div>
                        </div>
                        <div className="city-state-container">
                            <div className="city-content">
                                <div className="city title">City:</div>
                                {editMode ? (
                                    <input className="user-city" type="text" value={city} onChange={(event) => setCity(event.target.value)} />
                                ): (
                                    <div className="user-city space">{city}</div>
                                )}
                            </div>
                            <div className="state-content">
                                <div className="state title">State/Province:</div>
                                {editMode ? (
                                    <input className="user-state" type="text" value={state} onChange={(event) => setState(event.target.value)} />
                                ): (
                                    <div className="user-state space">{state}</div>
                                )}
                            </div>
                        </div>
                        <div className="zip-country-container">
                            <div className="zip-content">
                                <div className="zip title">Zip Code:</div>
                                {editMode ? (
                                    <input className="user-zip" type="text" value={zip} onChange={(event) => setZip(event.target.value)}  />
                                ) : (
                                    <div className="user-zip space">{zip}</div>
                                )}
                            </div>
                            <div className="country-content">
                                <div className="country title">Country:</div>
                                {editMode ? (
                                    <select id="country" name="address.country" value={country} onChange={(event) => setCountry(event.target.value)}><CountryMenu /></select>
                                ) : (
                                    <div className="user-country space">{country}</div>
                                )}
                            </div>
           
                        </div>
                        <div className="edit-info-button-container">
                            {editMode ? (
                                <>
                                    <button className="save-info-button" onClick={saveEditedUser}>Save</button>
                                    <button className="cancel-edit-info-button" onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                    <button className="edit-info-button" onClick={handleEdit}>Edit Information</button>
                            )}
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