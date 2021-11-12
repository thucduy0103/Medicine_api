const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const changeSlug = require('../utils/changeSlug')

const createProduct = catchAsync(async (req, res) => {
  const Product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(Product);
});

const getProducts = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['']);
  if(req.query.category){
    filter = pick(req.query, ['category']);
  } 
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProductBySlug = catchAsync(async (req, res) => {
  const Product = await productService.getProductBySlug(req.query.slug);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(Product);
});

const getProductById = catchAsync(async (req, res) => {
  const Product = await productService.getProductById(req.query.ProductId);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(Product);
});

const searchProduct = catchAsync(async (req, res) => {
  const key = changeSlug(req.query.search);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const Product = await productService.queryProducts({slug: new RegExp(key,'i')},options);
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
  const data = [];
  for (let index = 0; index < 10; index += 1) {
    // let item = {month: index.toString(), total:Math.floor(Math.random())}
    const item = 'Thực phẩm chức năng';
    data.push(item);
  }
  res.json({ results: data });
});

const createCrawl = catchAsync(async (req, res) => {
  //   let data = req.body.url

  //   axios.get(req.body.url)
  //   .then((response) => {
  //       const $ = cheerio.load(response.data);
  //       console.log($('div > .detail_product--description > div > h1').text().trim());
  //  })
  //   .catch(ex =>{

  //     })

  const { data } = req.body;

  let descriptionString = `mô tả chi tiết ${data.product.name}`;
  if (data.product.metadata.length > 0) {
    // console.log(data.product.metadata.length);
    descriptionString = data.product.metadata[0].value;
  }

  const product = {
    name: data.product.name,
    slug: data.product.slug,
    image: data.product.thumbnail2x.url,
    content: data.product.description || data.product.name,
    description: descriptionString,
    price: data.product.variants[0].pricing.price.net.amount,
    unit: data.product.variants[0].name,
    category: ['cham-soc-ca-nhan'],
    discountPercentage: 0,
    inventoryQty: data.product.variants[0].quantityAvailable,
    productionDate: '03/11/2021',
    expiryDate: '03/11/2022',
  };

  // res.send(product)
  const Product = await productService.createProduct(product);
  res.status(httpStatus.CREATED).send(Product);
});

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  getProductById,
  searchProduct,
  updateProduct,
  deleteProduct,
  getcategories,
  createCrawl,
};
