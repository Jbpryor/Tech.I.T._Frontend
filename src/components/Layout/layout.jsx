import React from "react";
import { Routes, Route } from 'react-router-dom';
import './layout.scss';
import Header from "../Header/header";
import SideBar from "../Side Bar/sideBar";
// import { Outlet } from 'react-router-dom';
import Dashboard from "../Dashboard/dashboard";
import Issues from "../Issues/issues";
import Projects from "../Projects/projects";
import Reports from "../Reports/reports";
import Users from "../Users/users";
import User from "../Users/User/user";
import Issue from '../Issues/Issue/issue'
import NewIssue from "../Issues/New Issue/newIssue";
import Project from "../Projects/Project/project";
import NewProject from "../Projects/New Project/newProject";

function Layout() {
    return (
        <section className="layout">            
            <SideBar />
            <Header />
            <div className="main-content">

                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/users' element={<Users />}  />
                    <Route path='/users/:userId' element={<User />}  />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/projects/:projectId' element={<Project />} />
                    <Route path='/projects/newProject' element={<NewProject />} />
                    <Route path='/issues' element={<Issues />} />
                    <Route path='/issues/:issueId' element={<Issue />} />
                    <Route path='/issues/newIssue' element={<NewIssue />} />
                    <Route path='/reports' element={<Reports />} />
                </Routes>

            </div>
        </section>
    )
}

export default Layout;