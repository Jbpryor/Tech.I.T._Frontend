import React from "react";
import { Link } from "react-router-dom";

function UsersTable({ user, index, onDelete }) {
    return (
        <tr className='users-table-row' key={user.id}>
            <td  className="user-name" >
                <Link className='user-link' to={`/users/${user.id}`} key={user.id}>{user.name.first} {user.name.last}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            {/* <td>
                <button className="delete" onClick={() => { onDelete(index)}}>Delete</button>
            </td> */}
        </tr>
    )
}

export default UsersTable;