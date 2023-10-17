import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'projects';

// const initialData = [
//     {
//         id: 1,
//         title: 'The Manhattan Project',
//         description: 'A project that creates new ideas.'
//     },
//     {
//         id: 2,
//         title: 'Issue Tracker',
//         description: 'An app for tracking issues or bugs with applications.'
//     },
//     {
//         id: 3,
//         title: 'Project 3',
//         description: 'filling test space'
//     },
//     {
//         id: 4,
//         title: 'Project 4',
//         description: 'filling test space'
//     },
//     {
//         id: 5,
//         title: 'Project 5',
//         description: 'filling test space'
//     },
//     {
//         id: 6,
//         title: 'Project 6',
//         description: 'filling test space'
//     }
// ];

// localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        deletProject: (state, action) => {
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

export const { addProject, deletProject, modifyProject } = projectSlice.actions;

export default projectSlice.reducer;



