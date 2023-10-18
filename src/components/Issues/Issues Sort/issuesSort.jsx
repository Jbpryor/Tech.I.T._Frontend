import React from "react";

function IssuesSort({ selectedSort, setSelectedSort, rotate, handleRotate, isProjectsActive, theme }) {
    return (
        <div className="issues-sort-container" value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)} style={{ background: theme.primary_color, color: theme.font_color, border: `1px solid ${theme.primary_color}`, borderBottom: `2px solid ${theme.border}` }} >

            <div className='issues-title' >Issues</div>

            <select className='issues-sort-select' style={{ color: theme.font_color, background: theme.primary_color }} >
                <option>Created</option>
                <option>Developer</option>
                <option>Priority</option>
                <option className={`project-select ${isProjectsActive ? 'active' : ''}`}>Project</option>
                <option>Status</option>
                <option>Submitter</option>
                <option>Title</option>
                <option>Type</option>
            </select>

            <i className={`bx bx-down-arrow issues-sort-icon ${rotate ? 'rotate' : ''}`} onClick={() => handleRotate()}></i>
            
        </div>
    )
}

export default IssuesSort;