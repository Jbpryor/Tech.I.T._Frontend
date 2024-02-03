import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSlice from "../../App/Api/apiSlice";

export const login = createAsyncThunk(
  'auth', 
  async (credentials) => {
  const response = await apiSlice.post('/auth', credentials);
  return response.data;
});

export const sendLogout = createAsyncThunk(
  'logout', 
  async () => {
  const response = await apiSlice.post('/auth/logout');
  return response.data;
});

export const refresh = createAsyncThunk(
  'refresh', 
  async () => {
  const response = await apiSlice.get('/auth/refresh');
  return response.data;
});

export const resetPassword = createAsyncThunk(
  'resetPassword', 
  async (email) => {
  const response = await apiSlice.patch('/auth/resetPassword', email);
  return response.data;
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {token: null},
  reducers: {
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;