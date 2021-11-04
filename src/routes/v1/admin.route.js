const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

router.get('/dashboards', adminController.getDashboard);

router.get('/reports/products', adminController.getReportProduct);

router.get('/reports/income', adminController.getIncome);

router.get('/reports/contacts', adminController.getContact);

module.exports = router;
