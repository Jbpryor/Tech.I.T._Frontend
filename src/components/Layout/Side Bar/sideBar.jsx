import "./sideBar.scss";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";
import useAuth from "../../../Hooks/useAuth";
import { sendLogout } from "../../Auth/authApiSlice";
import { logOut } from "../../Auth/authSlice";

function SideBar() {
  const { userName, role, userId } = useAuth();

  const theme = useSelector(selectTheme);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutMenuRef = useRef(null);

  const getIconColor = () => {
    if (role === "Admin") {
      return "rgb(1, 182, 1)";
    } else if (role === "Project Manager") {
      return "rgb(255, 165, 0)";
    } else if (role === "Developer") {
      return "rgb(232, 232, 15)";
    } else if (role === "Submitter") {
      return "rgb(224, 1, 1)";
    }
  };

  const [isLogoutMenuVisible, setIsLogoutMenuVisible] = useState(false);

  const handleLogoutMenuVisibility = () => {
    setIsLogoutMenuVisible(!isLogoutMenuVisible);
  };

  const handleClickOutside = (event) => {
    if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target)) {
      setIsLogoutMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(sendLogout());

      if (sendLogout.fulfilled.match(response)) {
        dispatch(logOut());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className={`sideBar ${
        role === "Admin" || role === "Project Manager" ? "grid-1" : "grid-2"
      }`}
      style={{ background: theme.primary_color, color: theme.font_color }}
    >
      <div className="sideBar-links">
        <NavLink
          to="/dashboard"
          activeclassname="active"
          className="nav-link dashboard-link"
          style={{ color: theme.font_color }}
        >
          <span className="dashboard-link text">Dashboard</span>
          <span
            className="dashboard-link icon"
            style={{ fontSize: "30px", color: theme.font_color }}
          >
            <i className="bx bxs-dashboard dashboard-link" />
          </span>
        </NavLink>
        {(role === "Admin" || role === "Project Manager") && (
          <NavLink
            to="/users"
            activeclassname="active"
            className="nav-link users-link"
            style={{ color: theme.font_color }}
          >
            <span className="users-link text">Users</span>
            <span
              className="users-link icon"
              style={{ fontSize: "30px", color: theme.font_color }}
            >
              <i className="bx bxs-group users-link" />
            </span>
          </NavLink>
        )}
        {(role === "Admin" || role === "Project Manager") && (
          <NavLink
            to="/projects"
            activeclassname="active"
            className="nav-link projects-link"
            style={{ color: theme.font_color }}
          >
            <span className="projects-link text">Projects</span>
            <span
              className="projects-link icon"
              style={{ fontSize: "30px", color: theme.font_color }}
            >
              <i className="bx bx-task projects-link" />
            </span>
          </NavLink>
        )}
        <NavLink
          to="/issues"
          activeclassname="active"
          className="nav-link issues-link"
          style={{ color: theme.font_color }}
        >
          <span className="issues-link text">Issues</span>
          <span
            className="issues-link icon"
            style={{ fontSize: "30px", color: theme.font_color }}
          >
            <i className="bx bxs-bug issues-link" />
          </span>
        </NavLink>
        <NavLink
          to="/reports"
          activeclassname="active"
          className="nav-link reports-link"
          style={{ color: theme.font_color }}
        >
          <span className="reports-link text">Reports</span>
          <span
            className="reports-link icon"
            style={{ fontSize: "30px", color: theme.font_color }}
          >
            <i className="bx bxs-report reports-link" />
          </span>
        </NavLink>
      </div>
      <div className="settings-icon-container">
        <NavLink to={`/users/${userId}`} className="nav-link settings-link">
          <i
            className="bx bx-cog settings-icon"
            style={{ color: theme.font_color }}
          ></i>
        </NavLink>
      </div>
      <div className="user-icon-container">
        <div className="logout-container">
          <button
            className="logout-button"
            onClick={handleLogoutMenuVisibility}
            ref={logoutMenuRef}
          >
            <i
              className="bx bxs-user-rectangle user-icon"
              style={{ color: getIconColor() }}
            ></i>
          </button>

          <div className={`menu-overlay ${isLogoutMenuVisible ? "active" : ""}`}>
            <div
              className={`logout-menu-container ${
                isLogoutMenuVisible ? "active" : ""
              }`}
              onMouseEnter={() => setIsLogoutMenuVisible(true)}
              onMouseLeave={() => setIsLogoutMenuVisible(false)}
              style={{
                background: theme.background_color,
                border: isLogoutMenuVisible ? `1px solid ${theme.border}` : "",
                color: theme.font_color,
              }}
            >
              <NavLink
                className="nav-link user-link"
                onClick={(event) => {
                  setIsLogoutMenuVisible(false)
                  handleLogout(event)
                }}
                style={{ color: theme.font_color }}
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
        <div className="user-name-welcome">
          Hello, <br />
          {userName}
        </div>
      </div>
    </section>
  );
}

export default SideBar;
