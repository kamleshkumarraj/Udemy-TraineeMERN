import { createSlice } from "@reduxjs/toolkit";


const miscSlice = createSlice({
  name : 'misc',
  initialState : {
    productToCartMap : undefined,
  },
  reducers : {
    setProductToCartMap : (state, action) => {
      state.productToCartMap = action.payload;
    },
    removeProductToCartMap : (state, action) => {
      state.productToCartMap = undefined
    }
  }
})

export const miscReducer = miscSlice.reducer;
export const {setProductToCartMap, removeProductToCartMap, removeCartWithCartId} = miscSlice.actions

export const getProductToCartMap = (state) => state.misc.productToCartMap