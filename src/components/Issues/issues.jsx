import React from 'react';
import { useLocation } from 'react-router-dom';
import './issues.scss'
// import Issue from './Issue/issue';
import { issues } from './Issue/issue'
import { Link } from 'react-router-dom/dist';

function Issues() {
    const location = useLocation();
    const isIssuesActive = location.pathname === '/Issues';


    return (
        <section className="issues">
            <div className={`issues-title ${isIssuesActive ? 'active' : ''}`}>Issues</div>
            <div className={`issues-container ${isIssuesActive ? 'active' : ''}`}>                
            {issues.map((issue) => (
                <Link className='issue-link' to={`/issues/${issue.title}`} key={issue.title}>
                    <div className="issue-container">       
                        <div className="issue-title">{issue.title}</div>
                        <div className="issue-contents">
                            {Object.entries(issue).map(([key, value]) => (
                                key !== 'title' && (                  
                                    <div className="issue-name" key={key}>
                                        <div className="issue-left">{key}:</div>
                                        <div className="issue-right">{value}</div>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="issue-button">
                        <button>Comment +</button>
                        </div>    
                    </div>
                </Link>
            ))}
            </div>
        </section>
    )
}

export default Issues;