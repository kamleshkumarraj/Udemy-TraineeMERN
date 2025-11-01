import { baseApi } from "./api";

const authApi = baseApi.injectEndpoints({
  endpoints : (builder) => ({
    register : builder.mutation({
      query : (payload) => ({
        url : '/auth/register',
        method : 'POST',
        body : payload,
        credentials : 'include',
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      })
    }),

    verifyEmail : builder.query({
      query : (token) => ({
        url : `/auth/verify-email/${token}`,
        method : 'GET',
        credentials : 'include'
      })
    })
  }),
})

export const {useRegisterMutation, useVerifyEmailQuery} = authApi;