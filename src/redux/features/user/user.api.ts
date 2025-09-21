 
import { baseApi } from "@/redux/baseApi";
import type {
  IResponse,
  IRiderUpdateStatus,
  IRidesParams,
  IUpdateProfile,
  IUser,
} from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
      transformResponse: (response) => response.data,
    }),
    // getAllUsers: builder.query<IResponse<IUser[]>, IRidesParams>({
    //   query: () => ({
    //     url: "/users/all-users",
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    // //   transformResponse: (response) => response.data,
    // }),
getAllUsers: builder.query<IResponse<IUser[]>, IRidesParams>({
  query: ({ page, limit, sort, searchTerm, fields }) => {
    const params = new URLSearchParams();
    if (sort) params.append("sort", sort.toString());
    if (fields) params.append("fields", fields); // 👈 backend wants comma separated, not space separated
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString()); // optional if backend supports
    if (searchTerm) params.append("searchTerm", searchTerm);

    return {
      url: "/users/all-users",
      method: "GET",
      params,
    };
  },
  providesTags: ["USER"],
}),

    getUserById: builder.query<IResponse<IUser>, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateUserInfo: builder.mutation<IResponse<IUser>, IUpdateProfile>({
      query: ({ userId, userData }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["USER"],
    }),
    updateRiderStatus: builder.mutation<IResponse<IUser>, IRiderUpdateStatus>({
      query: (userData) => ({
        url: `/users/${userData.userId}/userStatus`,
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation<IResponse<null>, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
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
  useGetUserByIdQuery
} = userApi;
