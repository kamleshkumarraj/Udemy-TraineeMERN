import { createSlice } from "@reduxjs/toolkit";


const miscSlice = createSlice({
  name : 'misc',
  initialState : {
    productToCartMap : new Map(),
  },
  reducers : {
    setProductToCartMap : (state, action) => {
      action.payload?.cartList.map((cart) => state.productToCartMap.set(cart.productId, cart?._id));
    },
    removeProductToCartMap : (state, action) => {
      state.productToCartMap.delete(action.payload?.productId);
    },
    removeCartWithCartId : (state, action) => {
      state.productToCartMap.values().forEach((cartId) => {
        if(cartId == action.payload?.cartId) state.productToCartMap.delete(action.payload?.productId);
      })
    }
  }
})

export const miscReducer = miscSlice.reducer;
export const {setProductToCartMap, removeProductToCartMap, removeCartWithCartId} = miscSlice.actions

export const getProductToCartMap = (state) => state.misc.productToCartMap