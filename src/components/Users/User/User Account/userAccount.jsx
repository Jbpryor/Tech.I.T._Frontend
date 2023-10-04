import React from "react";
import PictureContent from "../Picture Content/pictureContent";
import CountryMenu from "../Country Menu/countryMenu";

function UserAccount() {
    return (
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
    )
}

export default UserAccount;