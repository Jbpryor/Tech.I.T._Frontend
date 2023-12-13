import { createSlice } from '@reduxjs/toolkit';

export const LOCAL_STORAGE_KEY = 'viewMode';

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || 'tile';

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      const newState = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
    toggleViewMode: (state) => {
      const newState = state === 'list' ? 'tile' : 'list';
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    },
  },
});

export const { setViewMode, toggleViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;