// Need to use the React-specific entry point to import createApi
// import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheCollection";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "d2095098f5mshaf08a2a10ef6e4dp1023dejsn053cc19c1368",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins/?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ timePeriod, coinId }) =>
        createRequest(`/coin/${coinId}/history/?timePeriod=${timePeriod}`),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
