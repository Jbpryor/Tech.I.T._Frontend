import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'issues';

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const issueSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        addIssue: (state, action) => {
            state.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        deletIssue: (state, action) => {
            const issueIdToDelete = action.payload;
            const updatedState = state.filter((issue) => issue.id !== issueIdToDelete);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
            return updatedState;
        },
        modifyIssue: (state, action) => {
            const updatedIssue = action.payload;
            const index = state.findIndex((issue) => issue.id === updatedIssue.id);
            if (index !== -1) {
                const date = new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const meridiem = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;

                const formattedDate =  `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${meridiem}`.trim();

                state[index] = {
                    ...updatedIssue,
                    modified: formattedDate,
                };
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        issueCommentS: (state, action) => {
            const { issueId, comment } = action.payload;
            const issue = state.issues.find((issue) => issue.id === issueId);
            if (issue) {
                if (!issue.comments) {
                    issue.comments = [];
                }
                issue.comments.push(comment);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.issues));
            }
        },
        issueAttachments: (state, action) => {
            const { issueId, file } = action.payload;
            const issue = state.issues.find((issue) => issue.id === issueId);
            if (issue) {
                if (!issue.files) {
                    issue.files = [];
                }
                issue.files.push(file);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.issues));
            }
         }
    },
});

export const { addIssue, deletIssue, modifyIssue, issueCommentS, issueAttachments } = issueSlice.actions;

export default issueSlice.reducer;



