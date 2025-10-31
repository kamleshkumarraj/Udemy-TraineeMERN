import { baseApi } from "./api";

const authApi = baseApi.injectEndpoints({
  endpoints : (builder) => ({
    register : builder.mutation({
      query : (payload) => ({
        url : '/auth/register',
        method : 'POST',
        body : payload,
        credentials : 'include'
      })
    })
  }),
})

export const {useRegisterMutation} = authApi;