import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  issues: [],
};

const issuesSlice = createSlice({
  name: 'issues', 
  initialState,
  reducers: {
    addIssue: (state, action) => {
      state.issues= [...state.issues, ...action.payload];
    },
    removeIssue: (state, action) => {
      state.issues = state.issues.filter(issue => issue.id !== action.payload.id);
    },
  },
});

export const { addIssue, removeIssue } = issuesSlice.actions;
export default issuesSlice.reducer;