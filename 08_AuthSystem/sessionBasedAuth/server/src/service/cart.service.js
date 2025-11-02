import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { cart } from '../models/cart.model.js';
import { productsModel } from '../models/products.models.js';
import { Session } from '../models/session.models.js';

export const addCartItemToCart = async (req, res, next, session) => {
  const { productId } = req.params;

  const products = await productsModel.findById(productId);

  if (products.availabilityStatus != 'available' && products.quantity >= 1)
    return next(new ErrorHandler('Products out of stock !', 404));

  const cartData = await cart.create({ userId: session?.userId, productId });
  const cartItems = await cart
    .findOne({ _id: cartData._id })
    .populate(
      'productId',
      'title thumbnail category price quantity availabilityStatus rating _id quantity',
    );

  const transformResponse = {
    _id: cartItems._id,
    title: cartItems?.productId?.title,
    thumbnail:
      cartItems?.productId?.thumbnail?.url || cartItems?.productId?.thumbnail,
    category: cartItems?.productId?.category,
    price: cartItems?.productId?.price,
    quantity: cartItems.quantity,
    availabilityStatus:
      cartItems?.productId?.quantity >= cartItems?.quantity
        ? 'available'
        : 'unavailable',
    rating: cartItems?.productId?.rating,
    productId: cartItems?.productId?._id,
  };

  return transformResponse;
};

export const addCartItemToSession = async (req, res, next, session) => {
  const cart = {
    productId: req.params.productId,
    quantity: 1,
  };

  session.cartList.push(cart);
  await session.save();

  const cartItem = await Session.findOne({ _id: session._id }).populate(
    'cartList.productId',
    'title thumbnail category price quantity availabilityStatus rating _id quantity',
  );
  // now we transform response.
  // now we get newly pushed cart item from session.
  const cartItems = cartItem.cartList[cartItem.cartList.length - 1];
  const transformResponse = {
    _id: cartItems._id,
    title: cartItems?.productId?.title,
    thumbnail:
      cartItems?.productId?.thumbnail?.url || cartItems?.productId?.thumbnail,
    category: cartItems?.productId?.category,
    price: cartItems?.productId?.price,
    quantity: cartItems.quantity,
    availabilityStatus:
      cartItems?.productId?.quantity >= cartItems?.quantity
        ? 'available'
        : 'unavailable',
    rating: cartItems?.productId?.rating,
    productId: cartItems?.productId?._id,
  };

  return transformResponse;
};

export const getCartFromCartModel = async (req, res, next, session) => {
  const userId = session?.userId;
  console.log('session ', session);
  const cartList = await cart
    .find({ userId })
    .populate(
      'productId',
      'title thumbnail category price quantity availabilityStatus rating _id quantity',
    );
  // console.log(cartList)
  const transformResponse = cartList.map(({ _id, productId, quantity }) => ({
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
  }));

  return transformResponse;
};

export const getCartFromSession = async (req, res, next, _sid) => {
  const session = await Session.findOne({ _id: _sid }).populate(
    'cartList.productId',
    'title thumbnail category price quantity availabilityStatus rating _id quantity',
  );
  const cartItems = session.cartList;
  return cartItems.map(({ _id, productId, quantity }) => ({
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
  }));
};

export const removeFromCartModel = async (req, res, next) => {
  const { cartItemId } = req.params;

  const cartItem = await cart.findById(cartItemId);
  if (!cartItem)
    return next(new ErrorHandler('Cart item not available !', 404));

  await cart.findByIdAndDelete(cartItemId);
};

export const removeCartFromSession = async (req, res, next, session) => {
  const { cartItemId } = req.params;
  console.log(session)
  const idx = session.cartList.findIndex((cart) => cart._id == cartItemId);
  session.cartList.splice(idx,1);
  await session.save();

}
