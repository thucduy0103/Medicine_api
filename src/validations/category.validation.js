const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string(),
    image: Joi.string().allow(null,''),
    isShowHome: Joi.boolean().allow(null,''),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    content: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      slug: Joi.string(),
      image: Joi.string(),
      isShowHome: Joi.boolean(),
    })
    .min(1),
};

const isShowCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  })
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  isShowCategory,
  deleteCategory,
};
