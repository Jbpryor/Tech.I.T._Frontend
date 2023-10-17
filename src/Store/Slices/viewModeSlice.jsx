import { createSlice } from '@reduxjs/toolkit';

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState: 'tile',
  reducers: {
    setViewMode: (state, action) => {
      return action.payload;
    },
    toggleViewMode: (state) => {
      return state === 'list' ? 'tile' : 'list';
    },
  },
});

export const { setViewMode, toggleViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;