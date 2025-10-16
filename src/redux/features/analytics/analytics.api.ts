import { baseApi } from "@/redux/baseApi";

export const analytics = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Admin: List all rides
    getAnalytics: builder.query({
      query: () => ({
        url: "analytics/stats",
        method: "GET",
      }),
      providesTags: ["RIDE", "USER", "DRIVER"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAnalyticsQuery } = analytics;
