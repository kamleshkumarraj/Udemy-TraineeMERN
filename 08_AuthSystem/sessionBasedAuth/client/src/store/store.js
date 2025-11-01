import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/auth.slice'
import { baseApi } from '../api/api'

export const store = configureStore({
  reducer : {
    auth : authReducer,
    [baseApi.reducerPath] : baseApi.reducer
  },
  middleware : getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})