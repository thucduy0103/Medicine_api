const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router.get('/', validate(categoryValidation.getCategories), categoryController.getCategories);

router.get('/:categoryId', validate(categoryValidation.getCategory), categoryController.getCategory);

router.get('/categories', auth('managecategories'), categoryController.getCategories);

router.post(
  '/create',
  auth('managecategories'),
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);

router.put(
  '/update/:categoryId',
  auth('managecategories'),
  validate(categoryValidation.updateCategory),
  categoryController.updateCategory
);

router.put(
  '/isShow/:categoryId',
  auth('managecategories'),
  validate(categoryValidation.isShowCategory),
  categoryController.isShowCategory
);

router.delete(
  '/delete/:categoryId',
  auth('managecategories'),
  validate(categoryValidation.deleteCategory),
  categoryController.deleteCategory
);

router.post('/import', categoryController.createCategories);

module.exports = router;
