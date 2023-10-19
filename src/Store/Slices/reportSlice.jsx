import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'reports';

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        addReport: (state, action) => {
            state.push(action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        deleteReport: (state, action) => {
            const reportIdToDelete = action.payload;
            const updatedState = state.filter((report) => report.id !== reportIdToDelete);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
            return updatedState;
        },
        addComment: (state, action) => {
            const { reportId, comments} = action.payload;
            const index = state.findIndex((report) => report.id === reportId);
            if (index !== -1) {
                if (!state[index].comments) {
                    state[index].comments = [];
                }
                state[index].comments.push(comments);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        deleteComment: (state, action) => {
            const { reportId, commentIndex} = action.payload;
            const index = state.findIndex((report) => report.id === reportId);

            if (index !== -1) {
                const updatedComments = [...state[index].comments];
                updatedComments.splice(commentIndex, 1);
                state[index].comments = updatedComments;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        reportAttachments: (state, action) => {
            const { reportId, file } = action.payload;
            const report = state.reports.find((report) => report.id === reportId);
            if (report) {
                if (!report.files) {
                    report.files = [];
                }
                report.files.push(file);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.reports));
            }
         }
    },
});

export const { addReport, deleteReport, addComment, deleteComment, reportAttachments } = reportSlice.actions;

export default reportSlice.reducer;



