// import { createSlice } from "@reduxjs/toolkit";

// export const LOCAL_STORAGE_KEY = 'projects';

// const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

// const projectSlice = createSlice({
//     name: 'projects',
//     initialState,
//     reducers: {
//         addProject: (state, action) => {
//             state.push(action.payload);
//             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
//         },
//         deleteProject: (state, action) => {
//             const projectIdToDelete = action.payload;
//             const updatedState = state.filter((project) => project.id !== projectIdToDelete);
//             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
//             return updatedState;
//         },
//         modifyProject: (state, action) => {
//             const updatedProject = action.payload;
//             const index = state.findIndex((project) => project.id === updatedProject.id);
//             if (index !== -1) {
//                 const date = new Date();
//                 const hours = date.getHours();
//                 const minutes = date.getMinutes();
//                 const meridiem = hours >= 12 ? 'PM' : 'AM';
//                 const formattedHours = hours % 12 || 12;

//                 const formattedDate =  `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${meridiem}`.trim();

//                 state[index] = {
//                     ...updatedProject,
//                     modified: formattedDate,
//                 };
//                 localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
//             }
//         },
//     },
// });

// export const selectAllProjects = (state) => state.projects

// export const { addProject, deleteProject, modifyProject } = projectSlice.actions;

// export default projectSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECTS_URL = "http://localhost:3500/projects";

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await axios.get(PROJECTS_URL);
  return response.data;
});

export const addNewProject = createAsyncThunk(
  "projects/addNewProject",
  async (projectData) => {
    const response = await axios.post(PROJECTS_URL, projectData);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectUpdates) => {
    const response = await axios.patch(PROJECTS_URL, projectUpdates);
    return response.data;
  }
);

// export const updateProject = createAsyncThunk(
//   "projects/updateProject",
//   async (projectUpdates) => {
//     try {
//       const response = await axios.patch(PROJECTS_URL, projectUpdates);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating project:", error);
//       throw error;
//     }
//   }
// );

// export const deleteComment = createAsyncThunk(
//   "projects/deleteComment",
//   async (comment) => {
//     const { projectId, commentId } = comment;

//     const response = await axios.delete(
//       `${PROJECTS_URL}/${projectId}/comments/${commentId}`
//     );
//     return response.data;
//   }
// );

// export const downloadAttachment = createAsyncThunk(
//   "projects/downloadAttachment",
//   async (attachment) => {
//     const { projectId, fileId } = attachment;

//     const response = await axios.get(
//       `${PROJECTS_URL}/${projectId}/attachments/${fileId}`
//     );
//     return response.data;
//   }
// );

// export const deleteAttachment = createAsyncThunk(
//   "projects/deleteAttachment",
//   async (attachment) => {
//     const { projectId, fileId } = attachment;

//     const response = await axios.delete(
//       `${PROJECTS_URL}/${projectId}/attachments/${fileId}`
//     );
//     return response.data;
//   }
// );

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    const response = await axios.delete(PROJECTS_URL, { data: projectId });
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
    //   .addCase(deleteComment.fulfilled, (state, action) => {
    //     const { updatedProject } = action.payload;

    //     if (!updatedProject._id) {
    //       console.log("Update could not complete");
    //       console.log(updatedProject);
    //       return;
    //     }

    //     const projectIndex = state.projects.findIndex(
    //       (project) => project._id === updatedProject.id
    //     );
    //     if (projectIndex !== -1) {
    //       state.projects[projectIndex] = updatedProject.comments;
    //     }
    //   })
    //   .addCase(deleteAttachment.fulfilled, (state, action) => {
    //     const { updatedProject } = action.payload;

    //     if (!updatedProject._id) {
    //       console.log("Update could not complete");
    //       console.log(updatedProject);
    //       return;
    //     }

    //     const projectIndex = state.projects.findIndex(
    //       (project) => project._id === updatedProject.id
    //     );
    //     if (projectIndex !== -1) {
    //       state.projects[projectIndex] = updatedProject.attachments;
    //     }
    //   })
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
