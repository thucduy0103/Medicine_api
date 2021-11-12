const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService, productService } = require('../services');
const changeSlug = require('../utils/changeSlug');

const createOrder = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.body.productId);
  var order = req.body;
  order.productId = product.id;
  order.productName = product.name;
  order.userId = req.user._id;
  order.shippingCode = 'Chưa cập nhật'
  order.shippingUnit = 'Chưa cập nhật'
  order.orderStatus = 1
  order.orderStatusString = 'Đơn hàng mới, đang chờ xử lý'
//   console.log(order);
  const Order = await orderService.createOrder(order);
  res.status(httpStatus.CREATED).send(Order);
});

const getOrders = catchAsync(async (req, res) => {
    // console.log(req.user)
  let filter = pick(req.user._id, ['_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrderBySlug = catchAsync(async (req, res) => {
  const Order = await orderService.getOrderBySlug(req.query.slug);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(Order);
});

const getOrderById = catchAsync(async (req, res) => {
  const Order = await orderService.getOrderById(req.query.orderId);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(Order);
});

const searchOrder = catchAsync(async (req, res) => {
  const key = changeSlug(req.query.search);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const Order = await orderService.queryOrders({ slug: new RegExp(key, 'i') }, options);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(Order);
});

const updateOrder = catchAsync(async (req, res) => {
  const Order = await orderService.updateOrderById(req.query.orderId, req.body);
  res.send(Order);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.query.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrder,
  getOrders,
  getOrderBySlug,
  getOrderById,
  searchOrder,
  updateOrder,
  deleteOrder,
};
