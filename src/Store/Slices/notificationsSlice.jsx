// notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    newNotificationsCount: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({ ...action.payload, isNew: true });
      state.newNotificationsCount += 1;
    },
    markNotificationsAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.isNew = false;
      });
      state.newNotificationsCount = 0;
    },
  },
});

export const { addNotification, markNotificationsAsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
