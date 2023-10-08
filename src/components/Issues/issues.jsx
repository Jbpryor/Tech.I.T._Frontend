import React, { useEffect, useState } from 'react';
import './issues.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'boxicons/css/boxicons.min.css';
import { sortByProperty } from '../../main';
import IssuesSort from './Issues Sort/issuesSort';

function Issues({ projectIssues }) {
    const location = useLocation();
    const isIssuesActive = location.pathname === '/issues';
    const issues = useSelector((state) => state.issues)

    const priorityOrder = ['Critical', 'High', 'Medium', 'Low'];
    const statusOrder = ['Open', 'In Progress', 'Under Review', 'Resolved', 'Postponed', 'Closed'];

    const isProjectsActive = /^\/projects\//.test(location.pathname);
    
    const filteredIssues = isProjectsActive ? projectIssues : issues;

    const sortedIssuesByDate = [...filteredIssues].sort(sortByProperty('created', null, true));
    const sortedIssuesByDeveloper = [...filteredIssues].sort(sortByProperty('developer', null, true));
    const sortedIssuesByPriority = [...filteredIssues].sort(sortByProperty('priority', priorityOrder, true));
    const sortedIssuesByProject = [...filteredIssues].sort(sortByProperty('project', null, true));
    const sortedIssuesByStatus = [...filteredIssues].sort(sortByProperty('status', statusOrder, true));
    const sortedIssuesBySubmitter = [...filteredIssues].sort(sortByProperty('submitter', null, true));
    const sortedIssuesByTitle = [...filteredIssues].sort(sortByProperty('title', null, true));
    const sortedIssuesByType = [...filteredIssues].sort(sortByProperty('type', null, true));


    const [ rotate, setRotate ] = useState(false);
    const [ selectedSort, setSelectedSort ] = useState('');

    const handleRotate = () => {
        setRotate(!rotate);
        setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
    };

    const [sortOrder, setSortOrder] = useState('ascending');

    const getSortingFunction = () => {
        switch (selectedSort) {
            case 'Created':
                return sortOrder === 'ascending' ? sortedIssuesByDate : sortedIssuesByDate.reverse();
            case 'Developer':
                return sortOrder === 'ascending' ? sortedIssuesByDeveloper : sortedIssuesByDeveloper.reverse();
            case 'Priority':
                return sortOrder === 'ascending' ? sortedIssuesByPriority : sortedIssuesByPriority.reverse();
            case 'Project':
                return sortOrder === 'ascending' ? sortedIssuesByProject : sortedIssuesByProject.reverse();
            case 'Status':
                return sortOrder === 'ascending' ? sortedIssuesByStatus : sortedIssuesByStatus.reverse();
            case 'Submitter':
                return sortOrder === 'ascending' ? sortedIssuesBySubmitter : sortedIssuesBySubmitter.reverse();
            case 'Title':
                return sortOrder === 'ascending' ? sortedIssuesByTitle : sortedIssuesByTitle.reverse();
            case 'Type':
                return sortOrder === 'ascending' ? sortedIssuesByType : sortedIssuesByType.reverse();
            default:
                return sortOrder === 'ascending' ? sortedIssuesByDate : sortedIssuesByDate.reverse();
        }
      };      
      
    const sortedIssues = getSortingFunction();      
    
    return (
        <section className="issues">
            <div className={`issues-title ${isIssuesActive ? 'active' : ''}`}>Issues</div>

            <IssuesSort selectedSort={selectedSort} setSelectedSort={setSelectedSort} rotate={rotate} handleRotate={handleRotate} isProjectsActive={isProjectsActive} />

            <div className={`issues-container ${isIssuesActive ? 'active' : ''}`}>              
            {sortedIssues.map((issue) => (
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