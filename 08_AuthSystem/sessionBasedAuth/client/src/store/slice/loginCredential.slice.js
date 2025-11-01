import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name : 'login',
  initialState : {
    email : "",
    password : ""
  },
  reducers : {
    setCredentials : (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password
    },
    resetCredentials : (state, _) => {
      state.email = "";
      state.password = "";
    }
  }
})

export const loginReducers = loginSlice.reducer;
export const {resetCredentials, setCredentials} = loginSlice.actions;

export const getCredentials = (state) => state.login