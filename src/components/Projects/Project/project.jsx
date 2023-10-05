import React, { PureComponent } from "react";
import './project.scss';
import Users from "../../Users/users";
import Issues from "../../Issues/issues";
import { useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';



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

    const statusData = [
        { name: 'Open', count: statusCounts['Open'], color: '#0088FE' },
        { name: 'In Progress', count: statusCounts['In Progress'], color: '#00C49F' },
        { name: 'Under Review', count: statusCounts['Under Review'], color: '#FFBB28' },
        { name: 'Resolved', count: statusCounts['Resolved'], color: '#FF8042' },
        { name: 'Postponed', count: statusCounts['Postponed'], color: '#FF6B6B' },
        { name: 'Closed', count: statusCounts['Closed'], color: '#AFB42B' },
    ];

    const priorityData = [
        { name: 'Critical', count: priorityCounts['Critical'], color: '#0088FE' },
        { name: 'High', count: priorityCounts['High'], color: '#00C49F' },
        { name: 'Medium', count: priorityCounts['Medium'], color: '#FFBB28' },
        { name: 'Low', count: priorityCounts['Low'], color: '#FF8042' },
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
                            {statusData.map((status) => (
                                <div className="status-counts" key={status.name}>
                                    <div className="status-left"><div className="status-dot" style={{ backgroundColor: status.color }} />{status.name}:</div>
                                    <div className="status-right">{status.count}</div>
                                </div>
                            ))}
                            </div>

                            <div className="status-pie">
                                <ResponsiveContainer height='100%'>
                                    <PieChart>
                                        <Tooltip 
                                        contentStyle={{background:"white", borderRadius:'2px'}}
                                        />
                                        <Pie
                                            data={statusData}
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="count"
                                        >
                                            {statusData.map((status) => (
                                                <Cell key={status.name} fill={status.color} />
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
                            {priorityData.map((priority) => (
                                <div className="priority-counts" key={priority.name}>                                    
                                    <div className="priority-left"><div className="priority-dot" style={{ backgroundColor: priority.color }} />{priority.name}:</div>
                                    <div className="priority-right">{priority.count}</div>
                                </div>
                            ))}
                            </div>

                            <div className="priority-pie">
                                <ResponsiveContainer height='100%'>
                                    <PieChart>
                                        <Tooltip 
                                        contentStyle={{background:'white', borderRadius:'2px'}}
                                        />
                                        <Pie
                                            data={priorityData}
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="count"
                                        >
                                            {priorityData.map((priority) => (
                                                <Cell key={priority.name} fill={priority.color} />
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
