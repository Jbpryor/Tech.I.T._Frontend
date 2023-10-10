import React from "react";
import { Link } from "react-router-dom";

function ProjectsTable({ project, isProjectsActive }) {
    return (
        <tr className='projects-table-row' key={project.id}>
            <td  className="project-title" >
                <Link className='project-link' to={`/projects/${project.id}`} key={project.id}>{project.title}</Link>
            </td>
            <td>{project.type}</td>
            {isProjectsActive && <td>{project.description}</td>}
            {isProjectsActive && <td>{project.manager}</td>}
            <td>{project.clientName}</td>
            {isProjectsActive && <td>{project.frontend}</td>}
            {isProjectsActive && <td>{project.backend}</td>}
            {isProjectsActive && <td>{project.created}</td>}
            {/* <td>
                <button className="delete" onClick={() => { onDelete(index)}}>Delete</button>
            </td> */}
        </tr>
    )
}

export default ProjectsTable;