import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { cart } from '../models/cart.model';
import { productsModel } from '../models/products.models.js';
import { Session } from '../models/session.models.js';

export const addCartItemToCart = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const products = await productsModel.findById(productId);

  if (products.availabilityStatus != 'available' && products.quantity >= 1)
    return next(new ErrorHandler('Products out of stock !', 404));

  const cartData = await cart.create({ userId: req.user, productId });
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
});

export const addCartItemToSession = asyncErrorHandler(
  async (req, res, next, session) => {
    const cart = {
      productId: req.params.productId,
      quantity: 1,
    };

    session.cartList.push(cart);
    await session.save();

    const cartItem = await Session.findOne({ _id: _sid }).populate(
      'cartList.productId',
      'title thumbnail category price quantity availabilityStatus rating _id quantity',
    );
    // now we transform response.
    const transformResponse = cartItem.cartList.map(cart => ({
      _id: cart._id,
      title: cart?.productId?.title,
      thumbnail: cart?.productId?.thumbnail?.url || cart?.productId?.thumbnail,
      category: cart?.productId?.category,
      price: cart?.productId?.price,
      quantity: cart.quantity,
      availabilityStatus:
        cart?.productId?.quantity >= cart?.quantity
          ? 'available'
          : 'unavailable',
      rating: cart?.productId?.rating,
      productId: cart?.productId?._id,
    }));
    return transformResponse;
  },
);
