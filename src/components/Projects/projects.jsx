import React, { useEffect, useState } from 'react';
import './projects.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sortByProperty } from '../../utils';
import ProjectsSort from './Projects Sort/projectsSort';
import ProjectsTable from './Projects Table/projectsTable';
import TablePagination from '../../Charts & Tables/Table Pagination/tablePagination';
import { selectAllProjects } from './projectSlice';
import { selectViewMode } from '../Layout/viewModeSlice';
import { selectTheme } from '../Users/User/Settings/settingsSlice';


function Projects() {
    const viewMode = useSelector(selectViewMode);
    const location = useLocation();
    const isProjectsActive = location.pathname === '/projects';
    const projects = useSelector(selectAllProjects);
    const theme = useSelector(selectTheme);

    const sortedProjectsByBackend = [...projects].sort(sortByProperty('backend', null, true));
    const sortedProjectsByClientName = [...projects].sort(sortByProperty('clientName', null, true));
    const sortedProjectsByDate = [...projects].sort(sortByProperty('created', null, true));
    const sortedProjectsByFrontend = [...projects].sort(sortByProperty('frontEnd', null, true));
    const sortedProjectsByManager = [...projects].sort(sortByProperty('manager', null, true));
    const sortedProjectsByTitle = [...projects].sort(sortByProperty('title', null, true));
    const sortedProjectsByType = [...projects].sort(sortByProperty('type', null, true));


    const [ rotate, setRotate ] = useState(false);
    const [ selectedSort, setSelectedSort ] = useState('');

    const handleRotate = () => {
        setRotate(!rotate);
        setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
    }

    const [sortOrder, setSortOrder] = useState('ascending');

    const getSortingFunction = () => {
        switch (selectedSort) {
            case 'Backend':
                return sortOrder === 'ascending' ? sortedProjectsByBackend : sortedProjectsByBackend.reverse();
            case 'Client Name':
                return sortOrder === 'ascending' ? sortedProjectsByClientName : sortedProjectsByClientName.reverse();
            case 'Created':
                return sortOrder === 'ascending' ? sortedProjectsByDate : sortedProjectsByDate.reverse();
            case 'Frontend':
                return sortOrder === 'ascending' ? sortedProjectsByFrontend : sortedProjectsByFrontend.reverse();
            case 'Manager':
                return sortOrder === 'ascending' ? sortedProjectsByManager : sortedProjectsByManager.reverse();
            case 'Title':
                return sortOrder === 'ascending' ? sortedProjectsByTitle : sortedProjectsByTitle.reverse();
            case 'Type':
                return sortOrder === 'ascending' ? sortedProjectsByType : sortedProjectsByType.reverse();
            default:
                return sortOrder === 'ascending' ? sortedProjectsByDate : sortedProjectsByDate.reverse();
        }
      };
      
      
    const sortedProjects = getSortingFunction();


    /* this is the break from list view to tile view */

    const [ titleRotate, setTitleRotate ] = useState(false);
    const [ typeRotate, setTypeRotate ] = useState(false);
    const [ descriptionRotate, setDescriptionRotate ] = useState(false);
    const [ managerRotate, setManagerRotate ] = useState(false);
    const [ clientNameRotate, setClientNameRotate ] = useState(false);
    const [ frontendRotate, setFrontendRotate ] = useState(false);
    const [ backendRotate, setBackendRotate ] = useState(false);
    const [ createdRotate, setCreatedRotate ] = useState(false);
    const [ titleColumnActive, setTitleColumnActive ] = useState(false);
    const [ typeColumnActive, setTypeColumnActive ] = useState(false);
    const [ descriptionColumnActive, setDescriptionColumnActive ] = useState(false);
    const [ managerColumnActive, setManagerColumnActive ] = useState(false);
    const [ clientNameColumnActive, setClientNameColumnActive ] = useState(false);
    const [ frontendColumnActive, setFrontendColumnActive ] = useState(false);
    const [ backendColumnActive, setBackendColumnActive ] = useState(false);
    const [ createdColumnActive, setCreatedColumnActive ] = useState(false);

    const handleActiveColumn = (column) => {
        if (column === 'title') {
            setTitleColumnActive(true);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setManagerColumnActive(false);
            setClientNameColumnActive(false);
            setFrontendColumnActive(false);
            setBackendColumnActive(false);
            setCreatedColumnActive(false);
            setTitleRotate(!titleRotate);
            setSelectedSort('Title');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'type') {
            setTitleColumnActive(false);
            setTypeColumnActive(true);
            setDescriptionColumnActive(false);
            setManagerColumnActive(false);
            setClientNameColumnActive(false);
            setFrontendColumnActive(false);
            setBackendColumnActive(false);
            setCreatedColumnActive(false);
            setTypeRotate(!typeRotate);
            setSelectedSort('Type');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'description') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(true);
            setManagerColumnActive(false);
            setClientNameColumnActive(false);
            setFrontendColumnActive(false);
            setBackendColumnActive(false);
            setCreatedColumnActive(false);
            setDescriptionRotate(!descriptionRotate);
            setSelectedSort('Description');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'manager') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setManagerColumnActive(true);
            setClientNameColumnActive(false);
            setFrontendColumnActive(false);
            setBackendColumnActive(false);
            setCreatedColumnActive(false);
            setManagerRotate(!managerRotate);
            setSelectedSort('Manager');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'clientName') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setManagerColumnActive(false);
            setClientNameColumnActive(true);
            setFrontendColumnActive(false);
            setBackendColumnActive(false);
            setCreatedColumnActive(false);
            setClientNameRotate(!clientNameRotate);
            setSelectedSort('Client Name');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'frontend') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setManagerColumnActive(false);
            setClientNameColumnActive(false);
            setFrontendColumnActive(true);
            setBackendColumnActive(false);
            setCreatedColumnActive(false);
            setFrontendRotate(!frontendRotate);
            setSelectedSort('Frontend');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'backend') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setManagerColumnActive(false);
            setClientNameColumnActive(false);
            setFrontendColumnActive(false);
            setBackendColumnActive(true);
            setCreatedColumnActive(false);
            setBackendRotate(!backendRotate);
            setSelectedSort('Backend');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'created') {
            setTitleColumnActive(false);
            setTypeColumnActive(false);
            setDescriptionColumnActive(false);
            setManagerColumnActive(false);
            setClientNameColumnActive(false);
            setFrontendColumnActive(false);
            setBackendColumnActive(false);
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
    const pageCount = Math.ceil(sortedProjects.length / itemsPerPage);

    const slicedProjects = sortedProjects.map((project, index) => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        if (index >= firstPageIndex && index < lastPageIndex) {
            return project;
        }
        return null;
    }).filter(Boolean);

    return (
        <>
            {viewMode === 'list' ? (
                <section className="projects projects-list" style={{ color: theme.font_color }} >
                    <div className={`projects-title ${!isProjectsActive ? 'active' : ''}`}>Projects</div>

                    <div className="projects-container">

                        <div className="all-projects-table-container" style={{ border: `1px solid ${theme.border}`, background: theme.primary_color, color: theme.font_color }} >
                            <div className="projects-table-content">
                                <table>
                                    <thead>

                                        <tr>
                                            <th value='title' className={`title-column ${titleColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('title')}>Title <i className={`bx bx-down-arrow ${titleRotate ? 'rotate' : ''} ${titleColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('title')}></i></th>
                                            <th value='type' className={`type-column ${typeColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('type')}>Type <i className={`bx bx-down-arrow ${typeRotate ? 'rotate' : ''} ${typeColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('type')}></i></th>
                                            {isProjectsActive && <th value='description' className={`description-column ${descriptionColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('description')}>Description <i className={`bx bx-down-arrow ${descriptionRotate ? 'rotate' : ''} ${descriptionColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('description')}></i></th>}
                                            <th value='clientName' className={`clientName-column ${clientNameColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('clientName')}>Client Name <i className={`bx bx-down-arrow ${clientNameRotate ? 'rotate' : ''} ${clientNameColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('clientName')}></i></th>
                                            {isProjectsActive && <th value='manager' className={`manager-column ${managerColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('manager')}>Manager <i className={`bx bx-down-arrow ${managerRotate ? 'rotate' : ''} ${managerColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('manager')}></i></th>}
                                            {isProjectsActive && <th value='frontend' className={`frontend-column ${frontendColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('frontend')}>Frontend <i className={`bx bx-down-arrow ${frontendRotate ? 'rotate' : ''} ${frontendColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('frontend')}></i></th>}
                                            {isProjectsActive && <th value='backend' className={`backend-column ${backendColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('backend')}>Backend <i className={`bx bx-down-arrow ${backendRotate ? 'rotate' : ''} ${backendColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('backend')}></i></th>}
                                            {isProjectsActive && <th value='created' className={`created-column ${createdColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('created')}>Created <i className={`bx bx-down-arrow ${createdRotate ? 'rotate' : ''} ${createdColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('created')}></i></th>}
                                        </tr>

                                    </thead>
                                    <tbody className="users-table-body">
                                        {slicedProjects.map((project, index) => (
                                            <ProjectsTable project={project} key={index} index={index} isProjectsActive={isProjectsActive} theme={theme} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="projects-table-pagination">
                                <TablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} onPageChange={handlePageChange} totalCount={sortedProjects.length} items={sortedProjects} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} pageCount={pageCount} />
                            </div>
                        </div>

                    </div>
                </section>
                ) : (
                <section className="projects projects-tile">

                    <ProjectsSort selectedSort={selectedSort} setSelectedSort={setSelectedSort} rotate={rotate} handleRotate={handleRotate} theme={theme} />

                    <div className={`projects-container ${isProjectsActive ? 'active' : ''}`} >                
                    {sortedProjects.map((project) => (
                        <Link className={`project-link ${isProjectsActive ? 'active' : ''}`} to={`/projects/${project._id}`} key={project._id}>
                            <div className='project-container' style={{ border: `1px solid ${theme.border}`, background: theme.primary_color, color: theme.font_color }}>       
                                <div className="project-title">{project.title}</div>
                                <div className="project-contents">
                                    <div className="project-description">{project.description}</div>                            
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

export default Projects;