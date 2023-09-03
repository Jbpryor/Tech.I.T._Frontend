import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Header from "../Header/header";
import SideBar from "../Side Bar/sideBar";
// import Dashboard from "../Dashboard/dashboard";
// import Details from "../Details/details";
// import ProjectUsers from "../Project Users/projectUsers";
// import RoleAssignment from "../Role Assignment/roleAssignment";
// import Ticket from "../Ticket/ticket";
import { Outlet } from 'react-router-dom';
import './layout.scss'

function Layout() {
    return (
        <section className="layout">            
            <SideBar />
            <Header />
            <div className="main-content">

                <Outlet />

            </div>
        </section>
    )
}

export default Layout;