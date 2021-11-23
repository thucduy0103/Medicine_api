const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

// router
//   .route('/')
//   .post(auth('manageProducts'), validate(productValidation.createUser), productController.createProduct)
//   .get(auth('getProducts'), validate(productValidation.getUsers), productController.getProducts);

router.get('/', validate(productValidation.getProducts), productController.getProducts);

router.get('/get-product', validate(productValidation.getProductBySlug), productController.getProductBySlug);

router.get('/get-product-by-id', validate(productValidation.getProductById), productController.getProductById);

router.get('/search-product', validate(productValidation.searchProduct), productController.searchProduct);

router.get('/categories', auth('manageProducts'), productController.getcategories);

router.post('/', auth('manageProducts'), validate(productValidation.createProduct), productController.createProduct);

router
  .route('/:productId')
  .put(auth('manageProducts'),validate(productValidation.updateProduct),productController.updateProduct)
  .delete(auth('manageProducts'), validate(productValidation.deleteProduct), productController.deleteProduct)

// router.put('/:productId',auth('manageProducts'),validate(productValidation.updateProduct),productController.updateProduct);

// router.delete(
//   '/:productId',
//   auth('manageProducts'),
//   validate(productValidation.deleteProduct),
//   productController.deleteProduct
// );

router.post('/create-item', productController.createCrawl);

router.post('/update-item', productController.updateCrawl);

// router
//   .route('/:productId')
//   .get(validate(productValidation.getProduct), productController.getProduct)
//   .patch(auth('manageProducts'), validate(productValidation.updateUser), productController.updateProduct)
//   .delete(auth('manageProducts'), validate(productValidation.deleteUser), productController.deleteProduct);

module.exports = router;
