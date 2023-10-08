import React from "react";

function ProjectsSort({ selectedSort, setSelectedSort, rotate, handleRotate }) {
    return (
        <div className="projects-sort-container" value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)}>
            <select className='projects-sort-select'>
                <option>Backend</option>
                <option>Client Name</option>
                <option>Created</option>
                <option>Frontend</option>
                <option>Manager</option>
                <option>Title</option>
                <option>Type</option>
            </select>
            <i className={`bx bx-down-arrow projects-sort-icon ${rotate ? 'rotate' : ''}`} onClick={() => handleRotate()}></i>
        </div>
    )
}

export default ProjectsSort;