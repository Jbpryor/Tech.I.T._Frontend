import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'users';

const userFullName = (user) => `${user.name.first} ${user.name.last}`;

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        modifyUser: (state, action) => {
            const updatedUser = action.payload;
            const index = state.findIndex((user) => user.id === updatedUser.id);
        
            if (index !== -1) {
                const newState = [...state];
                newState[index] = updatedUser;
                state = newState;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
            }
        },        
        changeUserRole: (state, action) => {
            const { selectedUser, selectedRole } = action.payload;
            const updatedRole = state.map((user) => user.id === selectedUser ? { ...user, role: selectedRole } : user);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRole));
            return updatedRole;
        },
        removeUser: (state, action) => {
            const userIdToDelete = action.payload;
            const updatedState = state.filter((user) => user.id !== userIdToDelete);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
            return updatedState;
        },
    },
});

export const selectAllUsers = (state) => state.users

export const { 
    addUser,
    modifyUser,
    changeUserRole,
    removeUser } = userSlice.actions

export default userSlice.reducer