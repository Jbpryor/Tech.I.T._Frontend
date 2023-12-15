import { createSlice } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_KEY = 'settings';

const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {
    theme: 'light-mode',
    themes: {
      'light-mode': {
        primary_color: 'white',
        background_color: 'rgba(255, 255, 255, 0.966)',
        font_color: 'rgb(18, 18, 18)',
        outline: '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white',
        border: 'rgba(0, 0, 0, 0.143)',
      },
      'dark-mode': {
        primary_color: 'rgb(15, 15, 15)',
        background_color: 'rgb(28, 28, 28)',
        font_color: 'rgb(235, 235, 235)',
        outline: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black',
        border: 'rgba(255, 255, 255, 0.143)',
      },
    },
  };

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const selectCurrentTheme = (state) => state.settings.theme;

export const selectTheme = (state) => state.settings.themes[state.settings.theme];

export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
