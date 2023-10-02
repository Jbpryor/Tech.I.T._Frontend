import { createSlice } from "@reduxjs/toolkit";
import { formatTimestamp } from "../main";

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
        deleteIssue: (state, action) => {
            const issueIdToDelete = action.payload;
            const updatedState = state.filter((issue) => issue.id !== issueIdToDelete);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
            return updatedState;
        },
        modifyIssue: (state, action) => {
            const updatedIssue = action.payload;
            const index = state.findIndex((issue) => issue.id === updatedIssue.id);
            if (index !== -1) {
                const formattedDate = formatTimestamp(new Date());

                state[index] = {
                    ...updatedIssue,
                    modified: formattedDate,
                };
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        addModifications: (state, action) => {
            const { issueId, modifications } = action.payload;
            const index = state.findIndex((issue) => issue.id === issueId);
            if (index !== -1) {
                if (!state[index].modifications) {
                    state[index].modifications = [];
                }
                state[index].modifications.push(modifications);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        issueComments: (state, action) => {
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

export const { addIssue, deleteIssue, modifyIssue, addModifications, issueCommentS, issueAttachments } = issueSlice.actions;

export default issueSlice.reducer;



