const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().allow(null,''),
    phone: Joi.string().allow(null,'').length(10).pattern(/^[0-9]+$/),
    avatar: Joi.string().allow(null,''),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    roleId: Joi.number().required().valid(0, 1),
    roleName: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      address: Joi.string().allow(null,''),
      phone: Joi.string().allow(null,'').length(10).pattern(/^[0-9]+$/),
      avatar: Joi.string().allow(null,''),
      roleId: Joi.number().required().valid(0, 1),
      roleName: Joi.string().required().valid('user', 'admin'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateMe = {
  body: Joi.object()
    .keys({
      name: Joi.string().allow(null,''),
      address: Joi.string().allow(null,''),
      phone: Joi.string().allow(null, '').length(10).pattern(/^[0-9]+$/),
      avatar: Joi.string().allow(null,''),
    })
    .min(1),
};

const updateEmail = {
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
    }),
};

const updatePassword = {
  body: Joi.object()
    .keys({
      oldPassword: Joi.string().required().custom(password),
      password: Joi.string().required().custom(password),
    }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  updateEmail,
  updatePassword
};
