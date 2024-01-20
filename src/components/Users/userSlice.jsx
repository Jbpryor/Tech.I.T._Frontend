import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSlice from "../../App/Api/apiSlice";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await apiSlice.get('/users');
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (userInfo) => {
    const response = await apiSlice.post('/users', userInfo);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userUpdates) => {
    const response = await apiSlice.patch('/users', userUpdates);
    return response.data;
  }
);

export const viewImage = createAsyncThunk(
  "users/viewImage",
  async (userImage) => {
    const { userId, imageId } = userImage;

    const response = await apiSlice.get(
      `/users/${userId}/${imageId}`
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId) => {
      const response = await apiSlice.delete('/users', { data: userId });
      if (response?.status === 200) {
        const { id } = userId;
        const message = response.data.message;
        return { id, message };
    }
  }
);

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = [...state.users, action.payload];
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { updatedUser } = action.payload;

        if (!updatedUser._id) {
          console.log("Update could not complete");
          console.log(updatedUser);
          return state;
        }

        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? { ...user, ...updatedUser } : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUser = action.payload;
        if (!deletedUser.id) {
          console.log("Delete could not complete");
          console.log(deletedUser);
          return;
        }
        const { id } = deletedUser;
        state.users = state.users.filter((user) => user._id !== id);
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export default userSlice.reducer;
