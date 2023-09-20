import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'users';

const userFullName = (user) => `${user.name.first} ${user.name.last}`;

const initialState = {
    users: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.users));
        },
        changeUserRole: (state, action) => {
            const { selectedUser, selectedRole } = action.payload;
            state.users = state.users.map((user) => userFullName(user) === selectedUser ? { ...user, role: selectedRole } : user);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.users));
        },
        removeUser: (state, action) => {
            const { selectedUser } = action.payload;
            state.users = state.users.filter((user) => userFullName(user) !== selectedUser);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.users));
        },
    },
});

export const { addUser, changeUserRole, removeUser } = userSlice.actions;

export default userSlice.reducer;