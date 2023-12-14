import { Link } from "react-router-dom";

function ProjectsTable({ project, isProjectsActive, theme }) {
    return (
        <tr className='projects-table-row' key={project.id}>
            <td  className="project-title"  style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >
                <Link className='project-link' to={`/projects/${project.id}`} key={project.id}>{project.title}</Link>
            </td>
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{project.type}</td>
            {isProjectsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{project.description}</td>}
            {isProjectsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{project.manager}</td>}
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{project.clientName}</td>
            {isProjectsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{project.frontend}</td>}
            {isProjectsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{project.backend}</td>}
            {isProjectsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{project.created}</td>}
        </tr>
    )
}

export default ProjectsTable;