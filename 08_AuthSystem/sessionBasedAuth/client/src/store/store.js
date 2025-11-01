import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/auth.slice'
import { baseApi } from '../api/api'
import { loginReducers } from './slice/loginCredential.slice'

export const store = configureStore({
  reducer : {
    auth : authReducer,
    login : loginReducers,
    [baseApi.reducerPath] : baseApi.reducer
  },
  middleware : getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})