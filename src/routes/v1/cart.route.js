const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router.get('/',auth('createOrder'), validate(cartValidation.getCarts), cartController.getCarts);

// router.get('/get-cart',auth('createcart'), validate(cartValidation.getcartBySlug), cartController.getcartBySlug);

router.get('/get-cart',auth('createOrder'), validate(cartValidation.getCartById), cartController.getCartById);

router.get('/search-cart', validate(cartValidation.searchCart), cartController.searchCart);

router.post('/create', auth('createOrder'), validate(cartValidation.createCart), cartController.createCart);

router.put(
  '/update-cart',
  auth('manageOrders'),
  validate(cartValidation.updateCart),
  cartController.updateCart
);

router.delete(
  '/delete-cart',
  auth('manageOrders'),
  validate(cartController.deleteCart),
  cartController.deleteCart
);

module.exports = router;
