const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const Product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(Product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const Product = await productService.getProductById(req.query.ProductId);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(Product);
});

const updateProduct = catchAsync(async (req, res) => {
  const Product = await productService.updateProductById(req.query.ProductId, req.body);
  res.send(Product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.query.ProductId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getcategories = catchAsync(async (req, res) => {
  let data = []
    for (let index = 0; index < 10; index++) {
        // let item = {month: index.toString(), total:Math.floor(Math.random())}
        let item = "Thực phẩm chức năng"
        data.push(item)
    }
  res.json({results:data});
});

const createcategories = catchAsync(async (req, res) => {
  let data = []
    for (let index = 0; index < 10; index++) {
        // let item = {month: index.toString(), total:Math.floor(Math.random())}
        let item = "Thực phẩm chức năng"
        data.push(item)
    }
  res.json({results:data});
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getcategories,
  createcategories,
};
