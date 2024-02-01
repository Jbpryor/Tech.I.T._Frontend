import { useSelector } from "react-redux";

export function NotificationFilter({ notifications }) {
  const toggleNotififications = useSelector((state) => state.notifications);

  const {
    allNotifications,
    newProjectNotification,
    newIssueNotification,
    newUserNotification,
    newReportNotification,
    issueClosedNotification,
    issueStatusChangeNotification,
    issueCommentNotification,
    issueAttachmentNotification,
    roleChangeNotification,
  } = toggleNotififications;

  const filterFunctions = [
    { filter: newProjectNotification, type: "newProject" },
    { filter: newIssueNotification, type: "newIssue" },
    { filter: newUserNotification, type: "newUser" },
    { filter: newReportNotification, type: "newReport" },
    { filter: issueClosedNotification, type: "issueClosed" },
    { filter: issueStatusChangeNotification, type: "issueStatusChange" },
    { filter: issueCommentNotification, type: "issueComment" },
    { filter: issueAttachmentNotification, type: "issueAttachment" },
    { filter: roleChangeNotification, type: "roleChange" },
  ];

  const filteredNotificationArray = filterFunctions
    .filter(({ filter }) => !filter)
    .map(({ type }) => (notification) => notification.notificationType !== type);

  if (!allNotifications) {
    return [];
  }

  return notifications.filter((notification) =>
    filteredNotificationArray.every((filter) => filter(notification))
  );
}
