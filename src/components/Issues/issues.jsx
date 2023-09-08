import React from 'react';
import { useLocation } from 'react-router-dom';
import './issues.scss'
import Issue from './Issue/issue';
import { issues } from './Issue/issue'

function Issues() {
    const location = useLocation();
    const isIssuesActive = location.pathname === '/Issues';


    return (
        <section className="issues">
            <div className={`issues-title ${isIssuesActive ? 'active' : ''}`}>Issues</div>
            <div className={`issues-container ${isIssuesActive ? 'active' : ''}`}>
                {issues.map((issue, index) => (
                    <Issue key={index} issue={issue} />
                ))}
            </div>
        </section>
    )
}

export default Issues;