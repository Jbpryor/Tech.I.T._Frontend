import React, { useState } from "react";
import "./user.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserButtons from "./User Buttons/userButtons";
import UserAccount from "./User Account/userAccount";
import UserNotifications from "./Notifications/userNotification";
import UserPassword from "./Password/userPassword";

function User() {
  const { userId } = useParams();

  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );
  const users = useSelector((state) => state.users);

  const user = users.find((user) => {
    if (typeof user.id === "string") {
      return user.id === userId;
    } else {
      return user.id.toString() === userId;
    }
  });

  const [accountActive, setAccountActive] = useState(true);
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [viewUserButtons, setViewUserButtons] = useState(true);

  return (
    <section
      className="user"
      style={{ color: theme.font_color, background: theme.background_color }}
    >
      <div className="user-container">
        <UserButtons
          user={user}
          setAccountActive={setAccountActive}
          setNotificationsActive={setNotificationsActive}
          setPasswordActive={setPasswordActive}
          viewUserButtons={viewUserButtons}
          setViewUserButtons={setViewUserButtons}
          theme={theme}
        />

        <UserAccount user={user} theme={theme} accountActive={accountActive} />

        <UserNotifications
          theme={theme}
          notificationsActive={notificationsActive}
        />

        <UserPassword theme={theme} passwordActive={passwordActive} />
      </div>
    </section>
  );
}

export default User;
