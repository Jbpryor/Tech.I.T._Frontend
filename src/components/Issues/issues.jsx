import React, { useEffect } from 'react';
import './issues.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Issues({ projectIssues }) {
    const location = useLocation();
    const isIssuesActive = location.pathname === '/issues';
    const issues = useSelector((state) => state.issues)
    const sortedIssues = [...issues].sort((a, b) => {
        const priorityOrder = ['Critical', 'High', 'Medium', 'Low'];
        const priorityA = priorityOrder.indexOf(a.priority);
        const priorityB = priorityOrder.indexOf(b.priority);
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return a.created.localeCompare(b.created);
    });
    
    const isProjectsActive = /^\/projects\//.test(location.pathname);
    
    const filteredIssues = isProjectsActive ? projectIssues : sortedIssues;
    
    return (
        <section className="issues">
            <div className={`issues-title ${isIssuesActive ? 'active' : ''}`}>Issues</div>
            <div className={`issues-container ${isIssuesActive ? 'active' : ''}`}>              
            {filteredIssues.map((issue) => (
                <Link className='issue-link' to={`/issues/${issue.id}`} key={issue.id}>
                    <div className={`issue-container ${isIssuesActive ? 'active' : ''}`}>       
                        <div className="issue-title">{issue.title}</div>
                        <div className="issue-contents">
                            {Object.entries(issue).filter(([key]) => ['project', 'priority', 'status'].includes(key)).map(([key, value]) => (                
                                <div className="issue-name" key={key}>
                                    <div className="issue-left">{key}:</div>
                                    <div className="issue-right">{value}</div>
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

export default Issues;