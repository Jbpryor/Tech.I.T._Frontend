import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/login";
import DemoLogin from "./components/Auth/Demo Login/demoLogin";
import Layout from "./components/Layout/layout";
import Dashboard from "./components/Dashboard/dashboard";
import Issues from "./components/Issues/issues";
import Projects from "./components/Projects/projects";
import Reports from "./components/Reports/reports";
import Users from "./components/Users/users";
import User from "./components/Users/User/user";
import Issue from "./components/Issues/Issue/issue";
import NewIssue from "./components/Issues/New Issue/newIssue";
import Project from "./components/Projects/Project/project";
import NewProject from "./components/Projects/New Project/newProject";
import NewUser from "./components/Users/User/New User/newUser";
import Report from "./components/Reports/Report/report";
import NewReport from "./components/Reports/New Report/newReport";
import Settings from "./components/Users/User/Settings/settings";
import Notifications from "./components/Notifications/notifications";
import Prefetch from "./components/Auth/Login/prefetch";
import ForgotPassword from "./components/Auth/Forgot Password/forgotPassword";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/passwordReset" element={<ForgotPassword />} />
      <Route path="/demoLogin" element={<DemoLogin />} />

      <Route element={<Prefetch />}>
        <Route path="/*" element={<Layout />}>

          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="users">
            <Route index element={<Users />} />
            <Route path=":userId" element={<User />} />
            <Route path="newUser" element={<NewUser />} />
          </Route>

          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path=":projectId" element={<Project />} />
            <Route path="newProject" element={<NewProject />} />
          </Route>

          <Route path="issues">
            <Route index element={<Issues />} />
            <Route path=":issueId" element={<Issue />} />
            <Route path="newIssue" element={<NewIssue />} />
          </Route>

          <Route path="reports">
            <Route index element={<Reports />} />
            <Route path=":reportId" element={<Report />} />
            <Route path="newReport" element={<NewReport />} />
          </Route>

          <Route path="settings" element={<Settings />} />

          <Route path="notifications" element={<Notifications />} />
          
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
