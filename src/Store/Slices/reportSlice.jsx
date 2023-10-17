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
        modifyReport: (state, action) => {
            const updatedReport = action.payload;
            const index = state.findIndex((report) => report.id === updatedReport.id);
            if (index !== -1) {
                const date = new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const meridiem = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;

                const formattedDate =  `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${meridiem}`.trim();

                state[index] = {
                    ...updatedReport,
                    modified: formattedDate,
                };
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        },
        reportCommentS: (state, action) => {
            const { reportId, comment } = action.payload;
            const report = state.reports.find((report) => report.id === reportId);
            if (report) {
                if (!report.comments) {
                    report.comments = [];
                }
                report.comments.push(comment);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.reports));
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

export const { addReport, deleteReport, modifyReport, reportCommentS, reportAttachments } = reportSlice.actions;

export default reportSlice.reducer;



