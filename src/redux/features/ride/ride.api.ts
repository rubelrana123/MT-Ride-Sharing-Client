 
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
    rideDetails: builder.query({
      query: (rideId) => ({
        url: `/rides/${rideId}/details`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response) =>  response.data
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
    //Rider: Get my active ride
      myActiveRide: builder.query<IRide, undefined>({
      query: () => ({    rideDetails: builder.query<IRide, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/details`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: { data: IRide }) => response.data,
    }),
        url: `/rides/myActiveRide`,
        method: "GET",
      }),
      providesTags: ["RIDE", "USER"],
      transformResponse: (response: { data: IRide }) => response.data,
    }),
 
    cancelRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH"
      }),
      invalidatesTags: ["RIDE"],
    }),
    //   getRiderActiveRide: builder.query({
    //   query: (riderId: string) => `rides/myActiveRide`,
    //   providesTags: ["RIDE"],
    // }),
  getActiveRide: builder.query({
      query: () => ({
        url: "/rides/myActiveRide",
        method: "GET",
      }),
      providesTags: ["RIDE","DRIVER"],
      transformResponse: (response) => response.data,
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
  useRideDetailsQuery,
  useMyActiveRideQuery,
  useGetActiveRideQuery
} = rideApi;
