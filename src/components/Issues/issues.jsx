import { useState } from 'react';
import './issues.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'boxicons/css/boxicons.min.css';
import { sortByProperty } from '../../../Utils/utils';
import IssuesSort from './Issues Sort/issuesSort';
import IssuesTable from './Issues Table/issuesTable';
import TablePagination from '../../Charts & Tables/Table Pagination/tablePagination';
import { selectAllIssues } from './issueSlice';
import { selectViewMode } from '../Layout/viewModeSlice';
import { selectTheme } from '../Users/User/Settings/settingsSlice';

function Issues({ projectIssues }) {

    const viewMode = useSelector(selectViewMode);

    const location = useLocation();
    const isIssuesActive = location.pathname === '/issues';
    const issues = useSelector(selectAllIssues)
    const theme = useSelector(selectTheme);

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
                return sortOrder === 'descending' ? sortedIssuesByDate : sortedIssuesByDate.reverse();
            case 'Developer':
                return sortOrder === 'descending' ? sortedIssuesByDeveloper : sortedIssuesByDeveloper.reverse();
            case 'Priority':
                return sortOrder === 'descending' ? sortedIssuesByPriority : sortedIssuesByPriority.reverse();
            case 'Project':
                return sortOrder === 'descending' ? sortedIssuesByProject : sortedIssuesByProject.reverse();
            case 'Status':
                return sortOrder === 'descending' ? sortedIssuesByStatus : sortedIssuesByStatus.reverse();
            case 'Submitter':
                return sortOrder === 'descending' ? sortedIssuesBySubmitter : sortedIssuesBySubmitter.reverse();
            case 'Title':
                return sortOrder === 'descending' ? sortedIssuesByTitle : sortedIssuesByTitle.reverse();
            case 'Type':
                return sortOrder === 'descending' ? sortedIssuesByType : sortedIssuesByType.reverse();
            default:
                return sortOrder === 'descending' ? sortedIssuesByDate : sortedIssuesByDate.reverse();
        }
      };
      
    const sortedIssues = getSortingFunction();
    
    
       /* this is the break from list view to tile view */

    const [ titleRotate, setTitleRotate ] = useState(false);
    const [ typeRotate, setTypeRotate ] = useState(false);
    const [ descriptionRotate, setDescriptionRotate ] = useState(false);
    const [ developerRotate, setDeveloperRotate ] = useState(false);
    const [ priorityRotate, setPriorityRotate ] = useState(false);
    const [ projectRotate, setProjectRotate ] = useState(false);
    const [ statusRotate, setStatusRotate ] = useState(false);
    const [ submitterRotate, setSubmitterRotate ] = useState(false);
    const [ createdRotate, setCreatedRotate ] = useState(false);
    const [ titleColumnActive, setTitleColumnActive ] = useState(false);
    const [ typeColumnActive, setTypeColumnActive ] = useState(false);
    const [ descriptionColumnActive, setDescriptionColumnActive ] = useState(false);
    const [ developerColumnActive, setDeveloperColumnActive ] = useState(false);
    const [ priorityColumnActive, setPriorityColumnActive ] = useState(false);
    const [ projectColumnActive, setProjectColumnActive ] = useState(false);
    const [ statusColumnActive, setStatusColumnActive ] = useState(false);
    const [ submitterColumnActive, setSubmitterColumnActive ] = useState(false);
    const [ createdColumnActive, setCreatedColumnActive ] = useState(false);

    const handleActiveColumn = (column) => {
        if (column === 'title') {
            setTitleColumnActive(true);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(false);
            setProjectColumnActive(false);
            setStatusColumnActive(false);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(false);
            setTitleRotate(!titleRotate);
            setSelectedSort('Title');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'type') {
            setTitleColumnActive(false);
            setTypeColumnActive(true);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(false);
            setProjectColumnActive(false);
            setStatusColumnActive(false);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(false);
            setTypeRotate(!typeRotate);
            setSelectedSort('Type');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'description') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(true);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(false);
            setProjectColumnActive(false);
            setStatusColumnActive(false);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(false);
            setDescriptionRotate(!descriptionRotate);
            setSelectedSort('Description');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'developer') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(true);
            setPriorityColumnActive(false);
            setProjectColumnActive(false);
            setStatusColumnActive(false);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(false);
            setDeveloperRotate(!developerRotate);
            setSelectedSort('Developer');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'priority') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(true);
            setProjectColumnActive(false);
            setStatusColumnActive(false);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(false);
            setPriorityRotate(!priorityRotate);
            setSelectedSort('Priority');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'project') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(false);
            setProjectColumnActive(true);
            setStatusColumnActive(false);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(false);
            setProjectRotate(!projectRotate);
            setSelectedSort('Project');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'status') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(false);
            setProjectColumnActive(false);
            setStatusColumnActive(true);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(false);
            setStatusRotate(!statusRotate);
            setSelectedSort('Status');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'submitter') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(false);
            setProjectColumnActive(false);
            setStatusColumnActive(false);
            setSubmitterColumnActive(true);
            setCreatedColumnActive(false);
            setSubmitterRotate(!submitterRotate);
            setSelectedSort('Submitter');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'created') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setDeveloperColumnActive(false);
            setPriorityColumnActive(false);
            setProjectColumnActive(false);
            setStatusColumnActive(false);
            setSubmitterColumnActive(false);
            setCreatedColumnActive(true);
            setCreatedRotate(!createdRotate);
            setSelectedSort('Created');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }

    };

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage < pageCount) {
            setCurrentPage(newPage);
        }
    };    

    const [ itemsPerPage, setItemsPerPage ] = useState(10);
    const pageCount = Math.ceil(sortedIssues.length / itemsPerPage);

    const slicedIssues = sortedIssues.map((issue, index) => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        if (index >= firstPageIndex && index < lastPageIndex) {
            return issue;
        }
        return null;
    }).filter(Boolean);
    
    return (
        <>
            {viewMode === 'list' ? (
                <section className="issues issues-list" style={{ color: theme.font_color }} >
                    <div className={`issues-title ${!isIssuesActive ? 'active' : ''}`}>Issues</div>

                    <div className="issues-container">

                        <div className="all-issues-table-container" style={{ border: `1px solid ${theme.border}`, background: theme.primary_color, color: theme.font_color }} >
                            <div className="issues-table-content">
                                <table>
                                    <thead>

                                        <tr>
                                            <th value='title' className={`title-column ${titleColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('title')}>Title <i className={`bx bx-down-arrow ${titleRotate ? 'rotate' : ''} ${titleColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('title')}></i></th>
                                            {isIssuesActive && <th value='type' className={`type-column ${typeColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('type')}>Type <i className={`bx bx-down-arrow ${typeRotate ? 'rotate' : ''} ${typeColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('type')}></i></th>}
                                            <th value='status' className={`status-column ${statusColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('status')}>Status <i className={`bx bx-down-arrow ${statusRotate ? 'rotate' : ''} ${statusColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('status')}></i></th>
                                            <th value='priority' className={`priority-column ${priorityColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('priority')}>Priority <i className={`bx bx-down-arrow ${priorityRotate ? 'rotate' : ''} ${priorityColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('priority')}></i></th>
                                            {isIssuesActive && <th value='project' className={`project-column ${projectColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('project')}>Project <i className={`bx bx-down-arrow ${projectRotate ? 'rotate' : ''} ${projectColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('project')}></i></th>}
                                            {isIssuesActive && <th value='description' className={`description-column ${descriptionColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('description')}>Description <i className={`bx bx-down-arrow ${descriptionRotate ? 'rotate' : ''} ${descriptionColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('description')}></i></th>}
                                            {isIssuesActive && <th value='developer' className={`developer-column ${developerColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('developer')}>Developer <i className={`bx bx-down-arrow ${developerRotate ? 'rotate' : ''} ${developerColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('developer')}></i></th>}
                                            {isIssuesActive && <th value='submitter' className={`submitter-column ${submitterColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('submitter')}>Submitter <i className={`bx bx-down-arrow ${submitterRotate ? 'rotate' : ''} ${submitterColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('submitter')}></i></th>}
                                            {isIssuesActive && <th value='created' className={`created-column ${createdColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('created')}>Created <i className={`bx bx-down-arrow ${createdRotate ? 'rotate' : ''} ${createdColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('created')}></i></th>}
                                        </tr>

                                    </thead>
                                    <tbody className="issues-table-body">
                                        {slicedIssues.map((issue, index) => (
                                            <IssuesTable issue={issue} key={index} index={index} isIssuesActive={isIssuesActive} theme={theme} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="issues-table-pagination">
                                <TablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} onPageChange={handlePageChange} totalCount={sortedIssues.length} items={sortedIssues} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} pageCount={pageCount} />
                            </div>
                        </div>

                    </div>
                </section>            
            ) : (
                <section className="issues issues-tile">

                    <IssuesSort selectedSort={selectedSort} setSelectedSort={setSelectedSort} rotate={rotate} handleRotate={handleRotate} isProjectsActive={isProjectsActive} theme={theme} />

                    <div className={`issues-container ${isIssuesActive ? 'active' : ''}`}>              
                    {sortedIssues.map((issue) => (
                        <Link className={`issue-link ${isIssuesActive ? 'active' : ''}`} to={`/issues/${issue._id}`} key={issue._id}>
                            <div className='issue-container' style={{ background: theme.primary_color, border: `1px solid ${theme.border}`, color: theme.font_color }} >       
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
            )}
        </>

    )
}

export default Issues;