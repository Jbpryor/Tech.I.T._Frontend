import React, { useEffect } from 'react';
import './projects.scss'
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Projects() {
    const location = useLocation();
    const isProjectsActive = location.pathname === '/projects';
    const projects = useSelector((state) => state.projects);
    

    return (
        <section className="projects">
            <div className={`projects-title ${isProjectsActive ? 'active' : ''}`}>Projects</div>
            <div className={`projects-container ${isProjectsActive ? 'active' : ''}`}>                
            {projects.map((project) => (
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