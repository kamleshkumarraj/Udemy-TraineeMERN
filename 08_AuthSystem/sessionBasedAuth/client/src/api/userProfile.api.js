import { baseApi } from "./api";


const userProfileApi = baseApi.injectEndpoints({
  endpoints : (builder) => ({
    getProfile : builder.query({
      query : () => ({
        url : '/profile/my-profile',
        method : "GET",
        credentials : "include"
      }),
      transformResponse : (res) => res?.data
    })
  })
})

export const {useGetProfileQuery} = userProfileApi