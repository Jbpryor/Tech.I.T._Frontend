// import { createApi } from '@reduxjs/toolkit/query'
// import axios from 'axios'
// import { selectCurrentToken, setCredentials } from '../../components/Auth/authSlice'

// const baseQuery = axios.create({
//     baseURL: 'http://localhost:3500',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// })

// baseQuery.interceptors.request.use((config) => {
//     const token = selectCurrentToken;

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     // console.log(args) // request url, method, body
//     // console.log(api) // signal, dispatch, getState()
//     // console.log(extraOptions) // custom like {shout: true}

//     let result = await baseQuery(args, api, extraOptions)

//     // if you want, handle other status codes, too
//     if (result?.error?.status === 403) {
//         console.log('sending refresh token')

//         // send refresh token to get new access token
//         const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

//         if (refreshResult?.data) {

//             // store the new token
//             api.dispatch(setCredentials({ ...refreshResult.data }))

//             //retry original query with new access token
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             if (refreshResult?.error?.status === 403) {
//                 refreshResult.error.data.message = "Your login has expired. "
//             }
//             return refreshResult
//         }
//     }
//     return result
// }

// export const apiSlice = createApi({
//     baseQuery: baseQueryWithReauth,
//     tagTypes: ['User', 'Issue', 'Report', 'Project'],
//     endpoints: builder => ({})
// })

import axios from "axios";
import { selectCurrentToken } from "../../components/Auth/authSlice";
import store from "../store";

const apiSlice = axios.create({
  baseURL: "http://localhost:3500",
  withCredentials: true,
});

apiSlice.interceptors.request.use(async (config) => {
  const token = selectCurrentToken(store.getState());

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default apiSlice;
