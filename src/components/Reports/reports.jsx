import React from "react";
import { useLocation } from "react-router-dom";
import './reports.scss'
import Report from "./Report/report";


function Reports() {
    const location = useLocation();
    const isReportsActive = location.pathname === '/Reports';


    return (
        <section className="reports">
            <div className={`reports-title ${isReportsActive ? 'active' : ''}`}>Reports</div>
            <div className="reports-container">
                <Report />
            </div>
        </section>
    )
}

export default Reports;
