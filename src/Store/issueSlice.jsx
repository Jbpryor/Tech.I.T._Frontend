import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'issues';

const initialState = {
    issues: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
};

const issueSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        addIssue: (state, action) => {
            state.issues.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.issues));
        },
        deletIssue: (state, action) => {
            const issueIdToDelete = action.payload;
            state.issues = state.issues.filter((issue) => issue.id !== issueIdToDelete);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.issues));

        },
        modifyIssue: (state, action) => {
            const updatedIssue = action.payload;
            const index = state.issues.findIndex((issue) => issue.id === updatedIssue.id);
            if (index !== -1) {
                state.issues[index] = updatedIssue;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.issues));
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
