// Your React component file (e.g., ToggleSwitch.jsx)

import React from "react";
import "./toggleSwitch.scss";
import { selectTheme } from "../../Settings/settingsSlice";
import { useSelector } from "react-redux";

const ToggleSwitch = ({ label, checked, onChange }) => {

  const theme = useSelector(selectTheme);

  document.documentElement.style.setProperty("--primary", theme.primary_color);
  document.documentElement.style.setProperty("--font", theme.font_color);
  document.documentElement.style.setProperty("--background", theme.background_color);
  document.documentElement.style.setProperty("--border", theme.border);

  return (
    <div className="container">
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" name={label} id={label} checked={checked} onChange={(event) => onChange(event.target.checked)} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
