import React, { useState } from "react";
import "./newUser.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../../Store/Slices/userSlice";

function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );

  const [user, setUser] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    role: "",
  });

  const roles = ["Admin", "Project Manager", "Developer", "Submitter"];

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

  function generateUserId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const userId = `user-${timestamp}-${randomNumber}`;
    return userId;
  }

  function generateTemporaryPassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let temporaryPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      temporaryPassword += charset.charAt(randomIndex);
    }

    return temporaryPassword;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      ...user,
      id: generateUserId(),
      password: generateTemporaryPassword(8),
    };

    dispatch(addUser(newUser));

    alert("New user was created!");

    navigate(`/users/${newUser.id}`);

    setUser({
      name: {
        first: "",
        last: "",
      },
      email: "",
      role: "",
    });
  };

  return (
    <section className="new-user" style={{ color: theme.font_color }} >
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
                color: theme.font_color
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
                color: theme.font_color
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
                color: theme.font_color
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
            <button className="add-new-user" type="submit" style={{ border: `1px solid ${theme.border}`, background: theme.background_color, color: theme.font_color }} >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewUser;
