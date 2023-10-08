import React from "react";

function UsersSort({ selectedSort, setSelectedSort, rotate, handleRotate }) {
    return (
        <div className="users-sort-container" value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)}>
            <select className='users-sort-select'>
                <option>Name</option>
                <option>Role</option>
                <option>Email</option>
            </select>
            <i className={`bx bx-down-arrow users-sort-icon ${rotate ? 'rotate' : ''}`} onClick={() => handleRotate()}></i>
        </div>
    )
}

export default UsersSort;