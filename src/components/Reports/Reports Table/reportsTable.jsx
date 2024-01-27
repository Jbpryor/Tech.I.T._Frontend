import { Link } from "react-router-dom";

function ReportsTable({ report, theme, isReportsActive }) {
    return (

        <tr className='reports-table-row' key={report._id}>
            <td  className="report-type" style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >
                <Link className='report-link' to={`/reports/${report._id}`} key={report._id}>{report.type}</Link>
            </td>
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{report.subject}</td>
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{report.project}</td>
            {isReportsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{report.description}</td>}
            {isReportsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{report.submitter}</td>}
            {isReportsActive && <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{report.created}</td>}
        </tr>
        
    )
}

export default ReportsTable;