import { baseApi } from "@/redux/baseApi";

 
console.log(baseApi, "baseApi");
 

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
