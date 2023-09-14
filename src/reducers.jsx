import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    issueAdded: (state, action) => {
    },
    issueRemoved: (state, action) => {
    },
  },
});

export const { issueAdded, issueRemoved } = issuesSlice.actions;

export default issuesSlice.reducer;