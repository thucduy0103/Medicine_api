const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChat = {
  body: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
    quantity: Joi.number().required()
  }),
};

const getChats = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChatById = {
  param: Joi.object().keys({
    chatId: Joi.string(),
  }),
};

const searchChat = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


module.exports = {
  createChat,
  getChats,
  getChatById,
  searchChat,
};
