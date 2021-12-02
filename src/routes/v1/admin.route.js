const express = require('express');
const adminController = require('../../controllers/admin.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router.get('/dashboards', adminController.getDashboard);

router.get('/reports/products', adminController.getReportProduct);

router.get('/reports/income', adminController.getIncome);

router.get('/reports/contacts', adminController.getContact);

router.get('/orders',auth('manageOrders'), validate(orderValidation.getOrders), orderController.getAllOrders);

module.exports = router;
