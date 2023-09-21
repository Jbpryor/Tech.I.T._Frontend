import React from "react";
// import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import './users.scss';
import 'boxicons/css/boxicons.min.css';
import UsersTable from "./Users Table/usersTable";
import TablePagination from "./Table Pagination/tablePagination";
import { useDispatch, useSelector } from "react-redux";
import { addUser, changeUserRole, removeUser } from '../../Store/userSlice'


function Users() {

    const dispatch = useDispatch();

    // const LOCAL_STORAGE_KEY = 'users';

    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [perPage, setPerPage] = useState(10);

    const userFullName = (user) => `${user.name.first} ${user.name.last}`;

    // const columns = [
    //     {
    //         name: 'User Name',
    //         selector: (row) => row.name.first + ' ' + row.name.last,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Email',
    //         selector: (row) => row.email,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Role',
    //         selector: (row) => row.role,
    //         sortable: true
    //     }
    // ];

    const roles = [ 'Admin', 'Project Manager', 'Developer', 'Submitter' ];

    // const [ users, setUsers ] = useState(() => {
    //     const storedUsersData = localStorage.getItem(LOCAL_STORAGE_KEY);
    //     return storedUsersData ? JSON.parse(storedUsersData) : [];
    // });

    const users = useSelector((state) => state.users);

    const [ selectedUser, setSelectedUser ] = useState(null);
    const [ addUserInput, setAddUserInput ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        selectedRole: '',
    });

    const [ changeUserInput, setChangeUserInput ] = useState({
        selectedUser: '',
        selectedRole: '',
    });


    const handleAddUser = (event) => {
        event.preventDefault();

        if (
            addUserInput.firstName.trim() === '' ||
            addUserInput.lastName.trim() === '' ||
            addUserInput.email.trim() === '' ||
            addUserInput.selectedRole.trim() === ''
            ) {
            alert('Please fill in all required fields.');
            return;
            }

        const newUser = {
            name: {
                first: addUserInput.firstName,
                last: addUserInput.lastName,
            },
            email: addUserInput.email,
            role: addUserInput.selectedRole,
        };

        // const updatedUsers = [...users, newUser];
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
        // setUsers(updatedUsers);

        dispatch(addUser(newUser));

        setAddUserInput({
            firstName: '',
            lastName: '',
            email: '',
            selectedRole: '',
        });

        setIsAddFormActive(false);
    };

    

    const handleChangeUserRole = (event) => {
        event.preventDefault();

        const { selectedUser, selectedRole } = changeUserInput;
        if (
            !selectedUser.trim() || !selectedRole.trim()) {
            alert('Please fill in all required fields.');
            return;
            }

        const selectedUserName = event.target.value;
        const user = users.find((user) => userFullName(user) === selectedUserName);
        dispatch(changeUserRole({ selectedUser, selectedRole }));
        setSelectedUser(user);
        setChangeUserInput({
            selectedUser: '',
            selectedRole: '',
        })

        setIsChangeFormActive(false);
    };

    const [ isAddFormActive, setIsAddFormActive ] = useState(false);
    const [ isChangeFormActive, setIsChangeFormActive ] = useState(false);
    const [ isRemoveFormActive, setIsRemoveFormActive ] = useState(false);

    const handleShowAddForm = () => {
        setIsAddFormActive(true);
        setIsChangeFormActive(false);
        setIsRemoveFormActive(false);
    }
    
    const handleShowChangeForm = () => {
        setIsAddFormActive(false);
        setIsChangeFormActive(true);
        setIsRemoveFormActive(false);
    }



    const handleShowRemoveForm = () => {
        setIsAddFormActive(false);
        setIsChangeFormActive(false);
        setIsRemoveFormActive(true);
    }


    const [ removeUserInput, setRemoveUserInput ] = useState({
        selectedUser: '',
    });

    const handleRemoveUser = (event) => {
        event.preventDefault();
    
        // const updatedUsers = users.filter((user) => userFullName(user) !== userFullName(selectedUser));
    
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
        // setUsers(updatedUsers);

        dispatch(removeUser({ selectedUser: userFullName(selectedUser) }));

        setSelectedUser(null);
    
        setRemoveUserInput({
            selectedUser: '',
        });

        setIsRemoveFormActive(false)
    };

    const onDelete = (index) => {
        // const newData = users.slice(0, users.length)
        // newData.splice(index, 1)
        // setUsers(newData)

        const selectedUser = users[index];
        dispatch(removeUser({ selectedUser: userFullName(selectedUser) }));
    }

    const [ userRotate, setUserRotate ] = useState(false);
    const [ emailRotate, setEmailRotate ] = useState(false);
    const [ roleRotate, setRoleRotate ] = useState(false);
