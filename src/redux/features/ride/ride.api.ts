import { baseApi } from "@/redux/baseApi";
import type { IRide } from "@/types/ride.type";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Rider: Request new ride
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: "/rides/request",
        method: "POST",
        data: rideData,
      }),
      invalidatesTags: ["RIDE"],
    }),
    // Get ride details
    rideDetails: builder.query<IRide, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/details`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: { data: IRide }) => {
        console.log(response, "ride details response");
        return response.data;
      },
    }),
    // Admin: List all rides
    getAllRides: builder.query({
      query: () => ({
        url: "/rides",
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response) => response.data,
    }),

    // Rider: View ride history
    getRideHistory: builder.query({
      query: () => ({
        url: "/rides/history",
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response) => response.data,
    }),

    // Driver: View earnings
    getDriverEarnings: builder.query({
      query: () => ({
        url: "/rides/earnings",
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response) => response.data,
    }),

    // Driver: Update ride status
    updateRideStatus: builder.mutation({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Rider: Cancel ride
    cancelRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetAllRidesQuery,
  useGetRideHistoryQuery,
  useGetDriverEarningsQuery,
  useUpdateRideStatusMutation,
  useCancelRideMutation,
  useRideDetailsQuery
} = rideApi;
