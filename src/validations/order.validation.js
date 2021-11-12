const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    receiverName: Joi.string().required(),
    productId: Joi.string().required().custom(objectId),
    quantity: Joi.number().required(),
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
        userId: Joi.string(),
        userName: Joi.string(),
        productName: Joi.string(),
        productId: Joi.string(),
        quantity: Joi.number(),
        phoneNumber: Joi.string().length(10),
        addressDelivery: Joi.string(),
        shippingCode: Joi.string(),
        shippingUnit: Joi.string(),
        orderStatus: Joi.number(),
        orderStatusString: Joi.string(),
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
};
