import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../Settings/settingsSlice";
import { capitalizeFirstLetter } from "../../../../../Utils/utils";
import { selectCurrentTheme } from "../Settings/settingsSlice";

function Settings({ generalActive, theme }) {
  const currentTheme = useSelector(selectCurrentTheme);

  const dispatch = useDispatch();

  const [darkModeActive, setDarkModeActive] = useState(false);
  const [lightModeActive, setLightModeActive] = useState(true);

  const toggleDarkMode = () => {
    setDarkModeActive(true);
    setLightModeActive(false);
    dispatch(setTheme("dark-mode"));
  };

  const toggleLightMode = () => {
    setLightModeActive(true);
    setDarkModeActive(false);
    dispatch(setTheme("light-mode"));
  };

  return (
    <div
      className={`settings-container ${generalActive ? "active" : ""}`}
      style={{
        background: theme.primary_color,
        color: theme.font_color,
        border: `2px solid ${theme.border}`,
      }}
    >
      <div className="theme-settings-content">
        <div className="theme-settings-title">
          Current Theme: {capitalizeFirstLetter(currentTheme)}
        </div>
        <div className="theme-buttons-container">
          <button
            className={`light-mode-button ${lightModeActive ? "active" : ""}`}
            onClick={toggleLightMode}
          >
            Light Mode
          </button>
          <button
            className={`dark-mode-button ${darkModeActive ? "active" : ""}`}
            onClick={toggleDarkMode}
          >
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
