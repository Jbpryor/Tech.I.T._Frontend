import { createSlice } from "@reduxjs/toolkit";
import { formatTimestamp } from "../../main";

export const LOCAL_STORAGE_KEY = "notifications";

const initialState = {
  notifications: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
  newNotificationsCount: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({ ...action.payload, isNew: true });
      state.newNotificationsCount += 1;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.notifications));
    },
    markNotificationsAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.isNew = false;
      });
      state.newNotificationsCount = 0;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.notifications));
    },
  },
});

export const {
  addNotification,
  markNotificationsAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
