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

          dispatch(
            cartApi.util.updateQueryData("getAllCart", undefined, (draft) => {
              const index = draft.findIndex(
                (item) => item?.productId?.toString() === cartItems.productId.toString()
              );
              if (index !== -1) {
                draft[index] = cartItems;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

// cartRouter.route('/get-all').get(getAllCartItems);
// cartRouter.route('/add/:productId').post(addCartItem);
// cartRouter.route('/remove/:cartItemId').delete(removeCartItems);
// cartRouter.route('/increase/:cartItemId').patch(increaseCartQty);
// cartRouter.route('/decrease/:cartItemId').patch(decreaseCartQty);
// cartRouter.route('/remove-multiple').delete(removeMultipleCartItems);

export const { useGetAllCartQuery } = cartApi;
