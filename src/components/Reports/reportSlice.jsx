import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSlice from "../../App/Api/apiSlice";

export const fetchReports = createAsyncThunk("reports/fetchReports", async () => {
  const response = await apiSlice.get('/reports');
  return response.data;
});

export const addNewReport = createAsyncThunk(
  "reports/addNewReport",
  async (reportData) => {
    const response = await apiSlice.post('/reports', reportData);
    return response.data;
  }
);

export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async (reportUpdates) => {
    const response = await apiSlice.patch('/reports', reportUpdates);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "reports/deleteComment",
  async (comment) => {
    const { reportId, commentId } = comment;

    const response = await apiSlice.delete(
      `/reports/${reportId}/comments/${commentId}`
    );
    return response.data;
  }
);

export const downloadAttachment = createAsyncThunk(
  "reports/downloadAttachment",
  async (attachment) => {
    const { reportId, fileId } = attachment;

    const response = await apiSlice.get(
      `/reports/${reportId}/attachments/${fileId}`
    );
    return response.data;
  }
);

export const deleteAttachment = createAsyncThunk(
  "reports/deleteAttachment",
  async (attachment) => {
    const { reportId, fileId } = attachment;

    const response = await apiSlice.delete(
      `reports/${reportId}/attachments/${fileId}`
    );
    return response.data;
  }
);

export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (reportId) => {
    const response = await apiSlice.delete('/reports', { data: reportId });
    if (response?.status === 200) {
      const { _id } = reportId;
      const message = response.data.message;
      return { _id, message };
    }
  }
);

const initialState = {
  reports: [],
  status: "idle",
  error: null,
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports = [...state.reports, action.payload];
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        const { updatedReport } = action.payload;

        if (!updatedReport._id) {
          console.log("Update could not complete");
          console.log(updatedReport);
          return state;
        }

        state.reports = state.reports.map((report) =>
          report._id === updatedReport._id ? { ...report, ...updatedReport } : report
        );
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { updatedReport } = action.payload;

        if (!updatedReport._id) {
          console.log("Update could not complete");
          console.log(updatedReport);
          return;
        }

        const reportIndex = state.reports.findIndex(
          (report) => report._id === updatedReport.id
        );
        if (reportIndex !== -1) {
          state.reports[reportIndex] = updatedReport.comments;
        }
      })
      .addCase(deleteAttachment.fulfilled, (state, action) => {
        const { updatedReport } = action.payload;

        if (!updatedReport._id) {
          console.log("Update could not complete");
          console.log(updatedReport);
          return;
        }

        const reportIndex = state.reports.findIndex(
          (report) => report._id === updatedReport.id
        );
        if (reportIndex !== -1) {
          state.reports[reportIndex] = updatedReport.attachments;
        }
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        const deletedReport = action.payload;
        if (!deletedReport._id) {
          console.log("Delete could not complete");
          console.log(deletedReport);
          return;
        }
        const { _id } = deletedReport;
        state.reports = state.reports.filter((report) => report._id !== _id);
      });
  },
});

export const selectAllReports = (state) => state.reports.reports;
export const getReportsStatus = (state) => state.reports.status;
export const getReportsError = (state) => state.reports.error;

export const selectReportById = (state, reportId) =>
  state.reports.reports.find((report) => report._id === reportId);

export default reportSlice.reducer;
