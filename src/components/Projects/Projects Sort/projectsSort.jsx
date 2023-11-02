import React from "react";
import useWindowSize from "../../../Hooks/useWindowSize";

function ProjectsSort({ selectedSort, setSelectedSort, rotate, handleRotate, theme }) {

    const { width } = useWindowSize();

    const smallerScreen = width < 500;
    
    return (
        <div className="projects-sort-container" value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)} style={{ background: theme.primary_color, color: theme.font_color, border: smallerScreen ? 'none' : (`1px solid ${theme.primary_color}`), borderBottom: `2px solid ${theme.border}` }} >

            <div className='projects-title'>Projects</div>

            <select className='projects-sort-select' style={{ color: theme.font_color, background: theme.primary_color }} >
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