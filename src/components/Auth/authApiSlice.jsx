import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
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

const initialState = {
  token: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log('pending')
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('fulfilled')
        const { accessToken } = action.payload;
        state.token = accessToken;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected")
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendLogout.fulfilled, (state, action) => {
        state.token = null;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.token = accessToken;
      });
  },
});

export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;

export default authSlice.reducer;