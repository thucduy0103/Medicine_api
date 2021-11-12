const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Order
 * @param {Object} OrderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (OrderBody) => {
  return Order.create(OrderBody);
};

/**
 * Query for Orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const Orders = await Order.paginate(filter, options);
  return Orders;
};

/**
 * Get Order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

const getOrderBySlug = async (slug) => {
  return Order.findOne({slug:slug});
};

/**
 * Update Order by id
 * @param {ObjectId} OrderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (OrderId, updateBody) => {
  const Order = await getOrderById(OrderId);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(Order, updateBody);
  await Order.save();
  return Order;
};

/**
 * Delete Order by id
 * @param {ObjectId} OrderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (OrderId) => {
  const Order = await getOrderById(OrderId);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await Order.remove();
  return Order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  getOrderBySlug,
  updateOrderById,
  deleteOrderById,
};
