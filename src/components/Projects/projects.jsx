import React from "react";
import { useLocation } from "react-router-dom";
import './projects.scss';
import Project from "./Project/project";


function Projects() {
    const location = useLocation();
    const isProjectsActive = location.pathname === '/Projects';


    return (
        <section className="projects">
            <div className={`projects-title ${isProjectsActive ? 'active' : ''}`}>Projects</div>
            <div className="projects-container">
                <Project />
            </div>
        </section>
    )
}

export default Projects;