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

    deleteSingleSession: builder.mutation({
      query: () => ({
        url: "/session/delete-single",
        method: "DELETE",
        credentials: "include",
      }),
    }),

    deleteAllSession: builder.mutation({
      query: () => ({
        url: "/session/delete-all",
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateSessionMutation,
  useDeleteSingleSessionMutation,
  useDeleteAllSessionMutation,
} = sessionApi;
