import React, { useState, useEffect } from "react";
import "./newUser.scss";
import { useNavigate } from "react-router-dom";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { addNewUser, fetchUsers } from "../../userSlice";
import { addNotification } from "../../../Notifications/notificationsSlice";
import { selectTheme } from "../Settings/settingsSlice";

function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);

  const date = new Date().toISOString();

  const [user, setUser] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    role: "",
  });

  const roles = ["Admin", "Project Manager", "Developer", "Submitter"];

  const [requestStatus, setRequestStatus] = useState('idle')

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    name === "email" || name === "role"
      ? setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }))
      : setUser((prevUser) => ({
          ...prevUser,
          name: {
            ...prevUser.name,
            [name]: value,
          },
        }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setRequestStatus('pending')
      const response = await dispatch(addNewUser(user));

      if (addNewUser.fulfilled.match(response)) {
        const {
          userName,
          userId,
          temporaryPassword,
          message,
        } = response.payload;

        await dispatch(fetchUsers());

        dispatch(
          addNotification({
            message: message,
            title: userName,
            notificationLink: `/users/${userId}`,
            date: date,
          })
        );

        alert(message);

        navigate(`/users/${userId}`);

        setUser({
          name: {
            first: "",
            last: "",
          },
          email: "",
          role: "",
        });
      } else {
        alert("User creation failed: " + response.error.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred: " + error.message);
    } finally {
      setRequestStatus('idle')
    }
  };

  return (
    <section className="new-user" style={{ color: theme.font_color }}>
      <div
        className="new-user-container"
        style={{
          border: `2px solid ${theme.border}`,
          background: theme.primary_color,
          color: theme.font_theme,
        }}
      >
        <div className="new-user-title">New User</div>

        <form className="new-user-form" onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              className="user-name-first"
              type="text"
              name="first"
              value={user.name.first}
              onChange={handleInputChange}
              placeholder="Enter first name"
              style={{
                background: theme.background_color,
                border: `0.5px solid ${theme.border}`,
                color: theme.font_color,
              }}
            />
          </label>
          <label>
            Last Name:
            <input
              className="user-name-last"
              type="text"
              name="last"
              value={user.name.last}
              onChange={handleInputChange}
              placeholder="Enter last name"
              style={{
                background: theme.background_color,
                border: `0.5px solid ${theme.border}`,
                color: theme.font_color,
              }}
            />
          </label>
          <label>
            Email:
            <input
              className="user-email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              style={{
                background: theme.background_color,
                border: `0.5px solid ${theme.border}`,
                color: theme.font_color,
              }}
            />
          </label>
          <label>
            Role:
            <select
              name="role"
              id=""
              value={user.role}
              className="user-role"
              onChange={handleInputChange}
              style={{
                background: theme.background_color,
                color: theme.font_color,
                border: `0.5px solid ${theme.border}`,
              }}
            >
              <option
                value=""
                style={{
                  background: theme.primary_theme,
                  color: theme.font_color,
                  border: `1px solid ${theme.border}`,
                }}
              >
                Select a role...
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <div className="new-user-button-container">
            <button
              className="new-user-button"
              type="submit"
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.background_color,
                color: theme.font_color,
              }}
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewUser;
