import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiSlice from "../../App/Api/apiSlice";

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await apiSlice.get('/projects');
  return response.data;
});

export const addNewProject = createAsyncThunk(
  "projects/addNewProject",
  async (projectData) => {
    const response = await apiSlice.post('/projects', projectData);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectUpdates) => {
    const response = await apiSlice.patch('/projects', projectUpdates);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    const response = await apiSlice.delete('/projects', { data: projectId });
    if (response?.status === 200) {
      const { _id } = projectId;
      const message = response.data.message;
      return { _id, message };
    }
  }
);

const initialState = {
  projects: [],
  status: "idle",
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = [...state.projects, action.payload];
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { updatedProject } = action.payload;

        if (!updatedProject._id) {
          console.log("Update could not complete");
          console.log(updatedProject);
          return state;
        }

        state.projects = state.projects.map((project) =>
          project._id === updatedProject._id ? { ...project, ...updatedProject } : project
        );
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const deletedProject = action.payload;
        if (!deletedProject._id) {
          console.log("Delete could not complete");
          console.log(deletedProject);
          return;
        }
        const { _id } = deletedProject;
        state.projects = state.projects.filter((project) => project._id !== _id);
      });
  },
});

export const selectAllProjects = (state) => state.projects.projects;
export const getProjectsStatus = (state) => state.projects.status;
export const getProjectsError = (state) => state.projects.error;

export const selectProjectById = (state, projectId) =>
  state.projects.projects.find((project) => project._id === projectId);

export default projectSlice.reducer;
