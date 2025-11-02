// we create slice for auth.
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name : 'auth',
  initialState : {
    isAuthenticated : false,
    role : null,
    userId : ""
  },
  reducers : {
    setLogin : (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    setLogout : (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.userId = "";
    }
  }
})

export const authReducer = authSlice.reducer;
export const {setLogin, setLogout} = authSlice.actions;

export const getAuth = (state) => state.auth