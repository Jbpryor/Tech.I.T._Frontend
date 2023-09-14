import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import './users.scss';
import 'boxicons/css/boxicons.min.css';


function Users() {

    const LOCAL_STORAGE_KEY = 'users';


    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [perPage, setPerPage] = useState(10);

    const userFullName = (user) => `${user.name.first} ${user.name.last}`;

    const columns = [
        {
            name: 'User Name',
            selector: (row) => row.name.first + ' ' + row.name.last,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: (row) => row.role,
            sortable: true
        }
    ];

    const roles = [ 'Admin', 'Project Manager', 'Developer', 'Submitter' ];

    const [ users, setUsers ] = useState(() => {
        const storedUsersData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedUsersData ? JSON.parse(storedUsersData) : [];
    });

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

        const updatedUsers = [...users, newUser];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
        setUsers(updatedUsers);

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
    
        const updatedUsers = users.filter((user) => userFullName(user) !== userFullName(selectedUser));
    
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setSelectedUser(null);
    
        setRemoveUserInput({
            selectedUser: '',
        });
    };



    

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
                <div className="all-users-table-container">
                    <DataTable 
                        title='Users'
                        columns={columns}
                        data={users}
                        dense
                        pagination
                    />
                </div>
            </div>
        </section>
    )
}

export default Users;