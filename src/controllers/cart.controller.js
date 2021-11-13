const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService, productService } = require('../services');
const changeSlug = require('../utils/changeSlug');

const createCart = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.body.productId);
  var cart = req.body;
  cart.productName = product.name;
  cart.image = product.image
  cart.price = product.price
  cart.priceTotal = product.price * req.body.quantity
  cart.inventoryQty = product.inventoryQty
  const Cart = await cartService.createCart(cart);
  res.status(httpStatus.CREATED).send(Cart);
});

const getCarts = catchAsync(async (req, res) => {
    // console.log(req.user)
  let filter = pick(req.user._id, ['_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cartService.queryCarts(filter, options);
  res.send(result);
});

const getCartBySlug = catchAsync(async (req, res) => {
  const Cart = await cartService.getCartBySlug(req.query.slug);
  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  res.send(Cart);
});

const getCartById = catchAsync(async (req, res) => {
  const Cart = await cartService.getCartById(req.query.CartId);
  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  res.send(Cart);
});

const searchCart = catchAsync(async (req, res) => {
  const key = changeSlug(req.query.search);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const Cart = await cartService.queryCarts({ slug: new RegExp(key, 'i') }, options);
  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  res.send(Cart);
});

const updateCart = catchAsync(async (req, res) => {
  const Cart = await cartService.updateCartById(req.query.CartId, req.body);
  res.send(Cart);
});

const deleteCart = catchAsync(async (req, res) => {
  await cartService.deleteCartById(req.query.CartId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCart,
  getCarts,
  getCartBySlug,
  getCartById,
  searchCart,
  updateCart,
  deleteCart,
};
