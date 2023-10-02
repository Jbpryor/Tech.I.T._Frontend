import React from "react";
import './project.scss';
import Users from "../../Users/users";
import Issues from "../../Issues/issues";
import { useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";



function Project() {

    const projects = useSelector((state) => state.projects);
    const issues = useSelector((state) => state.issues);
    const users = useSelector((state) => state.users);

    const { projectId } = useParams();
    const project = projects.find((project) => project.id.toString() === projectId)
    const sortedIssues = [...issues].sort((a, b) => {
        const priorityOrder = ['Critical', 'High', 'Medium', 'Low'];
        const priorityA = priorityOrder.indexOf(a.priority);
        const priorityB = priorityOrder.indexOf(b.priority);
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return a.created.localeCompare(b.created);
    });

    const projectIssues = sortedIssues.filter((issue) => issue.project === project.title)
    const developers = projectIssues.map((issue) => issue.developer)
    const projectUsers = users.filter((user) => developers.includes(`${user.name.first} ${user.name.last}`));

    const projectIssueStatus = projectIssues.map((issue) => issue.status);

    const statusCounts = {
        'Open': 0,
        'In Progress': 0,
        'Under Review': 0,
        'Resolved': 0,
        'Postponed': 0,
        'Closed': 0,
      };
      
      projectIssueStatus.forEach((status) => {
        if (status in statusCounts) {
          statusCounts[status] += 1;
        }
      });

    const projectPriorityStatus = projectIssues.map((issue) => issue.priority)

    const priorityCounts = {
        'Critical': 0,
        'High': 0,
        'Medium': 0,
        'Low': 0,
    }

    projectPriorityStatus.forEach((priority) => {
        if (priority in priorityCounts) {
            priorityCounts[priority] += 1;
        }
    })


    return (
        <section className="project">
            <div className="project-container">

                <div className="project-top-container">
                    <div className="project-title-container">
                        <div className="project-icon-container">
                            <i className='bx bxs-bug' ></i>
                        </div>
                        <div className="project-title-content">
                            <div className="project-name">
                                <div className="project-name-left">Project Name:</div>
                                <div className="project-name-right">{project.title}</div>
                            </div>
                            <div className="project-manager">
                                <div className="project-manager-left">Manager Name:</div>
                                <div className="project-manager-right">{project.manager}</div>
                            </div>
                        </div>
                    </div>

                    <div className="project-status-content">
                        <div className="status-container">
                            <div className="status-header">Statuses</div>
                            {Object.entries(statusCounts).map(([status, count]) => (
                                <>
                                    <div className='status-left' key={status}>{status}: </div>
                                    <div className='status-right' key={status}>{count}</div>
                                </>
                            ))}
                        </div>
                        <div className="priority-container">
                            <div className="priority-header">Priorities</div>
                            {Object.entries(priorityCounts).map(([priority, count]) => (
                                <>
                                    <div className="priority-left">{priority}:</div>
                                    <div className="priority-right">{count}</div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="project-issues-content">
                    <Issues projectIssues={projectIssues} />
                </div>

                <div className="project-users-content">
                    <Users projectUsers={projectUsers} />
                </div>

            </div>
        </section>
    );
}

export default Project;
