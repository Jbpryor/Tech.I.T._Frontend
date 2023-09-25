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
    const issue = issues.find((issue) => issue.id.toString() === projectId)

    const projectIssues = issues.filter((issue) => issue.project === project.title)
    const developers = projectIssues.map((issue) => issue.developer)
    const projectUsers = users.filter((user) => developers.includes(`${user.name.first} ${user.name.last}`))

    return (
        <section className="project">
            <div className="project-container">

                <div className="project-top-container">
                    <div className="project-title-container">
                        <div className="project-icon">#</div>
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
                            <div className="status-left">
                                <div className="status-header-key">Statuses</div>
                                <div className="status-key-row">Open</div>
                                <div className="status-key-row">In Progress</div>
                                <div className="status-key-row">Under Review</div>
                                <div className="status-key-row">Resolved</div>
                                <div className="status-key-row">Postponed</div>
                                <div className="status-key-row">Closed</div>
                            </div>
                            <div className="status-right">
                                <div className="status-header-value">Status Qty</div>
                                <div className="status-value-row">0</div>
                                <div className="status-value-row">5</div>
                                <div className="status-value-row">3</div>
                                <div className="status-value-row">6</div>
                                <div className="status-value-row">33</div>
                                <div className="status-value-row">5</div>
                            </div>
                        </div>
                        <div className="priority-container">
                            <div className="priority-left">
                                <div className="priority-header-key">priorities</div>
                                <div className="priority-key-row">Critical</div>
                                <div className="priority-key-row">High</div>
                                <div className="priority-key-row">Medium</div>
                                <div className="priority-key-row">Low</div>
                            </div>
                            <div className="priority-right">
                                <div className="priority-header-value">Priority Qty</div>
                                <div className="priority-value-row">0</div>
                                <div className="priority-value-row">3</div>
                                <div className="priority-value-row">45</div>
                                <div className="priority-value-row">5</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project-issues-content">
                    <Issues projectIssues={projectIssues} />
                </div>

                <div className="project-users-content">
                    <Users projectUsers={projectUsers} />


                    {/* <div className="project-users-column-name">Name
                        <div className="project-users-row-name">Jason Pryor</div>
                    </div>
                    <div className="project-users-column-email">Email
                        <div className="project-users-row-email">bllaaa@gmail.com</div>
                    </div>
                    <div className="project-users-column-role">Role
                        <div className="project-users-row-role">Admin</div>
                    </div> */}
                </div>

            </div>
        </section>
    );
}

export default Project;

// need to add a status field that contains issues
// resolved to unresolved