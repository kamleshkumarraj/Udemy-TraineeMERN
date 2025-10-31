// we create base api and here inject all api.

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath : 'api',
  baseQuery : fetchBaseQuery({
    baseUrl : 'http://localhost:5000/api/v1',
    credentials : 'include'
  }),
  tagTypes : ['get-user'],
  endpoints : () => ({})
})