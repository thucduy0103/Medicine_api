const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Cart
 * @param {Object} CartBody
 * @returns {Promise<Cart>}
 */
const createCart = async (CartBody) => {
  return Cart.create(CartBody);
};

/**
 * Query for Carts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCarts = async (filter, options) => {
  const Carts = await Cart.paginate(filter, options);
  return Carts;
};

const countCarts = async (userId) => {
  const Count = await Cart.countDocuments({userId:userId});
  return Count;
};

const queryCart = async (filter) => {
  const cart = await Cart.findOne(filter);
  return cart;
};

/**
 * Get Cart by id
 * @param {ObjectId} id
 * @returns {Promise<Cart>}
 */
const getCartById = async (id) => {
  return Cart.findById(id);
};

const getCartByIds = async (ids) => {
  return Cart.find({_id:{$in: ids}});
};

const getCartBySlug = async (slug) => {
  return Cart.findOne({slug:slug});
};

/**
 * Update Cart by id
 * @param {ObjectId} CartId
 * @param {Object} updateBody
 * @returns {Promise<Cart>}
 */
const updateCartById = async (CartId, updateBody) => {
  const Cart = await getCartById(CartId);
  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  Object.assign(Cart, updateBody);
  await Cart.save();
  return Cart;
};

/**
 * Delete Cart by id
 * @param {ObjectId} CartId
 * @returns {Promise<Cart>}
 */
const deleteCartById = async (CartId) => {
  const Cart = await getCartById(CartId);
  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  await Cart.remove();
  return Cart;
};

const deleteCartByIds = async (CartIds) => {
  await Cart.deleteMany({ _id: CartIds })
};

module.exports = {
  createCart,
  queryCarts,
  countCarts,
  queryCart,
  getCartById,
  getCartByIds,
  getCartBySlug,
  updateCartById,
  deleteCartById,
  deleteCartByIds
};
