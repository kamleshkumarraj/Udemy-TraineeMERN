import { Router } from 'express';
import {
  addCartItem,
  decreaseCartQty,
  getAllCartItems,
  increaseCartQty,
  removeCartItems,
  removeMultipleCartItems,
} from '../controllers/cart.controller.js';

export const cartRouter = Router();

cartRouter.route('/get').get(getAllCartItems);
cartRouter.route('/add/:productId').post(addCartItem);
cartRouter.route('/remove/:cartItemId').delete(removeCartItems);
cartRouter.route('/increase/:cartItemId').patch(increaseCartQty);
cartRouter.route('/decrease/:cartItemId').patch(decreaseCartQty);
cartRouter.route('/remove-multiple').delete(removeMultipleCartItems);
