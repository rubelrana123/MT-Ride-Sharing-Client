 
import { baseApi } from "@/redux/baseApi";
import type {
  IResponse,
  IRiderUpdateStatus,
  IRidesParams,
  IUpdateProfile,
  IUser,
} from "@/types";
import type { get } from "http";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
      transformResponse: (response) => response.data,
    }),
    getAllUsers: builder.query<IResponse<IUser[]>, IRidesParams>({
      query: () => ({
        url: "/users/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    //   transformResponse: (response) => response.data,
    }),
    // getAllUsers: builder.query<IResponse<IUser[]>, IRidesParams>({
    //   query: ({
    //     page = 1,
    //     limit = 10,
    //     sortBy = "createdAt",
    //     sortOrder = "desc",
    //     searchTerm,
    //     fields,
    //   }) => {
    //     const params = new URLSearchParams();

    //     if (page) params.append("page", page.toString());
    //     if (limit) params.append("limit", limit.toString());
    //     if (sortBy) params.append("sortBy", sortBy);
    //     if (sortOrder) params.append("sortOrder", sortOrder);
    //     if (searchTerm) {
    //       params.append("searchTerm", searchTerm);
    //     }
    //     if (fields) {
    //       params.append("fields", fields);
    //     }

    //     return {
    //       url: "/users/all-users",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["USER"],
    // }),
    updateUserInfo: builder.mutation<IResponse<IUser>, IUpdateProfile>({
      query: ({ userId, userData }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["USER"],
    }),
    updateRiderStatus: builder.mutation<IResponse<IUser>, IRiderUpdateStatus>({
      query: (userData) => ({
        url: `/user/${userData.userId}/userStatus`,
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation<IResponse<null>, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetAllUsersQuery,
  useUpdateUserInfoMutation,
  useUpdateRiderStatusMutation,
  useDeleteUserMutation,
} = userApi;
