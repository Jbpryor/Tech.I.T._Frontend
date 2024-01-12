import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../userSlice";
import useWindowSize from "../../../../Hooks/useWindowSize";
import { selectDemoUser } from "../../../Auth/Demo Login/demoUserSlice";

function UserButtons({
  user,
  setGeneralActive,
  setAccountActive,
  setNotificationsActive,
  setPasswordActive,
  viewUserButtons,
  setViewUserButtons,
  theme,
}) {
  const demoUser = useSelector(selectDemoUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { width } = useWindowSize();

  const [requestStatus, setRequestStatus] = useState("idle");

  const handleGeneralActive = () => {
    setGeneralActive(true);
    setAccountActive(false);
    setNotificationsActive(false);
    setPasswordActive(false);

    if (width < 1200) {
      setViewUserButtons(false);
    }
  };

  const handleAccountActive = () => {
    setGeneralActive(false);
    setAccountActive(true);
    setNotificationsActive(false);
    setPasswordActive(false);

    if (width < 1200) {
      setViewUserButtons(false);
    }
  };

  const handleNotificationsActive = () => {
    setGeneralActive(false);
    setAccountActive(false);
    setNotificationsActive(true);
    setPasswordActive(false);

    if (width < 1200) {
      setViewUserButtons(false);
    }
  };

  const handlePasswordActive = () => {
    setGeneralActive(false);
    setAccountActive(false);
    setNotificationsActive(false);
    setPasswordActive(true);

    if (width < 1200) {
      setViewUserButtons(false);
    }
  };
  

  const handleRemoveUser = async () => {
    // this needs a nav to enter password to delete
    const userName = `${user.name.first} ${user.name.last}`
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
        try {
            setRequestStatus("pending");

            const userId = {
                id: user._id
            }

            const response = await dispatch(deleteUser(userId))
      
            if (deleteUser.fulfilled.match(response)) {
              const { message } = response.payload;
      
              alert(message);
      
              navigate("/users");
            } else {
              console.log("Error deleting user:", response.payload)
            }
          } catch (error) {
            console.error("Failed to delete the user", error);
          } finally {
            setRequestStatus("idle");
          }
    }
  };

  return (
    <div
      className={`user-buttons-container ${viewUserButtons ? "active" : ""}`}
    >
      <div className="user-buttons-content">
        <div
          className="general-settings"
          onClick={handleGeneralActive}
          style={{
            background: theme.primary_color,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div className="button-title">General</div>
        </div>
        <div
          className="account-settings"
          onClick={handleAccountActive}
          style={{
            background: theme.primary_color,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div className="button-title">Account</div>
        </div>
        <div
          className="notification-settings"
          onClick={handleNotificationsActive}
          style={{
            background: theme.primary_color,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div className="button-title">Notifications</div>
        </div>
        <div
          className="password-settings"
          onClick={handlePasswordActive}
          style={{
            background: theme.primary_color,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div className="button-title">Password & Security</div>
        </div>
        {demoUser === "admin" && (
          <div
            className="remove-user"
            onClick={handleRemoveUser}
            style={{
              background: theme.primary_color,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="button-title">Delete Account</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserButtons;