//   const [ isColumnActive, setIsColumnActive ] = useState(false);

    const handleRotate = (column) => {
    if (column === 'user') {
        setUserRotate(!userRotate);
    }
    if (column === 'email') {
        setEmailRotate(!emailRotate);
    }
    if (column === 'role') {
        setRoleRotate(!roleRotate);
    }
    }

    const [ userColumnActive, setUserColumnActive ] = useState(false);
    const [ emailColumnActive, setEmailColumnActive ] = useState(false);
    const [ roleColumnActive, setRoleColumnActive ] = useState(false);


    const handleActiveColumn = (column) => {
    if (column === 'user') {
        setUserColumnActive(true);
        setEmailColumnActive(false);
        setRoleColumnActive(false);
    }
    if (column === 'email') {
        setUserColumnActive(false);
        setEmailColumnActive(true);
        setRoleColumnActive(false);        
    }
    if (column === 'role') {
        setUserColumnActive(false);
        setEmailColumnActive(false);
        setRoleColumnActive(true);        
    }
    }

    const [ascending, setAscending] = useState(true);

    const handleSort = (key) => {
    const sortedUsers = [...users].sort((a, b) => {
        if (key === 'user') {
        const fullNameA = `${a.name.first} ${a.name.last}`.toLowerCase();
        const fullNameB = `${b.name.first} ${b.name.last}`.toLowerCase();
    
        if (fullNameA < fullNameB) return ascending ? -1 : 1;
        if (fullNameA > fullNameB) return ascending ? 1 : -1;
        return 0;
        } else {
        const valueA = a[key].toLowerCase();
        const valueB = b[key].toLowerCase();
    
        if (valueA < valueB) return ascending ? -1 : 1;
        if (valueA > valueB) return ascending ? 1 : -1;
        return 0;
        }
    });
    
    setUsers(sortedUsers);
    setAscending(!ascending);
    };

    const usersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0); 

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = currentPage * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToDisplay = users.slice(startIndex, endIndex);


    // useEffect(() => {
    //     fetchTableData()
    // }, [])

    // async function fetchTableData() {
    //     setLoading(true);
    //     const URL = 'https://jsonplaceholder.typicode.com/todos';
    //     try {
    //       const response = await fetch(URL);
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    //       const usersData = await response.json();
    //       setData(usersData);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }


    return (
        <section className="users">
            <div className="users-container">
                <div className="manage-users-content">
                    
                    <div className="add-users-container">
                        <div className="add-users-button-container">
                            <button className={`add-users-button ${isAddFormActive ? 'active' : ''}`} onClick={handleShowAddForm}>Add New User</button>
                        </div>
                        <form className={`add-users-form ${isAddFormActive ? 'active' : ''}`} onSubmit={handleAddUser}>
                            <div className="add-users-title">Add New User</div>
                            <input className='first' type="text" placeholder="First Name.." value={addUserInput.firstName} onChange={(event) => setAddUserInput({ ...addUserInput, firstName: event.target.value })} /> 
                            <input className='last' type="text" placeholder="Last Name.." value={addUserInput.lastName} onChange={(event) => setAddUserInput({ ...addUserInput, lastName: event.target.value })} /> 
                            <input className='email' type="email" placeholder='Email..' value={addUserInput.email} onChange={(event) => setAddUserInput({ ...addUserInput, email: event.target.value })} />
                            <select name="user-role" className="user-drop-down" value={addUserInput.selectedRole} onChange={(event) => setAddUserInput({ ...addUserInput, selectedRole: event.target.value })} >
                                {addUserInput.selectedRole ? (
                                    <>
                                        <option value={addUserInput.selectedRole}>{addUserInput.selectedRole}</option>
                                        {roles.filter((role) => role !== addUserInput.selectedRole).map((role, index) => (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </>                                
                                ) : (
                                    <>
                                        <option value="">Select a Role</option>
                                        {roles.map((role, index) => (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </>                                
                                )}                       
                            </select>
                            <button type='submit' className="add-user" >User +</button>
                        </form>
                    </div>

                    <div className="change-users-container">
                        <div className="change-users-button-container">
                            <button className={`change-users-button ${isChangeFormActive ? 'active' : ''}`} onClick={handleShowChangeForm}>Change User Role</button>
                        </div>
                        <form className={`change-user-form ${isChangeFormActive ? 'active' : ''}`} onSubmit={handleChangeUserRole}>
                            <div className="change-user-title">Change User Role</div>
                            <select className="user-selection" value={changeUserInput.selectedUser} onChange={(event) => {
                                setChangeUserInput({ ...changeUserInput, selectedUser: event.target.value });
                                setSelectedUser(users.find((user) => userFullName(user) === event.target.value));}}>
                                {changeUserInput.selectedUser ? (
                                    <>
                                        <option value={changeUserInput.selectedUser}>{changeUserInput.selectedUser}</option>
                                        {users.filter((user) => userFullName(user) !== changeUserInput.selectedUser).map((user, index) => (
                                            <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                                {user.name.first} {user.name.last}
                                            </option>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <option value="">Select a User</option>
                                        {users.map((user, index) => (
                                            <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                                {user.name.first} {user.name.last}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>

                            <div className={`user-role ${selectedUser ? '' : 'hidden'}`}>
                                <p className="user-current-role-left">
                                    Current Role: 
                                </p>
                                <div className="user-current-role-right">
                                    {selectedUser ? selectedUser.role : ''}
                                </div>
                            </div>

                            <select className="change-roll-drop-down" value={changeUserInput.selectedRole} onChange={(event) => setChangeUserInput({ ...changeUserInput, selectedRole: event.target.value })} >
                                {changeUserInput.selectedRole ? (
                                    <>
                                        <option value={changeUserInput.selectedRole}>{changeUserInput.selectedRole}</option>
                                        {roles.filter((role) => role !== changeUserInput.selectedRole).map((role, index) => (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </>                                
                                ) : (
                                    <>
                                        <option value="">Select a New Role</option>
                                        {roles.map((role, index) => (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </>                                
                                )}                       
                            </select>
                            <button className="user-submit">Submit</button>
                        </form>
                    </div>

                    <div className="remove-users-container">
                        <div className="remove-users-button-container">
                            <button className={`remove-users-button ${isRemoveFormActive ? 'active' : ''}`} onClick={handleShowRemoveForm}>Remove User</button>
                        </div>
                        <form className={`remove-user-form ${isRemoveFormActive ? 'active' : ''}`} onSubmit={handleRemoveUser}>
                            <div className="remove-user-title">Remove User</div>

                            <select className="remove-user-selection" value={removeUserInput.selectedUser} onChange={(event) => {
                                setRemoveUserInput({ ...removeUserInput, selectedUser: event.target.value });
                                setSelectedUser(users.find((user) => userFullName(user) === event.target.value));}}>
                                {removeUserInput.selectedUser ? (
                                    <>
                                        <option value={removeUserInput.selectedUser}>{removeUserInput.selectedUser}</option>
                                        {users.filter((user) => userFullName(user) !== removeUserInput.selectedUser).map((user, index) => (
                                            <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                                {user.name.first} {user.name.last}
                                            </option>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <option value="">Select a User</option>
                                        {users.map((user, index) => (
                                            <option key={index} value={`${user.name.first} ${user.name.last}`}>
                                                {user.name.first} {user.name.last}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                            <button className="remove-user-button">Remove</button>
                        </form>
                    </div>

                </div>
                {/* <div className="all-users-table-container">
                    <DataTable 
                        title='Users'
                        columns={columns}
                        data={users}
                        dense
                        pagination
                    />
                </div> */}



                <div className="all-users-table-container">
                    <div className="users-table-title">Users</div>
                    <div className="users-table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th className={`user-column ${userColumnActive ? 'active' : ''}`} onClick={() => { handleRotate('user'); handleActiveColumn('user'); handleSort('user') }}>User Name <i className={`bx bx-down-arrow ${userRotate ? 'rotate' : ''} ${userColumnActive ? 'active' : ''}`} onClick={() => { handleRotate('user'); handleActiveColumn('user'); handleSort('user') }}></i></th>
                                    <th className={`email-column ${emailColumnActive ? 'active' : ''}`} onClick={() => { handleRotate('email'); handleActiveColumn('email'); handleSort('email') }}>Email <i className={`bx bx-down-arrow ${emailRotate ? 'rotate' : ''} ${emailColumnActive ? 'active' : ''}`} onClick={() => { handleRotate('email'); handleActiveColumn('email'); handleSort('email') }}></i></th>
                                    <th className={`role-column ${roleColumnActive ? 'active' : ''}`} onClick={() => { handleRotate('role'); handleActiveColumn('role'); handleSort('role') }}>Role <i className={`bx bx-down-arrow ${roleRotate ? 'rotate' : ''} ${roleColumnActive ? 'active' : ''}`} onClick={() => { handleRotate('role'); handleActiveColumn('role'); handleSort('role') }}></i></th>
                                </tr>
                            </thead>
                            <tbody className="users-table-body">
                                {usersToDisplay.map((user, index) => (
                                    <UsersTable user={user} key={index} index={index} onDelete={onDelete}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="users-table-pagination">
                        <TablePagination currentPage={currentPage} pageCount={Math.ceil(users.length / usersPerPage)} onPageChange={handlePageChange} />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Users;