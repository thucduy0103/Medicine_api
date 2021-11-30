const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    receiverName: Joi.string().required(),
    cartIds: Joi.array().required(),
    phoneNumber: Joi.string().required().length(10),
    addressDelivery: Joi.string().required()
  }),
};

const getOrders = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrderBySlug = {
  query: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};

const getOrderById = {
  query: Joi.object().keys({
    orderId: Joi.string(),
  }),
};

const searchOrder = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    OrderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      receiverName: Joi.string().required(),
      cartIds: Joi.array().required().custom(objectId),
      phoneNumber: Joi.string().required().length(10),
      addressDelivery: Joi.string().required()
    })
    .min(1),
};

const confirmOrders = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      shippingCode: Joi.string().required(),
      shippingTotal: Joi.number().required(),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    OrderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrderBySlug,
  getOrderById,
  searchOrder,
  updateOrder,
  deleteOrder,
  confirmOrders,
};
