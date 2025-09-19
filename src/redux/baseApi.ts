import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

 
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // baseQuery : fetchBaseQuery({
  //   baseUrl : 'https://localhost:5000/api/v1',
  //   credentials : 'include',
  // }),
  tagTypes: ["USER", "DRIVER", "RIDE"],
  endpoints: ( ) => ({
 
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
 