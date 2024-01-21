import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSlice from "../../App/Api/apiSlice";

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async () => {
  const response = await apiSlice.get('/issues');
  return response.data;
});

export const addNewIssue = createAsyncThunk(
  "issues/addNewIssue",
  async (issueData) => {
    const response = await apiSlice.post('/issues', issueData);
    return response.data;
  }
);

export const updateIssue = createAsyncThunk(
  "issues/updateIssue",
  async (issueUpdates) => {
    const response = await apiSlice.patch('/issues', issueUpdates);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "issues/deleteComment",
  async (comment) => {
    const { issueId, commentId } = comment;

    const response = await apiSlice.delete(
      `/issues/${issueId}/comments/${commentId}`
    );
    return response.data;
  }
);

export const downloadAttachment = createAsyncThunk(
  "issues/downloadAttachment",
  async (attachment) => {
    const { issueId, fileId } = attachment;

    const response = await apiSlice.get(
      `/issues/${issueId}/attachments/${fileId}`
    );
    return response.data;
  }
);

export const deleteAttachment = createAsyncThunk(
  "issues/deleteAttachment",
  async (attachment) => {
    const { issueId, fileId } = attachment;

    const response = await apiSlice.delete(
      `/issues/${issueId}/attachments/${fileId}`
    );
    return response.data;
  }
);

export const deleteIssue = createAsyncThunk(
  "issues/deleteIssue",
  async (issueId) => {
    const response = await apiSlice.delete('/issues', { data: issueId });
    if (response.status === 200) {
      const { message, _id } = response.data;
      return { _id, message };
    }
  }
);

const initialState = {
  issues: [],
  status: "idle",
  error: null,
};

const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewIssue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issues = [...state.issues, action.payload];
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        const { updatedIssue } = action.payload;

        if (!updatedIssue._id) {
          console.log("Update could not complete");
          console.log(updatedIssue);
          return state;
        }

        state.issues = state.issues.map((issue) =>
          issue._id === updatedIssue._id ? { ...issue, ...updatedIssue } : issue
        );
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { updatedIssue } = action.payload;

        if (!updatedIssue._id) {
          console.log("Update could not complete");
          console.log(updatedIssue);
          return;
        }

        const issueIndex = state.issues.findIndex(
          (issue) => issue._id === updatedIssue.id
        );
        if (issueIndex !== -1) {
          state.issues[issueIndex] = updatedIssue.comments;
        }
      })
      .addCase(deleteAttachment.fulfilled, (state, action) => {
        const { updatedIssue } = action.payload;

        if (!updatedIssue._id) {
          console.log("Update could not complete");
          console.log(updatedIssue);
          return;
        }

        const issueIndex = state.issues.findIndex(
          (issue) => issue._id === updatedIssue.id
        );
        if (issueIndex !== -1) {
          state.issues[issueIndex] = updatedIssue.attachments;
        }
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        const deletedIssue = action.payload;
        if (!deletedIssue._id) {
          console.log("Delete could not complete");
          console.log(deletedIssue);
          return;
        }
        state.issues = state.issues.filter((issue) => issue._id !== deletedIssue._id);
      });
  },
});

export const selectAllIssues = (state) => state.issues.issues;
export const getIssuesStatus = (state) => state.issues.status;
export const getIssuesError = (state) => state.issues.error;

export const selectIssueById = (state, issueId) =>
  state.issues.issues.find((issue) => issue?._id === issueId);

export default issueSlice.reducer;
