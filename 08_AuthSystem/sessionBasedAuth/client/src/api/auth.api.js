import { baseApi } from "./api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
        credentials: "include",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),

    verifyEmail: builder.query({
      query: (token) => ({
        url: `/auth/verify-email/${token}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        body: payload,
      }),
    }),

    sendOtp: builder.mutation({
      query: (payload) => ({
        url: "/auth/send-otp",
        method: "POST",
        credentials: "include",
        body: payload,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: "/auth/verify-otp",
        method: "POST",
        credentials: "include",
        body: payload,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "POST",
        credentials: "include",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        credentials: "include",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailQuery,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
