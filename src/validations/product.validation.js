const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    unit: Joi.string().required(),
    category: Joi.array().required(),
    discountPercentage: Joi.number().required(),
    inventoryQty: Joi.number().required(),
    productionDate: Joi.string().required(),
    expiryDate: Joi.string().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    content: Joi.string(),
    category: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      content: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      unit: Joi.string(),
      category: Joi.array(),
      discount_percentage: Joi.number(),
      inventory_qty: Joi.number(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
