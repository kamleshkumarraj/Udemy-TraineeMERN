import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/auth.slice'
import { baseApi } from '../api/api'
import { loginReducers } from './slice/loginCredential.slice'
import { miscReducer } from './slice/misc.slice'

export const store = configureStore({
  reducer : {
    auth : authReducer,
    login : loginReducers,
    misc : miscReducer,
    [baseApi.reducerPath] : baseApi.reducer
  },
  middleware : getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})