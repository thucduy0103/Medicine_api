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
    category: Joi.string().optional().allow(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductBySlug = {
  query: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};

const getProductById = {
  query: Joi.object().keys({
    slug: Joi.string(),
  }),
};

const searchProduct = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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
  getProductBySlug,
  getProductById,
  searchProduct,
  updateProduct,
  deleteProduct,
};
