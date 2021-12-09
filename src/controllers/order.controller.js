const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService, cartService } = require('../services');
const changeSlug = require('../utils/changeSlug');

const createOrder = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByIds(req.body.cartIds);
  var array = cart.map(item => item.priceTotal)
  const totalAmount = array.reduce(function(a, b) { return a + b; }, 0)
  // console.log(totalAmount);
  var order = req.body;
  order.listCart = cart
  order.userId = req.user._id;
  order.totalAmount = totalAmount
  order.shippingTotal = 0
  order.shippingCode = ''
  order.shippingUnit = 'Chưa xác nhận'
  order.orderStatus = "Unconfirm"
  order.orderStatusString = 'Đơn hàng mới, đang chờ xử lý'
  // console.log(order);
  const Order = await orderService.createOrder(order);
  await cartService.deleteCartByIds(req.body.cartIds);
  res.status(httpStatus.CREATED).send(Order);
});

const getOrders = catchAsync(async (req, res) => {
  // let filter = pick(req.user._id, ['_id']);
  let filter = {userId:req.user._id};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getAllOrders = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders({}, options);
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

const confirmOrder = catchAsync(async (req, res) => {
  const Order = await orderService.getOrderById(req.params.orderId);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Order.shippingCode = req.body.shippingCode
  Order.shippingTotal = req.body.shippingTotal
  Order.shippingUnit = 'Đã xác nhận'
  Order.orderStatus = "Shipping"
  Order.orderStatusString = 'Đơn hàng đã xác nhận, đang chờ vận chuyển'

  const OrderResult = await orderService.updateOrderById(req.params.orderId, Order);
  res.send(OrderResult);
});

const successOrder = catchAsync(async (req, res) => {
  const Order = await orderService.getOrderById(req.params.orderId);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Order.shippingUnit = 'Thành công'
  Order.orderStatus = "Complete"
  Order.orderStatusString = 'Đơn hàng đã hoàn tất'

  const OrderResult = await orderService.updateOrderById(req.params.orderId, Order);
  res.send(OrderResult);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.query.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

const cancelOrder = catchAsync(async (req, res) => {
  const Order = await orderService.getOrderById(req.body.orderId);
  if(Order.orderStatus =="Unconfirm"){
    await orderService.deleteOrderById(req.query.orderId);
    res.status(httpStatus.NO_CONTENT).send("Xoá thành công");
  }else{
    res.status(httpStatus.NO_CONTENT).send("Không xoá được đơn hàng");
  }
});

module.exports = {
  createOrder,
  getOrders,
  getAllOrders,
  getOrderBySlug,
  getOrderById,
  searchOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
  confirmOrder,
  successOrder,
};
