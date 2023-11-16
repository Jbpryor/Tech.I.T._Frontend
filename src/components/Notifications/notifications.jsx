import React from "react";
import "./notifications.scss";
import { useSelector } from "react-redux";

function Notifications() {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );

  return notifications.map((notification) => (
    <div
      className="notification-container"
      style={{ color: theme.font_color, background: theme.background_color }}
    >
      <div className="notification-message">{notification.message}</div>
      <div className="notification-title">{notification.title}</div>
      <div className="notification-date">{notification.currentDate}</div>
    </div>
  ));
}

export default Notifications;
