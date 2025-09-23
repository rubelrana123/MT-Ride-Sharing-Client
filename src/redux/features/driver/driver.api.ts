import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IDriverProfile, IDriverStats } from "@/types/driver.type";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Driver: Get driver analytics`
        getDriverAnalytics: builder.query<IDriverStats, undefined>({
      query: () => ({
        url: "/analytics/driverStats",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
      transformResponse: (response: { data: IDriverStats }) => response.data,
    }),
    // Driver: Get driver profile
     getDriverProfile: builder.query<IDriverProfile, undefined>({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
      providesTags: ["USER", "DRIVER"],
      transformResponse: (response: { data: IDriverProfile }) => response.data,
    }),
    // Rider applies as driver
    applyDriver: builder.mutation({
      query: (driverData) => ({
        url: "/drivers/apply-driver",
        method: "POST",
        data: driverData,
      }),
      invalidatesTags: ["DRIVER"],
      transformResponse: (response: { data: any }) => response.data,
    }),
 //
    // Admin / Super Admin: List driver applications
    getDriverApplications: builder.query({
      query: () => ({
        url: "/drivers/driver-application",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
      transformResponse: (response) => {
        console.log(response, "driver applications response");
        return response.data;
      },
    }),

    // Admin / Super Admin: List approved drivers
    getDrivers: builder.query({
      query: () => ({
        url: "/drivers/driver",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
      transformResponse: (response) => response.data,
    }),
  
    // Admin / Super Admin: Update application status
    updateDriverStatus: builder.mutation({
      query: ({ id, driverStatus }) => ({
        url: `/drivers/driver-application/${id}/status`,
        method: "PATCH",
        data: { driverStatus },
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // Driver: Update availability
    updateAvailability: builder.mutation({
      query: ({ driverId, availability }) => ({
        url: `/drivers/${driverId}/availability`,
        method: "PATCH",
        data: { availability },
      }),
      invalidatesTags: ["DRIVER"],
    }),
//<IResponse<IIncomingRideRequest[]>, IIncomingRequestParams>
     getIncomingRideRequests: builder.query({
      query: ({
        page = 1,
        limit = 1,
        sort = "desc",
      }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sort) params.append("sort", sort);
        return {
          url: "/drivers/incoming-request",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useGetDriverAnalyticsQuery,
  useGetDriverProfileQuery,
  useApplyDriverMutation,
  useGetDriverApplicationsQuery,
  useGetDriversQuery,
  useUpdateDriverStatusMutation,
  useUpdateAvailabilityMutation,
  useGetIncomingRideRequestsQuery,
} = driverApi;
