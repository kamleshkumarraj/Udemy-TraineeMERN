import mongoose from 'mongoose';
import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { cart } from '../models/cart.model.js';
import { productsModel } from '../models/products.models.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { Session } from '../models/session.models.js';
import { addCartItemToCart, addCartItemToSession, getCartFromCartModel, getCartFromSession } from '../service/cart.service.js';

export const addCartItem = asyncErrorHandler(async (req, res, next) => {
  const {_sid} = req.signedCookies;
  const {userId} = req.body;
  let transformResponse;
  // now we check user is logged in or not.
  const session = await Session.findOne({ _id: _sid });
  if(session && new Date(session.expiresAt).valueOf() > Date.now()){
    // now we check session is expired or not and user is not logged in.
    if(!session.userId){
      transformResponse = await addCartItemToSession(req, res, next,session);
    }else if(session.userId.toString() == userId.toString()){
      transformResponse = await addCartItemToCart(req, res, next,session);
    }
  }else{
    if(session) await session.deleteOne();
    const newSession = await Session.create({
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 10,  
    })
    res.cookie('_sid', newSession._id, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 10,
      signed: true,
    });
    transformResponse = await addCartItemToSession(req, res, next, newSession);
  }
  res.status(201).json({
    success: true,
    message: 'Product added in cart list successfully',
    data: transformResponse,
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
  // const userId = req.user;
  const {_sid} = req.signedCookies;
  let transformResponse;
  // now we check user is logged in or not.
  const session = await Session.findOne({ _id: _sid });
  console.log(session)
  if(session && new Date(session.expiresAt).valueOf() > Date.now()){
    // now we check session is expired or not and user is not logged in.
    if(!session?.userId){
      transformResponse = await getCartFromSession(req, res, next, session._id);
    }else if(session?.userId?.toString()){
      transformResponse = await getCartFromCartModel(req, res, next, session);
    }
  }else{
    if(session) await session.deleteOne();
    const newSession = await Session.create({
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 10,  
    })
    res.cookie('_sid', newSession._id, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 10,
      signed: true,
    });
    
  }
  console.log(transformResponse)
  res.status(200).json({
    success: true,
    message: 'We get all cart data successfully.',
    data: transformResponse || [],
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

export const removeMultipleCartItems = asyncErrorHandler(
  async (req, res, next) => {
    const deletableItems = req.body || [];
    console.log(deletableItems);
    if (deletableItems.length < 1)
      return next(
        new ErrorHandler(
          'Please provide item for deleting the products !',
          404,
        ),
      );

    await cart.deleteMany({ _id: { $in: deletableItems } });
    res.status(200).json({
      success: true,
      message: 'Items deleted successfully !',
    });
  },
);
