import React, { useEffect, useState } from 'react';
import './projects.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sortByProperty } from '../../main';
import ProjectsSort from './Projects Sort/projectsSort';


function Projects() {
    const location = useLocation();
    const isProjectsActive = location.pathname === '/projects';
    const projects = useSelector((state) => state.projects);
    
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

    return (
        <section className="projects">
            <div className={`projects-title ${isProjectsActive ? 'active' : ''}`}>Projects</div>

            <ProjectsSort selectedSort={selectedSort} setSelectedSort={setSelectedSort} rotate={rotate} handleRotate={handleRotate} />

            <div className={`projects-container ${isProjectsActive ? 'active' : ''}`}>                
            {sortedProjects.map((project) => (
                <Link className='project-link' to={`/projects/${project.id}`} key={project.id}>
                    <div className={`project-container ${isProjectsActive ? 'active' : ''}`}>       
                        <div className="project-title">{project.title}</div>
                        <div className="project-contents">
                            <div className="project-description">{project.description}</div>                            
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </section>
    )
}

export default Projects;