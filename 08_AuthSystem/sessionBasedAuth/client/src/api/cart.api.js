import { baseApi } from "./api";


const cartApi = baseApi.injectEndpoints({
  endpoints : (builder) => ({
    getAllCart : builder.query({
      query : () => ({
        url : '/cart/get-all',
        method : "GET",
        credentials : "include"
      })
    })
  })
})

export const {useGetAllCartQuery} = cartApi