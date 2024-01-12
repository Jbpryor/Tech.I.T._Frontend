import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryMenu from "../../Country Menu/countryMenu";
import { updateUser, getUsersStatus, getUsersError } from "../../../userSlice";

function UserInfo({ user, theme }) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(user?.email ? user.email : "");
  const [street, setStreet] = useState(
    user?.address && user.address.street ? user.address.street : ""
  );
  const [city, setCity] = useState(
    user?.address && user.address.city ? user.address.city : ""
  );
  const [state, setState] = useState(
    user?.address && user.address.state ? user.address.state : ""
  );
  const [zip, setZip] = useState(
    user?.address && user.address.zip ? user.address.zip : ""
  );
  const [country, setCountry] = useState(
    user?.address && user.address.country ? user.address.country : ""
  );
  const [requestStatus, setRequestStatus] = useState("idle");
  const usersStatus = useSelector(getUsersStatus)
  const error = useSelector(getUsersError)

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEmail(user.email || "");
    setStreet(user.address?.street || ""),
    setCity(user.address?.city || ""),
    setState(user.address?.state || ""),
    setZip(user.address?.zip || ""),
    setCountry(user.address?.country || ""),
    setEditMode(false);
  };

  const saveEditedUser = async () => {
    try {
      setRequestStatus("pending");

      const updatedAddress = {
        street: street,
        city: city,
        state: state,
        zip: zip,
        country: country,
      };

      const updatedUser = {
        id: user._id,
        email: email,
        address: updatedAddress,
      };

      const response = await dispatch(updateUser(updatedUser));

      if (updateUser.fulfilled.match(response)) {
        const { userName, message } = response.payload;

        setEditMode(false);
        alert(message);
      } else {
        alert("User update failed: " + response.error.message);
      }
    } catch (error) {
      console.error("Failed to save the edited user", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  return (
    <div
      className="user-info-container"
      style={{
        background: theme.primary_color,
        border: `2px solid ${theme.border}`,
      }}
    >
      <div className="user-full-name-container">
        <div className="user-full-name-content">
          <div className="user-full-name-title title">Full Name:</div>
          <div className="user-full-name space">
            {user?.name.first} {user?.name.last}
          </div>
        </div>
        <div className="user-email-content">
          <div className="user-email-title title">Email:</div>
          {editMode ? (
            <input
              className="user-email input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            />
          ) : (
            <div className="user-email space">{email}</div>
          )}
        </div>
      </div>
      <div className="address-container">
        <div className="address-content">
          <div className="address-title title">Address:</div>
          {editMode ? (
            <input
              className="user-address input"
              type="text"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            />
          ) : (
            <div className="user-address space">{street}</div>
          )}
        </div>
      </div>
      <div className="city-state-container">
        <div className="city-content">
          <div className="city-title title">City:</div>
          {editMode ? (
            <input
              className="user-city input"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            />
          ) : (
            <div className="user-city space">{city}</div>
          )}
        </div>
        <div className="state-content">
          <div className="state-title title">State/Province:</div>
          {editMode ? (
            <input
              className="user-state input"
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            />
          ) : (
            <div className="user-state space">{state}</div>
          )}
        </div>
      </div>
      <div className="zip-country-container">
        <div className="zip-content">
          <div className="zip-title title">Zip Code:</div>
          {editMode ? (
            <input
              className="user-zip input"
              type="text"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            />
          ) : (
            <div className="user-zip space">{zip}</div>
          )}
        </div>
        <div className="country-content">
          <div className="country-title title">Country:</div>
          {editMode ? (
            <select
              className="use-country input"
              id="country"
              name="address.country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              style={{
                background: theme.background_color,
                border: `1px solid ${theme.border}`,
                color: theme.font_color,
              }}
            >
              <CountryMenu />
            </select>
          ) : (
            <div className="user-country space">{country}</div>
          )}
        </div>
      </div>
      <div className="edit-info-button-container">
        {editMode ? (
          <>
            <button
              className="save-info-button"
              onClick={saveEditedUser}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            >
              Save
            </button>
            <button
              className="cancel-edit-info-button"
              onClick={handleCancel}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `1px solid ${theme.border}`,
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="edit-info-button"
            onClick={handleEdit}
            style={{
              background: theme.background_color,
              color: theme.font_color,
              border: `1px solid ${theme.border}`,
            }}
          >
            Edit Information
          </button>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
