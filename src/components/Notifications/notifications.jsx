import "./notifications.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import { selectTheme } from "../Users/User/Settings/settingsSlice";
import { selectUserById, updateUser, fetchUsers } from "../Users/userSlice";
import useAuth from "../../Hooks/useAuth";
import { NotificationFilter } from "./notificationFilter";

function Notifications() {
  const theme = useSelector(selectTheme);
  const isNotificationsActive = location.pathname === "/notifications";
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const toggleNotififications = useSelector((state) => state.notifications);

  const user = useSelector((state) => selectUserById(state, userId));

  const notifications = user.notifications;

  const filteredNotifications = NotificationFilter({ notifications })
    
  const handleNotificationClick = async (notificationId) => {
    try {
      setRequestStatus("pending");

      const updatedUser = {
        _id: userId,
        notificationId: notificationId,
      };

      const response = await dispatch(updateUser(updatedUser));

      if (updateUser.fulfilled.match(response)) {
        await dispatch(fetchUsers());
      } else {
        console.log("Notification update failed: " + response.error.message);
      }
    } catch (error) {
      console.error("Failed to save the notification isNew flag", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  if (!filteredNotifications.length) {
    return (
      <section className="notifications notifications-tile">
        <h1 className="no-notifications" style={{ color: theme.font_color }}>No Notifications</h1>
      </section>
    );
  }

  return (
    <section className="notifications notifications-tile">
      <div
        className={`notifications-container ${
          isNotificationsActive ? "active" : ""
        }`}
      >
        {filteredNotifications.map((notification, index) => (
          <Link
            className={`notifications-link ${
              isNotificationsActive ? "active" : ""
            }`}
            to={notification.notificationLink || "/dashboard"}
            key={index}
            onClick={() => handleNotificationClick(notification._id)}
          >
            <div
              className="notification-container"
              key={index}
              style={{
                background: theme.primary_color,
                border: `1px solid ${theme.border}`,
                color: notification.isNewNotification ? theme.font_color : theme.border,
              }}
            >
              <div className="notification-message">
                {notification.message}:
              </div>

              <div className="notifications-contents">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-date">
                  {formatDistanceToNow(parseISO(notification.date))} ago
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Notifications;
