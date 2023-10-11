import React from "react";
import { Link } from "react-router-dom";

function ReportsTable({ report, index, isReportsActive }) {
    return (
        <tr className='reports-table-row' key={report.id}>
            <td  className="report-type" >
                <Link className='report-link' to={`/reports/${report.id}`} key={report.id}>{report.type}</Link>
            </td>
            <td>{report.subject}</td>
            <td>{report.project}</td>
            {isReportsActive && <td>{report.description}</td>}
            {isReportsActive && <td>{report.submitter}</td>}
            {isReportsActive && <td>{report.created}</td>}
            {/* <td>
                <button className="delete" onClick={() => { onDelete(index)}}>Delete</button>
            </td> */}
        </tr>
    )
}

export default ReportsTable;