import React, { useEffect, useState } from "react";
import "./user.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserButtons from "./User Buttons/userButtons";
import GeneralSettings from "./Settings/settings"
import UserAccount from "./User Account/userAccount";
import UserNotifications from "./Notifications/userNotification";
import UserPassword from "./Password/userPassword";
import useWindowSize from "../../../Hooks/useWindowSize";
import { selectAllUsers } from "../userSlice";
import { selectTheme } from "./Settings/settingsSlice";

function User() {
  const { userId } = useParams();

  const theme = useSelector(selectTheme);

  const users = useSelector(selectAllUsers);

  const user = users.find((user) => {
    if (typeof user.id === "string") {
      return user.id === userId;
    } else {
      return user.id.toString() === userId;
    }
  });

  const { width } = useWindowSize();

  const [generalActive, setGeneralActive] = useState(false);
  const [accountActive, setAccountActive] = useState(false);
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [viewUserButtons, setViewUserButtons] = useState(true);

  useEffect(() => {
    if (width < 1200) {
      setAccountActive(false);
    } else {
      setAccountActive(true);
    }
  }, [width]);

  return (
    <section
      className="user"
      style={{ color: theme.font_color, background: theme.background_color }}
    >
      <div className="user-container">
        <UserButtons
          user={user}
          setGeneralActive={setGeneralActive}
          setAccountActive={setAccountActive}
          setNotificationsActive={setNotificationsActive}
          setPasswordActive={setPasswordActive}
          viewUserButtons={viewUserButtons}
          setViewUserButtons={setViewUserButtons}
          theme={theme}
        />

        <GeneralSettings generalActive={generalActive} />

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
