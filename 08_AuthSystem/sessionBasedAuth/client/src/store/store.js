import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/auth.slice'
import { baseApi } from '../api/api'

export const store = configureStore({
  reducer : {
    auth : authReducer
  },
  middleware : getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})