import "./header.scss";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../Hooks/useWindowSize";
import SearchBar from "./Search Bar/searchBar";
import { markNotificationsAsRead } from "../../Notifications/notificationsSlice";
import { selectViewMode, setViewMode, toggleViewMode } from "../viewModeSlice";
import { selectDemoUser } from "../../Auth/Demo Login/demoUserSlice";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";
import { selectNewNotificationsCount } from "../../Notifications/notificationsSlice";
import { selectUserById } from "../../Users/userSlice";
import useAuth from "../../../Hooks/useAuth";

function Header() {
  const [isSearchIconVisible, setSearchIconVisible] = useState(true);
  const [isGridVisible, setGridVisible] = useState(true);
  const [isNewMenuVisible, setIsNewMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newMenuRef = useRef(null)
  const theme = useSelector(selectTheme);
  const { role, userId } = useAuth();

  const user = useSelector((state) => selectUserById(state, userId));

  const notifications = user?.notifications

  let newNotificationsCount;

  if (!notifications) {
    newNotificationsCount = 0;
  } else {
    newNotificationsCount = notifications.filter(notification => notification.isNewNotification).length
  }


  const handleGridIconClick = () => {
    setGridVisible(false);
    dispatch(toggleViewMode());
  };

  const handleListIconClick = () => {
    setGridVisible(true);
    dispatch(toggleViewMode());
  };

  const handleNotificationClick = () => {
    dispatch(markNotificationsAsRead());
    navigate("/notifications");
  };

  const handleNewMenuVisibility = () => {
    setIsNewMenuVisible(!isNewMenuVisible);
  };

  const handleClickOutside = (event) => {
    if (newMenuRef.current && !newMenuRef.current.contains(event.target)) {
      setIsNewMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const { width } = useWindowSize();
  const smallerScreen = width < 500;

  useEffect(() => {
    if (width < 1000) {
      dispatch(setViewMode("tile"));
    }
  }, [dispatch, width]);

  return (
    <section
      className="header"
      style={{
        background: theme.primary_color,
        color: theme.font_color,
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div className="header-links">
        <SearchBar
          isSearchIconVisible={isSearchIconVisible}
          setSearchIconVisible={setSearchIconVisible}
          theme={theme}
          smallerScreen={smallerScreen}
        />

        {smallerScreen ? (
          isSearchIconVisible ? (
            <>
              <div className="new-container">
                <button
                  className="new-button"
                  onClick={handleNewMenuVisibility}
                  onMouseLeave={() => setIsNewMenuVisible(false)}
                  ref={newMenuRef}
                >
                  New +
                </button>

                <div
                  className={`menu-overlay ${isNewMenuVisible ? "active" : ""}`}
                >
                  <div
                    className={`new-menu-container ${
                      isNewMenuVisible ? "active" : ""
                    } ${role}`}
                    onMouseEnter={() => setIsNewMenuVisible(true)}
                    onMouseLeave={() => setIsNewMenuVisible(false)}
                    style={{
                      background: theme.background_color,
                      border: isNewMenuVisible ? `1px solid ${theme.border}` : "",
                      color: theme.font_color,
                    }}
                  >
                    {(role === "Admin" || role === "Project Manager") && (
                      <NavLink
                        className="nav-link"
                        onClick={() => setIsNewMenuVisible(false)}
                        to="/users/newUser"
                        style={{ color: theme.font_color }}
                      >
                        New User
                      </NavLink>
                    )}
                    {(role === "Admin" || role === "Project Manager") && (
                      <NavLink
                        className="nav-link"
                        onClick={() => setIsNewMenuVisible(false)}
                        to="/projects/newProject"
                        style={{ color: theme.font_color }}
                      >
                        New Project
                      </NavLink>
                    )}
                    {(role === "Admin" ||
                      role === "Project Manager" ||
                      role === "Developer") && (
                      <NavLink
                        className="nav-link"
                        onClick={() => setIsNewMenuVisible(false)}
                        to="/issues/newIssue"
                        style={{ color: theme.font_color }}
                      >
                        New Issue
                      </NavLink>
                    )}
                    <NavLink
                      className="nav-link"
                      onClick={() => setIsNewMenuVisible(false)}
                      to="/reports/newReport"
                      style={{ color: theme.font_color }}
                    >
                      New Report
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="notification-container">
                <i
                  className={`bx bxs-bell notification-icon ${
                    newNotificationsCount !== 0 ? "active" : ""
                  }`}
                  onClick={handleNotificationClick}
                ></i>
                <div
                  className={`notification-count ${
                    newNotificationsCount !== 0 ? "active" : ""
                  }`}
                  style={{
                    color: theme.font_color,
                    border: `1px solid ${theme.border}`,
                    background: theme.primary_color,
                  }}
                >
                  {newNotificationsCount}
                </div>
              </div>
              <div className="view-container">
                {isGridVisible ? (
                  <div className="grid-container">
                    <i
                      className="bx bxs-grid-alt grid-icon"
                      onClick={handleGridIconClick}
                    ></i>
                  </div>
                ) : (
                  <div className="list-container">
                    <i
                      className="bx bx-list-ul list-icon"
                      onClick={handleListIconClick}
                    ></i>
                  </div>
                )}
              </div>
            </>
          ) : null
        ) : (
          <>
            <div className="new-container">
              <button
                className="new-button"
                onClick={handleNewMenuVisibility}
                onMouseLeave={() => setIsNewMenuVisible(false)}
              >
                New +
              </button>
              <div
                className={`new-menu-container ${
                  isNewMenuVisible ? "active" : ""
                } ${role}`}
                onMouseEnter={() => setIsNewMenuVisible(true)}
                onMouseLeave={() => setIsNewMenuVisible(false)}
                style={{
                  background: theme.primary_color,
                  borderTop: isNewMenuVisible
                    ? `2px solid ${theme.primary_color}`
                    : "none",
                }}
              >
                {(role === "Admin" || role === "Project Manager") && (
                  <NavLink
                    className="nav-link"
                    to="/users/newUser"
                    style={{ color: theme.font_color }}
                  >
                    New User
                  </NavLink>
                )}
                {(role === "Admin" || role === "Project Manager") && (
                  <NavLink
                    className="nav-link"
                    to="/projects/newProject"
                    style={{ color: theme.font_color }}
                  >
                    New Project
                  </NavLink>
                )}
                {(role === "Admin" ||
                  role === "Project Manager" ||
                  role === "Developer") && (
                  <NavLink
                    className="nav-link"
                    to="/issues/newIssue"
                    style={{ color: theme.font_color }}
                  >
                    New Issue
                  </NavLink>
                )}
                <NavLink
                  className="nav-link"
                  to="/reports/newReport"
                  style={{ color: theme.font_color }}
                >
                  New Report
                </NavLink>
              </div>
            </div>
            <div className="notification-container">
              <i
                className={`bx bxs-bell notification-icon ${
                  newNotificationsCount !== 0 ? "active" : ""
                }`}
                onClick={handleNotificationClick}
              ></i>
              <div
                className={`notification-count ${
                  newNotificationsCount !== 0 ? "active" : ""
                }`}
                style={{
                  color: theme.font_color,
                  border: `1px solid ${theme.border}`,
                  background: theme.primary_color,
                }}
              >
                {newNotificationsCount}
              </div>
            </div>
            <div className="view-container">
              {isGridVisible ? (
                <div className="grid-container">
                  <i
                    className="bx bxs-grid-alt grid-icon"
                    onClick={handleGridIconClick}
                  ></i>
                </div>
              ) : (
                <div className="list-container">
                  <i
                    className="bx bx-list-ul list-icon"
                    onClick={handleListIconClick}
                  ></i>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Header;
