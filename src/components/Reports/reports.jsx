import React, { useEffect } from 'react';
import './reports.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Reports({ projectReports }) {
    const location = useLocation();
    const isReportsActive = location.pathname === '/reports';
    const reports = useSelector((state) => state.reports);
    const isProjectsActive = /^\/projects\//.test(location.pathname);
    
    const filteredReports = isProjectsActive ? projectReports : reports;
    
    return (
        <section className="reports">
            <div className={`reports-title ${isReportsActive ? 'active' : ''}`}>Reports</div>
            <div className={`reports-container ${isReportsActive ? 'active' : ''}`}>              
            {filteredReports.map((report) => (
                <Link className='report-link' to={`/reports/${report.id}`} key={report.id}>
                    <div className={`report-container ${isReportsActive ? 'active' : ''}`}>       
                        <div className="report-title">{report.title}</div>
                        <div className="report-contents">
                            {Object.entries(report).filter(([key]) => ['project', 'priority', 'status'].includes(key)).map(([key, value]) => (                
                                <div className="report-name" key={key}>
                                    <div className="report-left">{key}:</div>
                                    <div className="report-right">{value}</div>
                                </div>                               
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </section>
    )
}

export default Reports;