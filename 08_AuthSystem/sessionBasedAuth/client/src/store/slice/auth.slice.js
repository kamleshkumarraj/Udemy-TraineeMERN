// we create slice for auth.
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name : 'auth',
  initialState : {
    isAuthenticated : false,
    role : null
  },
  reducers : {
    setLogin : (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    setLogout : (state) => {
      state.isAuthenticated = false;
      state.role = null;
    }
  }
})

export const authReducer = authSlice.reducer;
export const {setLogin, setLogout} = authSlice.actions;

export const getAuth = (state) => state.auth