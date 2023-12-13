import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'projects';

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        deleteProject: (state, action) => {
            const projectIdToDelete = action.payload;
            const updatedState = state.filter((project) => project.id !== projectIdToDelete);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
            return updatedState;
        },
        modifyProject: (state, action) => {
            const updatedProject = action.payload;
            const index = state.findIndex((project) => project.id === updatedProject.id);
            if (index !== -1) {
                const date = new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const meridiem = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;

                const formattedDate =  `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${meridiem}`.trim();

                state[index] = {
                    ...updatedProject,
                    modified: formattedDate,
                };
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
    },
});

export const selectAllProjects = (state) => state.projects

export const { addProject, deleteProject, modifyProject } = projectSlice.actions;

export default projectSlice.reducer;



