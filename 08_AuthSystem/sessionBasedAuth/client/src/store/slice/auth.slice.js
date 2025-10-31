// we create slice for auth.
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name : 'auth',
  initialState : {
    isAuthenticated : false,
    role : null
  },
  reducers : {
    login : (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logout : (state) => {
      state.isAuthenticated = false;
      state.role = null;
    }
  }
})

export const authReducer = authSlice.reducer;
export const {login, logout} = authSlice.actions;

export const getAuth = (state) => state.auth