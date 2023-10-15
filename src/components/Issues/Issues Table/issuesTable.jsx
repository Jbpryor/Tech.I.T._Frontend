import React from "react";
import { Link } from "react-router-dom";

function IssuesTable({ issue, index, isIssuesActive }) {
    return (
        <tr className='issues-table-row' key={issue.id}>

            <td  className="issue-title" >
                <Link className='issue-link' to={`/issues/${issue.id}`} key={issue.id}>{issue.title}</Link>
            </td>
            
            {isIssuesActive && <td>{issue.type}</td>}
            <td>{issue.status}</td>
            <td>{issue.priority}</td>
            {isIssuesActive && <td>{issue.project}</td>}
            {isIssuesActive && <td>{issue.description}</td>}
            {isIssuesActive && <td>{issue.developer}</td>}
            {isIssuesActive && <td>{issue.submitter}</td>}
            {isIssuesActive && <td>{issue.created}</td>}

        </tr>
    )
}

export default IssuesTable;