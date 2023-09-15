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
import Issue from '../Issues/Issue/issue'
import NewIssue from "../Issues/New Issue/newIssue";

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
                    <Route path='/Projects' element={<Projects />} />
                    <Route path='/Issues' element={<Issues />} />
                    <Route path='/issues/:issueId' element={<Issue />} />
                    <Route path='/issues/newIssue' element={<NewIssue />} />
                    <Route path='/Reports' element={<Reports />} />
                </Routes>

            </div>
        </section>
    )
}

export default Layout;