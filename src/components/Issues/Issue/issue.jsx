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
  },
    {
    title: 'issue-6',
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
                    {Object.entries(issue).map(([key, value]) => (
                        key !== 'title' && (                  
                            <div className="issue-name" key={key}>
                                <div className="issue-left">{key}:</div>
                                <div className="issue-right">{value}</div>
                            </div>
                        )
                    ))}
                </div>
                <div className="issue-button">
                  <button>Comment +</button>
                </div>    
            </div>
        </section>
    )
}

export default Issue;