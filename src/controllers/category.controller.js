const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const changeToSlug = require('../utils/changeSlug');

const createCategory = catchAsync(async (req, res) => {
  if(req.body.image === null){
    req.body.image = 'https://cdn-icons-png.flaticon.com/512/883/883407.png'
  }
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const isShowCategory = catchAsync(async (req, res) => {
  const category = await categoryService.isShowCategoryById(req.params.categoryId);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createCategories = catchAsync(async (req, res) => {
  const list = req.body.data.search.edges;
  const array = list.map((x) => x.node);
  const arr = [];
  array.forEach((element) => {
    const item = { name: element.name, slug: changeToSlug(element.name), image: element.icon.url };
    arr.push(item);
  });
  // console.log(arr);
  const category = await categoryService.createCategories(arr);
  res.status(httpStatus.CREATED).send(category);
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  isShowCategory,
  deleteCategory,
  createCategories,
};
