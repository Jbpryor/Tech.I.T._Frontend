import React from "react";

function ReportsSort({ selectedSort, setSelectedSort, rotate, handleRotate }) {
    return (
        <div className="reports-sort-container" value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)}>
            <select className='reports-sort-select'>
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