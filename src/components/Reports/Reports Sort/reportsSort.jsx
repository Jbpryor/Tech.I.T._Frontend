import React from "react";
import useWindowSize from "../../../Hooks/useWindowSize";

function ReportsSort({ selectedSort, setSelectedSort, rotate, handleRotate, theme }) {

    const { width } = useWindowSize();

    const smallerScreen = width < 500;

    return (
        <div className="reports-sort-container" value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)} style={{ background: theme.primary_color, color: theme.font_color, border: smallerScreen ? 'none' : (`1px solid ${theme.primary_color}`), borderBottom: `2px solid ${theme.border}` }} >

            <div className='reports-title'>Reports</div>        

            <select className='reports-sort-select' style={{ color: theme.font_color, background: theme.primary_color }} >
                <option>Created</option>
                <option>Project</option>
                <option>Submitter</option>
                <option>Type</option>
            </select>

            <i className={`bx bx-down-arrow reports-sort-icon ${rotate ? 'rotate' : ''}`} onClick={() => handleRotate()}></i>
            
        </div>
    )
}

export default ReportsSort;