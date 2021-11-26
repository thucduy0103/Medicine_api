const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCart = {
  body: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
    quantity: Joi.number().required()
  }),
};

const getCarts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCartById = {
  query: Joi.object().keys({
    CartId: Joi.string(),
  }),
};

const searchCart = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateCart = {
  query: Joi.object().keys({
    CartId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        quantity: Joi.number()
    })
    .min(1),
};

const deleteCart = {
  params: Joi.object().keys({
    CartId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  searchCart,
  updateCart,
  deleteCart,
};
