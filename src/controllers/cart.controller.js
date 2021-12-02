const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService, productService } = require('../services');
const changeSlug = require('../utils/changeSlug');

const createCart = catchAsync(async (req, res) => {
  let filter = {userId:req.user._id,productId:req.body.productId};
  const cart = await cartService.queryCart(filter)
  if (cart) {
    cart.quantity = await cart.quantity + req.body.quantity
    cart.priceTotal = await cart.priceTotal + cart.price * req.body.quantity
    const Cart = await cartService.updateCartById(cart.id,cart);
    res.status(httpStatus.CREATED).send(Cart);
  }else{
    const product = await productService.getProductById(req.body.productId);
    var newCart = req.body;
    newCart.userId = req.user._id
    newCart.productName = product.name;
    newCart.image = product.image
    newCart.price = product.price
    newCart.priceTotal = product.price * req.body.quantity
    newCart.inventoryQty = product.inventoryQty
    const Cart = await cartService.createCart(newCart);
    res.status(httpStatus.CREATED).send(Cart);
  }
});

const getCarts = catchAsync(async (req, res) => {
  // let filter = pick(req.user._id, ['userId']);
  let filter = {userId:req.user._id};
  // console.log(filter)
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const results = await cartService.queryCarts(filter, options);
  res.send(results);
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
  console.log(req.query.CartId);
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
