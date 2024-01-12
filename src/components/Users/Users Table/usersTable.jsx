import { Link } from "react-router-dom";

function UsersTable({ user, theme }) {
    return (
        <tr className='users-table-row' key={user._id}>

            <td  className="user-name"  style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >
                <Link className='user-link' to={`/users/${user._id}`} key={user._id}>{user.name.first} {user.name.last}</Link>
            </td>
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{user.email}</td>
            <td style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`}} >{user.role}</td>

        </tr>
    )
}

export default UsersTable;