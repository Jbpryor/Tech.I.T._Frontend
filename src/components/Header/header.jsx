import "./header.scss";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewMode } from "../../Store/Slices/viewModeSlice";
import useWindowSize from "../../Hooks/useWindowSize";
import SearchBar from "./Search Bar/searchBar";
import { setViewMode } from "../../Store/Slices/viewModeSlice";
import { markNotificationsAsRead } from "../../Store/Slices/notificationsSlice";

function Header() {
  const [isSearchIconVisible, setSearchIconVisible] = useState(true);
  const [isGridVisible, setGridVisible] = useState(true);
  const [isNewMenuVisible, setIsNewMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.viewMode);
  const demoUser = useSelector((state) => state.demoUser);
  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );
  const newNotificationsCount = useSelector(
    (state) => state.notifications.newNotificationsCount
  );

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
                >
                  New +
                </button>

                <div
                  className={`menu-overlay ${isNewMenuVisible ? "active" : ""}`}
                >
                  <div
                    className={`new-menu-container ${
                      isNewMenuVisible ? "active" : ""
                    } ${demoUser}`}
                    onMouseEnter={() => setIsNewMenuVisible(true)}
                    onMouseLeave={() => setIsNewMenuVisible(false)}
                    style={{
                      background: theme.background_color,
                      border: `1px solid ${theme.border}`,
                      color: theme.font_color,
                    }}
                  >
                    {(demoUser === "admin" || demoUser === "manager") && (
                      <NavLink
                        className="nav-link"
                        onClick={() => setIsNewMenuVisible(false)}
                        to="/users/newUser"
                        style={{ color: theme.font_color }}
                      >
                        New User
                      </NavLink>
                    )}
                    {(demoUser === "admin" || demoUser === "manager") && (
                      <NavLink
                        className="nav-link"
                        onClick={() => setIsNewMenuVisible(false)}
                        to="/projects/newProject"
                        style={{ color: theme.font_color }}
                      >
                        New Project
                      </NavLink>
                    )}
                    {(demoUser === "admin" ||
                      demoUser === "manager" ||
                      demoUser === "developer") && (
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
                } ${demoUser}`}
                onMouseEnter={() => setIsNewMenuVisible(true)}
                onMouseLeave={() => setIsNewMenuVisible(false)}
                style={{
                  background: theme.primary_color,
                  borderTop: isNewMenuVisible
                    ? `2px solid ${theme.primary_color}`
                    : "none",
                }}
              >
                {(demoUser === "admin" || demoUser === "manager") && (
                  <NavLink
                    className="nav-link"
                    to="/users/newUser"
                    style={{ color: theme.font_color }}
                  >
                    New User
                  </NavLink>
                )}
                {(demoUser === "admin" || demoUser === "manager") && (
                  <NavLink
                    className="nav-link"
                    to="/projects/newProject"
                    style={{ color: theme.font_color }}
                  >
                    New Project
                  </NavLink>
                )}
                {(demoUser === "admin" ||
                  demoUser === "manager" ||
                  demoUser === "developer") && (
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
