import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import './users.scss';
import 'boxicons/css/boxicons.min.css';
import UsersTable from "./Users Table/usersTable";
import TablePagination from "../../Charts & Tables/Table Pagination/tablePagination";
import { useSelector } from "react-redux";
import { sortByProperty } from "../../../Utils/utils";
import UsersSort from "./Users Sort/usersSort";
import { selectAllUsers } from "./userSlice";
import { selectViewMode } from "../Layout/viewModeSlice";
import { selectTheme } from "./User/Settings/settingsSlice";


function Users({ projectUsers }) {

    const viewMode = useSelector(selectViewMode);
    const location = useLocation();    
    const isUsersActive = location.pathname === '/users';
    const users = useSelector(selectAllUsers);
    const theme = useSelector(selectTheme);
    const isProjectsActive = /^\/projects\//.test(location.pathname);

    const filteredUsers = isProjectsActive ? projectUsers : users;

    const sortUsersByName = [...filteredUsers].sort(sortByProperty('name', null, false)).reverse();
    const sortUsersByRole = [...filteredUsers].sort(sortByProperty('role', null, false));
    const sortUsersByEmail = [...filteredUsers].sort(sortByProperty('email', null, false));

    const [ rotate, setRotate ] = useState(false);
    const [ selectedSort, setSelectedSort ] = useState('');

    const handleRotate = () => {
        setRotate(!rotate);
        setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
    }

    const [sortOrder, setSortOrder] = useState('descending');

    const getSortingFunction = () => {
        switch (selectedSort) {
            case 'Name':
                return sortOrder === 'descending' ? sortUsersByName : sortUsersByName.reverse();
            case 'Role':
                return sortOrder === 'descending' ? sortUsersByRole : sortUsersByRole.reverse();
            case 'Email':
                return sortOrder === 'descending' ? sortUsersByEmail : sortUsersByEmail.reverse();
            default:
                return sortOrder === 'descending' ? sortUsersByName : sortUsersByName.reverse();
        }
      };
      
      
    const sortedUsers = getSortingFunction();


    /* this is the break from grid into list table */


    const [ userRotate, setUserRotate ] = useState(false);
    const [ emailRotate, setEmailRotate ] = useState(false);
    const [ roleRotate, setRoleRotate ] = useState(false);
    const [ userColumnActive, setUserColumnActive ] = useState(false);
    const [ emailColumnActive, setEmailColumnActive ] = useState(false);
    const [ roleColumnActive, setRoleColumnActive ] = useState(false);

    const handleActiveColumn = (column) => {
        if (column === 'user') {
            setUserColumnActive(true);
            setEmailColumnActive(false);
            setRoleColumnActive(false);
            setUserRotate(!userRotate);
            setSelectedSort('Name');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
        }
        if (column === 'email') {
            setUserColumnActive(false);
            setEmailColumnActive(true);
            setRoleColumnActive(false);
            setEmailRotate(!emailRotate);
            setSelectedSort('Email');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')       
        }
        if (column === 'role') {
            setUserColumnActive(false);
            setEmailColumnActive(false);
            setRoleColumnActive(true);
            setRoleRotate(!roleRotate);
            setSelectedSort('Role');
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')     
        }
    };

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage < pageCount) {
            setCurrentPage(newPage);
        }
    };    

    const [ itemsPerPage, setItemsPerPage ] = useState(10);
    const pageCount = Math.ceil(sortedUsers.length / itemsPerPage);

    const slicedUsers = sortedUsers.map((user, index) => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        if (index >= firstPageIndex && index < lastPageIndex) {
            return user;
        }
        return null;
    }).filter(Boolean);

    return (
        <>
            {viewMode === 'list' ? (
                <section className="users users-list" style={{ color: theme.font_color }}>
                    <div className={`users-title ${!isUsersActive ? 'active' : ''}`}>Users</div>
                    <div className="users-container">

                        <div className="all-users-table-container" style={{ background: theme.primary_color, border: theme.background_color }} >
                            <div className="users-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th value='Name' className={`user-column ${userColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('user')}>User Name <i className={`bx bx-down-arrow ${userRotate ? 'rotate' : ''} ${userColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('user')} style={{ color: theme.font_color }} ></i></th>
                                            <th value='Email' className={`email-column ${emailColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('email')}>Email <i className={`bx bx-down-arrow ${emailRotate ? 'rotate' : ''} ${emailColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('email')} style={{ color: theme.font_color }} ></i></th>
                                            <th value='Role' className={`role-column ${roleColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('role')}>Role <i className={`bx bx-down-arrow ${roleRotate ? 'rotate' : ''} ${roleColumnActive ? 'active' : ''}`} onClick={() => handleActiveColumn('role')} style={{ color: theme.font_color }} ></i></th>
                                        </tr>
                                    </thead>
                                    <tbody className="users-table-body">
                                        {slicedUsers.map((user, index) => (
                                            <UsersTable user={user} key={index} index={index} theme={theme} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="users-table-pagination">
                                <TablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} onPageChange={handlePageChange} totalCount={sortedUsers.length} items={sortedUsers} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} pageCount={pageCount} />
                            </div>
                        </div>
        
                    </div>
                </section>
            ) : (
                <section className="users users-tile">  

                    <UsersSort selectedSort={selectedSort} setSelectedSort={setSelectedSort} rotate={rotate} handleRotate={handleRotate} theme={theme} />
                          
                    <div className={`users-container ${isUsersActive ? 'active' : ''}`}>                
                    {sortedUsers.map((user) => (
                        <Link className={`user-link ${isUsersActive ? 'active' : ''}`} to={`/users/${user._id}`} key={user._id} >
                            <div className='user-container' style={{ background: theme.primary_color, border: `1px solid ${theme.border}`, color: theme.font_color}} >       
                                <div className="user-name">{user.name.first} {user.name.last}</div>
                                <div className="user-contents">
                                    <div className="user-email">{user.email}</div>
                                    <div className="user-role">{user.role}</div>                           
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </section>
            )}
        </>
    )
}

export default Users;