import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
 
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
      transformResponse: (response) => response.data,
    }),

    // http://localhost:5000/api/v1/rides?minFare=100&maxFare=500&page=1&limit=10&sort=-createdAt&searchTerm=car&fields=_id,rider,rideType,fare
    getAllRides: builder.query({
      query: (params: Record<string, any>) => ({
        url: "/rides",
        method: "GET",
        params, // <-- send frontend filters here
      }),
      providesTags: ["RIDE"],
      transformResponse: (response) => response,
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
      invalidatesTags: ["RIDE", "DRIVER"],
    }),
    //Rider: Get my active ride
    // activeRide: builder.query<IRide, undefined>({
    //   query: () => ({
    //     rideDetails: builder.query<IRide, string>({
    //       query: (rideId) => ({
    //         url: `/rides/${rideId}/details`,
    //         method: "GET",
    //       }),
    //       providesTags: ["RIDE"],
    //       transformResponse: (response: { data: IRide }) => response.data,
    //     }),
    //     url: `/rides/myActiveRide`,
    //     method: "GET",
    //   }),
    //   providesTags: ["RIDE", "USER"],
    //   transformResponse: (response: { data: IRide }) => response.data,
    // }),

    cancelRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),
getActiveRide: builder.query<IRide | null, void>({
  query: () => ({
    url: "/rides/active-ride",
    method: "GET",
  }),
  transformResponse: (response: IResponse<IRide>) => response.data, // unwrap `data`
  providesTags: ["RIDE", "DRIVER"],
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
  useGetActiveRideQuery,
} = rideApi;
