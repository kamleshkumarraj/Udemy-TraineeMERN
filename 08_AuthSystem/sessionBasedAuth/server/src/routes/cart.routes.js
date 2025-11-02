import { Router } from 'express';
import {
  addCartItem,
  decreaseCartQty,
  getAllCartItems,
  increaseCartQty,
  removeCartItems,
  removeMultipleCartItems,
} from '../controllers/cart.controller.js';
import { isLoggedIn } from '../middlewares/auth.middlewares.js';

export const cartRouter = Router();

cartRouter.use(isLoggedIn);
cartRouter.route('/get-all').get(getAllCartItems);
cartRouter.route('/add/:productId').post(addCartItem);
cartRouter.route('/remove/:cartItemId').delete(removeCartItems);
cartRouter.route('/increase/:cartItemId').patch(increaseCartQty);
cartRouter.route('/decrease/:cartItemId').patch(decreaseCartQty);
cartRouter.route('/remove-multiple').delete(removeMultipleCartItems);
