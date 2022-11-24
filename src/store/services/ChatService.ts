import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// import {API_URL, axiosBaseQuery} from "../../http";
// import {IWorker} from "../../models/IWorker";

export const chatAPI = createApi({
  reducerPath: "chatAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Chat"],
  endpoints: (build) => ({
    fetchChat: build.query<any[], string>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result) => ["Chat"],
    }),
    // createWorker: build.mutation({
    //   query: (post) => ({
    //     url: 'api/worker/create',
    //     method: 'POST',
    //     body: post
    //   }),
    //   invalidatesTags: ['Worker']
    // }),
    // updateWorker: build.mutation({
    //   query: (post) => ({
    //     url: 'api/worker/update',
    //     method: 'PUT',
    //     body: post
    //   }),
    //   invalidatesTags: ['Worker']
    // }),
    // deleteWorker: build.mutation({
    //   query: (post) => ({
    //     url: `api/worker/delete${post.id}`,
    //     method: 'DELETE',
    //     body: post
    //   }),
    //   invalidatesTags: ['Worker']
    // }),
  }),
});
