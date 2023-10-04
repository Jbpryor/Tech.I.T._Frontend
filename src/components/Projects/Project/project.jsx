import React, { PureComponent } from "react";
import './project.scss';
import Users from "../../Users/users";
import Issues from "../../Issues/issues";
import { useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



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

    const STATUSCOLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const statusPieChartData = [
        { name: 'Open', value: statusCounts['Open'] },
        { name: 'In Progress', value: statusCounts['In Progress'] },
        { name: 'Under Review', value: statusCounts['Under Review'] },
        { name: 'Resolved', value: statusCounts['Resolved'] },
        { name: 'Postponed', value: statusCounts['Postponed'] },
        { name: 'Closed', value: statusCounts['Closed'] },
    ];

    const PRIORITYCOLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const priorityPieChartData = [
        { name: 'Critical', value: priorityCounts['Critical'] },
        { name: 'High', value: priorityCounts['High'] },
        { name: 'Medium', value: priorityCounts['Medium'] },
        { name: 'Low', value: priorityCounts['Low'] },
    ];

    return (
        <section className="project">
            <div className="project-container">

                <div className="project-title-container">
                    <div className="project-icon-container">
                        <i className='bx bxs-bug' ></i>
                    </div>
                    <div className="project-name">
                        <div className="project-name-left">Project Name:</div>
                        <div className="project-name-right">{project.title}</div>
                    </div>
                    <div className="project-manager">
                        <div className="project-manager-left">Manager Name:</div>
                        <div className="project-manager-right">{project.manager}</div>
                    </div>
                    <div className="project-created">
                        <div className="project-date-left">Created:</div>
                        <div className="project-date-right">{project.created}</div>
                    </div>
                </div>

                <div className="project-status-content">

                    <div className="status-container">
                        <div className="status-header">Statuses</div>
                        <div className="status-content">

                            <div className="status-counts-container">
                            {Object.entries(statusCounts).map(([status, count]) => (
                                <div className="status-counts">
                                    <div className="status-left">{status}:</div>
                                    <div className="status-right">{count}</div>
                                </div>
                            ))}
                            </div>

                            <div className="status-pie">
                                <ResponsiveContainer height='100%'>
                                    <PieChart>
                                        <Pie
                                            data={statusPieChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {statusPieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={STATUSCOLORS[index % STATUSCOLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="priority-container">
                        <div className="priority-header">Priorities</div>
                        <div className="priority-content">

                            <div className="priority-counts-container">
                            {Object.entries(priorityCounts).map(([priority, count]) => (
                                <div className="priority-counts">
                                    <div className="priority-left">{priority}:</div>
                                    <div className="priority-right">{count}</div>
                                </div>
                            ))}
                            </div>

                            <div className="priority-pie">
                                <ResponsiveContainer height='100%'>
                                    <PieChart>
                                        <Pie
                                            data={priorityPieChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {priorityPieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={PRIORITYCOLORS[index % PRIORITYCOLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
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
