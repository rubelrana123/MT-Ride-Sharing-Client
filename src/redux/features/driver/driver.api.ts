import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Rider applies as driver
    applyDriver: builder.mutation({
      query: (driverData) => ({
        url: "/drivers/apply-driver",
        method: "POST",
        data: driverData,
      }),
      invalidatesTags: ["DRIVER"],
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
  }),
});

export const {
  useApplyDriverMutation,
  useGetDriverApplicationsQuery,
  useGetDriversQuery,
  useUpdateDriverStatusMutation,
  useUpdateAvailabilityMutation,
} = driverApi;
