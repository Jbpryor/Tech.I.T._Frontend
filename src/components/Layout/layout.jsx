import PrivateRoutes from "../Auth/privateRoute";
import "./layout.scss";
import Logo from "./Logo/logo";
import Header from "./Header/header";
import SideBar from "./Side Bar/sideBar";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectTheme } from "../Users/User/Settings/settingsSlice";

function Layout() {
  const theme = useSelector(selectTheme);

  return (
    <PrivateRoutes>
      <section className="layout">
        <Logo />
        <SideBar />
        <Header />
        <div
          className="main-content"
          style={{ background: theme.background_color }}
        >
          <Outlet />
        </div>
      </section>
    </PrivateRoutes>
  );
}

export default Layout;
