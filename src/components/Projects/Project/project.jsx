import React from "react";
import './project.scss';
import User from '../../Users/User/user'


function Project() {

    return (
        <section className="project">
            <div className="project-container">

                <div className="project-title-container">
                    <div className="project-icon">#</div>
                    <div className="project-title-content">
                        <div className="project-name">
                            <div className="project-name-left">Project Name:</div>
                            <div className="project-name-right">Issue Tracker</div>
                        </div>
                        <div className="project-manager">
                            <div className="project-manager-left">Manager Name:</div>
                            <div className="project-manager-right">John Duh</div>
                        </div>
                    </div>
                </div>

                <div className="project-status-content">
                    <div className="status-container">
                        <div className="status-left">
                            <div className="status-header-key">Statuses</div>
                            <div className="status-key-row">In Process</div>
                            <div className="status-key-row">Not Started</div>
                            <div className="status-key-row">Closed</div>
                        </div>
                        <div className="status-right">
                            <div className="status-header-value">Status Qty</div>
                            <div className="status-value-row">0</div>
                            <div className="status-value-row">5</div>
                            <div className="status-value-row">3</div>
                        </div>
                    </div>
                </div>

                <div className="project-issues-content">
                    <div className="project-issues-column-id">Id
                        <div className="project-issues-row-id">Issue-8</div>
                    </div>
                    <div className="project-issues-column-title">Title
                        <div className="project-issues-row-title"></div>
                    </div>
                    <div className="project-issues-column-type">Type
                        <div className="project-issues-row-type">User Table Sorting</div>
                    </div>
                    <div className="project-issues-column-status">Status
                        <div className="project-issues-row-status">Open</div>
                    </div>
                    <div className="project-issues-column-priority">Priority
                        <div className="project-issues-row=priority">Low</div>
                    </div>
                </div>

                <div className="project-users-content">
                    <div className="project-users-column-name">Name
                        <div className="project-users-row-name">Jason Pryor</div>
                    </div>
                    <div className="project-users-column-email">Email
                        <div className="project-users-row-email">bllaaa@gmail.com</div>
                    </div>
                    <div className="project-users-column-role">Role
                        <div className="project-users-row-role">Admin</div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Project;

// need to add a status field that contains issues
// resolved to unresolved