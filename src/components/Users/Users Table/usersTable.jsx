import React from "react";

function UsersTable({ user, index, onDelete }) {
    return (
        <tr className='users-table-row' key={user.id}>
            <td  className="user-name">{user.name.first} {user.name.last}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <button className="delete" onClick={() => { onDelete(index)}}>Delete</button>
            </td>
        </tr>
    )
}

export default UsersTable;