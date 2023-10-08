import React from "react";

function IssuesSort({ selectedSort, setSelectedSort, rotate, handleRotate, isProjectsActive }) {
    return (
        <div className="issues-sort-container" value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)}>
            <select className='issues-sort-select'>
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