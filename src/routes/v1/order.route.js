const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router.get('/',auth('manageOrders'), validate(orderValidation.getOrders), orderController.getOrders);

router.put('/confirm/:orderId',auth('manageOrders'), validate(orderValidation.confirmOrders), orderController.confirmOrder);
router.post('/success/:orderId',auth('manageOrders'), validate(orderValidation.getOrderById), orderController.successOrder);

// router.get('/get-order',auth('createOrder'), validate(orderValidation.getOrderBySlug), orderController.getOrderBySlug);

router.get('/get-order',auth('createOrder'), validate(orderValidation.getOrderById), orderController.getOrderById);

router.get('/search-order', validate(orderValidation.searchOrder), orderController.searchOrder);

router.post('/create', auth('createOrder'), validate(orderValidation.createOrder), orderController.createOrder);

router.put(
  '/update-order',
  auth('manageOrders'),
  validate(orderValidation.updateOrder),
  orderController.updateOrder
);

router.delete(
  '/delete-order',
  auth('manageOrders'),
  validate(orderController.deleteOrder),
  orderController.deleteOrder
);

module.exports = router;
