import React from "react";
import './issue.scss';

export const issues = [
    {
    title: 'issue-1',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    title: 'issue-2',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    title: 'issue-3',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    title: 'issue-4',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  },
    {
    title: 'issue-5',
    developer: "John",
    project: "Project A",
    status: "In Progress",
    created: "2023-08-29",
    description: "Lorem ipsum...",
    submitter: "Alice",
    priority: "High",
    type: "Bug",
    updated: "2023-08-30",
  }
];


function Issue({ issue }) {
    return (
        <section className="issue">
            <div className="issue-container">
                <div className="issue-title">{issue.title}</div>
                <div className="issue-contents">                
                    <div className="issue-developer">{issue.developer}</div>
                    <div className="issue-project">{issue.project}</div>
                    <div className="issue-status">{issue.status}</div>
                    <div className="issue-created">{issue.created}</div>
                    <div className="issue-description">{issue.description}</div>
                    <div className="issue-submitter">{issue.submitter}</div>
                    <div className="issue-priority">{issue.priority}</div>
                    <div className="issue-type">{issue.type}</div>
                    <div className="issue-updated">{issue.updated}</div>
                </div>
            </div>
        </section>
    )
}

export default Issue;