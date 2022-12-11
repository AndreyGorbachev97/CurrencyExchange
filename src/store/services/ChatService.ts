import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// import {API_URL, axiosBaseQuery} from "../../http";
// import {IWorker} from "../../models/IWorker";

export const chatAPI = createApi({
  reducerPath: "chatAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://178.154.220.209:3001" }),
  tagTypes: ["Chat"],
  endpoints: (build) => ({
    fetchChat: build.query<any[], string>({
      query: (chatId: string) => ({
        url: "/",
        method: "GET",
        params: { chatId },
      }),
      providesTags: (result) => ["Chat"],
    }),
  }),
});
