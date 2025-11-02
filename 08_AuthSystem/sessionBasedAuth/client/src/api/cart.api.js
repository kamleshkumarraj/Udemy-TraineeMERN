
import { baseApi } from "./api";
import { nanoid } from "@reduxjs/toolkit";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCart: builder.query({
      query: () => ({
        url: "/cart/get-all",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => res?.data,
    }),
    addCartItem: builder.mutation({
      query: (payload) => ({
        url: `/cart/add/${payload?.productId}`,
        method: "POST",
        credentials: "include",
        body : {userId : payload?.userId}
      }),
      async onQueryStarted(payload, { queryFulfilled, dispatch }) {
        // first we update store.
        const productData = {
          _id: nanoid(),
          productId: payload?.productId,
          quantity: 1,
          userId: payload?.userId,
          availableStatus: true,
        };
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getAllCart", undefined, (draft) => {
            draft?.push(productData);
          })
        );

        // then we update backend.
        try {
          const { data: cartItems } = await queryFulfilled;
          // now we update data with origin data.
          console.log(cartItems)
          dispatch(
            cartApi.util.updateQueryData("getAllCart", undefined, (draft) => {
              const index = draft.findIndex(
                (item) =>
                  item?.productId?.toString() === cartItems?.data?.productId?.toString()
              );
              console.log(index);
              if (index !== -1) {
                draft[index] = cartItems?.data;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),

    removeCartItem: builder.mutation({
      query: (payload) => ({
        url: `/cart/remove/${payload?.cartId}`,
        method: "DELETE",
        credentials: "include",
      }),

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getAllCart", undefined, (draft) => {
            const index = draft.findIndex(
              (item) => item._id === payload.cartId
            );
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    increaseCartQty: builder.mutation({
      query: (payload) => ({
        url: `/cart/increase/${payload.cartId}`,
        method: "PATCH",
        credentials: "include",
      }),

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getAllCart", undefined, (draft) => {
            const index = draft.findIndex(
              (item) => item._id === payload.cartId
            );
            if (index !== -1) {
              draft[index].quantity += 1;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    decreaseCartQty: builder.mutation({
      query: (payload) => ({
        url: `/cart/decrease/${payload.cartId}`,
        method: "PATCH",
        credentials: "include",
      }),

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getAllCart", undefined, (draft) => {
            const index = draft.findIndex(
              (item) => item._id === payload.cartId
            );
            if (index !== -1) {
              draft[index].quantity -= 1;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useIncreaseCartQtyMutation,
  useDecreaseCartQtyMutation,
} = cartApi;
