import mongoose from 'mongoose';
import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { cart } from '../models/cart.model.js';
import { productsModel } from '../models/products.models.js';
import { ErrorHandler } from '../errors/errorHandler.js';

export const addCartItem = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const products = await productsModel.findById(productId);

  if (products.availabilityStatus != 'available' && products.quantity >= 1)
    return next(new ErrorHandler('Products out of stock !', 404));

  await cart.create({ userId: req.user.id, productId });

  res.status(201).json({
    success: true,
    message: 'Product added in cart list successfully',
  });
});

export const decreaseCartQty = asyncErrorHandler(async (req, res, next) => {
  const { cartItemId } = req.params;
  const cartItem = await cart.findById(cartItemId);

  if (!cartItem)
    return next(new ErrorHandler('Please provide valid cart id !', 404));

  cartItem.quantity = cartItem.quantity - 1;
  if (cartItem.quantity == 0) {
    await cart.findByIdAndDelete(cartItem);
  } else {
    await cartItem.save();
  }

  res.status(200).json({
    success: true,
    message: 'Cart quantity decrease successfully.',
  });
});

export const getAllCartItems = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user;
  console.log(userId.toString())
  if (mongoose.isValidObjectId(userId) == false)
    return ErrorHandler('Please send valid user id !');
  const cartItems = await cart
    .find({ userId })
    .populate(
      'productId',
      'title thumbnail category price quantity availabilityStatus rating _id quantity',
    );
  // console.log(cartItems)
  const transformData = cartItems.map(({ productId, quantity, _id }) => {
    return {
      _id,
      title: productId?.title,
      thumbnail: productId?.thumbnail?.url || productId?.thumbnail,
      category: productId?.category,
      price: productId?.price,
      quantity,
      availabilityStatus:
        productId?.quantity >= quantity ? 'available' : 'unavailable',
      rating: productId?.rating,
      productId: productId?._id,
    };
  });

  res.status(200).json({
    success: true,
    message: 'You get your all cart items successfully.',
    data: transformData,
    length: transformData.length,
  });
});

export const increaseCartQty = asyncErrorHandler(async (req, res, next) => {
  const { cartItemId } = req.params;
  const cartItem = await cart.findById(cartItemId);

  if (!cartItem)
    return next(new ErrorHandler('Please provide valid cart id ', 404));

  cartItem.quantity = cartItem.quantity + 1;
  await cartItem.save();

  res.status(200).json({
    success: true,
    message: 'Cart quantity increased successfully',
  });
});

export const removeCartItems = asyncErrorHandler(async (req, res, next) => {
  const { cartItemId } = req.params;

  const cartItem = await cart.findById(cartItemId);
  if (!cartItem)
    return next(new ErrorHandler('Cart item not available !', 404));

  await cart.findByIdAndDelete(cartItemId);

  res.status(200).json({
    success: true,
    message: 'Cart item deleted successfully',
  });
});

export const removeMultipleCartItems = asyncErrorHandler(async (req, res, next) => {
  const deletableItems = req.body || [];
  console.log(deletableItems);
  if (deletableItems.length < 1)
    return next(
      new ErrorHandler('Please provide item for deleting the products !', 404),
    );

  await cart.deleteMany({ _id: { $in: deletableItems } });
  res.status(200).json({
    success: true,
    message: 'Items deleted successfully !',
  });
});
