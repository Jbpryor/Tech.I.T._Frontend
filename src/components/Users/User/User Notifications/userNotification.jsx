import ToggleSwitch from "./Toggle Switch/toggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../../Hooks/useAuth";
import {
  selectNotifications,
  toggleAllNotifications,
  toggleNotificationBellIcon,
  toggleNewProjectNotification,
  toggleNewIssueNotification,
  toggleNewUserNotification,
  toggleNewReportNotification,
  toggleIssueClosedNotification,
  toggleIssueStatusChangeNotification,
  toggleIssueCommentNotification,
  toggleIssueAttachmentNotification,
  toggleRoleChangeNotification,
} from "../../../Notifications/notificationsSlice";

function UserNotifications({ theme, notificationsActive }) {
  const { isAdmin, isManager, isDeveloper, isSubmitter } = useAuth();

  const dispatch = useDispatch();

  const {
    allNotifications,
    notificationBellIcon,
    newProjectNotification,
    newIssueNotification,
    newUserNotification,
    newReportNotification,
    issueClosedNotification,
    issueStatusChangeNotification,
    issueCommentNotification,
    issueAttachmentNotification,
    roleChangeNotification,
  } = useSelector(selectNotifications);

  const handleToggle = (toggle) => {
    dispatch(toggle());
  };

  return (
    <div
      className={`user-notifications-container ${
        notificationsActive ? "active" : ""
      }`}
    >
      <div className="notifications-content">
        <div
          className="notifications-global"
          style={{
            background: theme.primary_color,
            border: `2px solid ${theme.border}`,
          }}
        >
          <div className="notification-content">
            <div className="notification-title">All Notifications</div>
            <div className="notification-button-container">
              <ToggleSwitch
                label="All Notifications"
                onChange={() => handleToggle(toggleAllNotifications)}
                checked={allNotifications}
              />
            </div>
          </div>
          <div className="notification-content">
            <div className="notification-title">Notification bell icon</div>
            <div className="notification-button-container">
              <ToggleSwitch
                label="Notification bell icon"
                onChange={() => handleToggle(toggleNotificationBellIcon)}
                checked={notificationBellIcon}
              />
            </div>
          </div>
        </div>
        <div
          className="notifications-local"
          style={{
            background: theme.primary_color,
            border: `2px solid ${theme.border}`,
          }}
        >
          <div className="notification-header">Notify me when:</div>
          <div className="notifications">
            {(isAdmin || isManager) && (
              <div className="notification-content">
                <div className="notification-title">
                  A new project is created
                </div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="Notify me when:"
                    onChange={() => handleToggle(toggleNewProjectNotification)}
                    checked={newProjectNotification}
                  />
                </div>
              </div>
            )}
            {!isSubmitter && (
              <div className="notification-content">
                <div className="notification-title">A new issue is created</div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="A new issue is created"
                    onChange={() => handleToggle(toggleNewIssueNotification)}
                    checked={newIssueNotification}
                  />
                </div>
              </div>
            )}
            {(isAdmin || isManager) && (
              <div className="notification-content">
                <div className="notification-title">A new user is created</div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="A new user is created"
                    onChange={() => handleToggle(toggleNewUserNotification)}
                    checked={newUserNotification}
                  />
                </div>
              </div>
            )}
            <div className="notification-content">
              <div className="notification-title">A new report is created</div>
              <div className="notification-button-container">
                <ToggleSwitch
                  label="A new report is created"
                  onChange={() => handleToggle(toggleNewReportNotification)}
                  checked={newReportNotification}
                />
              </div>
            </div>
            {isDeveloper && (
              <div className="notification-content">
                <div className="notification-title">My issue is closed</div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="My issue is closed"
                    onChange={() => handleToggle(toggleIssueClosedNotification)}
                    checked={issueClosedNotification}
                  />
                </div>
              </div>
            )}
            {isDeveloper && (
              <div className="notification-content">
                <div className="notification-title">
                  My issues status changes
                </div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="My issues status changes"
                    onChange={() => handleToggle(toggleIssueStatusChangeNotification)}
                    checked={issueStatusChangeNotification}
                  />
                </div>
              </div>
            )}
            {isDeveloper && (
              <div className="notification-content">
                <div className="notification-title">
                  My issue is commented on
                </div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="My issue is commented on"
                    onChange={() => handleToggle(toggleIssueCommentNotification)}
                    checked={issueCommentNotification}
                  />
                </div>
              </div>
            )}
            {isDeveloper && (
              <div className="notification-content">
                <div className="notification-title">
                  Attachment is added to my issue
                </div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="Attachment is added to my issue"
                    onChange={() => handleToggle(toggleIssueAttachmentNotification)}
                    checked={issueAttachmentNotification}
                  />
                </div>
              </div>
            )}
            {(isAdmin || isManager) && (
              <div className="notification-content">
                <div className="notification-title">A users role changes</div>
                <div className="notification-button-container">
                  <ToggleSwitch
                    label="A users role changes"
                    onChange={() => handleToggle(toggleRoleChangeNotification)}
                    checked={roleChangeNotification}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNotifications;
