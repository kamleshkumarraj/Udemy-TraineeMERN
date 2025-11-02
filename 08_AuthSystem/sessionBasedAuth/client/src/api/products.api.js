import { baseApi } from "./api";


const productsApi = baseApi.injectEndpoints({
  endpoints : (builder) => ({
    getProducts : builder.query({
      query : () => ({
        url : '/products',
        method : "GET",
        credentials : "include"
      }),
      transformResponse : (res) => res?.data
    })
  })
})

export const {useGetProductsQuery} = productsApi