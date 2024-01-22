import React, { useState, useEffect } from "react";
import { updateUser, fetchUsers } from "../../userSlice";
import { useDispatch } from "react-redux";

function UserPassword({ theme, passwordActive, user }) {
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  useEffect(() => {
    setValidPassword(
      PWD_REGEX.test(confirmedPassword) && confirmedPassword === newPassword
    );
  }, [confirmedPassword, newPassword]);

  let canSave;
  if (confirmedPassword) {
    canSave = [currentPassword.length, validPassword].every(Boolean);
  }

  const onCurrentPasswordChanged = (event) =>
    setCurrentPassword(event.target.value);
  const onNewPasswordChanged = (event) => setNewPassword(event.target.value);
  const onConfirmedPasswordChanged = (event) =>
    setConfirmedPassword(event.target.value);

  const handleSaveNewPassword = async () => {
    try {
      setRequestStatus("pending");

      const passwordData = {
        _id: user._id,
        passwordData: {
            currentPassword: currentPassword,
            newPassword: confirmedPassword,
        }       
      };

      const response = await dispatch(updateUser(passwordData));

      if (updateUser.fulfilled.match(response)) {
        console.log(response);
        const { message } = response.payload;

        alert(message);

        setConfirmedPassword("");
        setNewPassword("");
        setCurrentPassword("");
      } else {
        alert("User update failed: " + response.error.message);
      }
    } catch (error) {
      console.error("Failed to save new password", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <div
      className={`user-password-container ${passwordActive ? "active" : ""}`}
    >
      <div
        className="user-password-content"
        style={{
          background: theme.primary_color,
          color: theme.font_color,
          border: `2px solid ${theme.border}`,
        }}
      >
        <div className="title-container">
          <div className="title-content">
            <h1 className="password">Change Password</h1>
            <p className="password-details">
              Update your password regularly and make sure it is unique from
              other passwords you use.
            </p>
          </div>
          <div className="password-icon">
            <i className="bx bxs-lock"></i>
          </div>
        </div>

        <div className="password-content">
          <div className="current-password">
            <label className="password current" htmlFor="currentPassword">
              Current Password*
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={onCurrentPasswordChanged}
              style={{
                background: theme.background_color,
                color: theme.font_color,
              }}
            />
          </div>
          <div className="new-password">
            <label className="password new" htmlFor="password">
              New Password*{" "}
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              placeholder="4-12 chars incl. !@#$%"
              onChange={onNewPasswordChanged}
              style={{
                background: theme.background_color,
                color: theme.font_color,
              }}
            />
          </div>

          <div className="re-enter-password">
            <label className="password re_enter" htmlFor="password">
              Re-Enter New Password*{" "}
            </label>
            <input
              type="password"
              id="confirmedPassword"
              name="confirmedPassword"
              value={confirmedPassword}
              placeholder="4-12 chars incl. !@#$%"
              onChange={onConfirmedPasswordChanged}
              style={{
                background: theme.background_color,
                color: theme.font_color,
              }}
            />
          </div>
        </div>

        <div className="new-password-button-container">
          <button
            className="new-password-submit-button"
            onClick={handleSaveNewPassword}
            disabled={!canSave}
            style={{
              background: theme.background_color,
              color: theme.font_color,
              border: `1px solid ${theme.border}`,
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPassword;
