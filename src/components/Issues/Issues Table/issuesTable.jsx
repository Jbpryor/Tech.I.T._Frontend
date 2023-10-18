import React from "react";
import { Link } from "react-router-dom";

function IssuesTable({ issue, theme, isIssuesActive }) {
    return (
        <tr className='issues-table-row' key={issue.id}>

            <td  className="issue-title"  style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >
                <Link className='issue-link' to={`/issues/${issue.id}`} key={issue.id}>{issue.title}</Link>
            </td>
            
            {isIssuesActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.type}</td>}
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.status}</td>
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.priority}</td>
            {isIssuesActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.project}</td>}
            {isIssuesActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.description}</td>}
            {isIssuesActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.developer}</td>}
            {isIssuesActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.submitter}</td>}
            {isIssuesActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{issue.created}</td>}

        </tr>
    )
}

export default IssuesTable;