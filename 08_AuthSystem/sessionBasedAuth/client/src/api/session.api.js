import { baseApi } from "./api";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: () => ({
        url: "/session/create",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateSessionMutation } = sessionApi;
