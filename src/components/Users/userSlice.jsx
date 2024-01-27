import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSlice from "../../App/Api/apiSlice";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await apiSlice.get('/users');
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "addNewUser",
  async (userInfo) => {
    const response = await apiSlice.post('/users', userInfo);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (userUpdates) => {
    const response = await apiSlice.patch('/users', userUpdates);
    return response.data;
  }
);

export const viewImage = createAsyncThunk(
  "viewImage",
  async (userImage) => {
    const { userId, imageId } = userImage;

    const response = await apiSlice.get(
      `/users/${userId}/${imageId}`
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (userId) => {
      const response = await apiSlice.delete('/users', { data: userId });
      if (response?.status === 200) {
        const { _id } = userId;
        const message = response.data.message;
        return { _id, message };
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
        if (!deletedUser._id) {
          console.log("Delete could not complete");
          console.log(deletedUser);
          return;
        }
        const { _id } = deletedUser;
        state.users = state.users.filter((user) => user._id !== _id);
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user?._id === userId);

export default userSlice.reducer;
