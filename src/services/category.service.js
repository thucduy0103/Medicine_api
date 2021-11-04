const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Category
 * @param {Object} CategoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (CategoryBody) => {
  return Category.create(CategoryBody);
};

const createCategories = async (CategoryBody) => {
  return Category.insertMany(CategoryBody);
};

/**
 * Query for Categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const Categories = await Category.paginate(filter, options);
  return Categories;
};

/**
 * Get Category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  return Category.findById(id);
};

/**
 * Update Category by id
 * @param {ObjectId} CategoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (CategoryId, updateBody) => {
  const Category = await getCategoryById(CategoryId);
  if (!Category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(Category, updateBody);
  await Category.save();
  return Category;
};

/**
 * Delete Category by id
 * @param {ObjectId} CategoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (CategoryId) => {
  const Category = await getCategoryById(CategoryId);
  if (!Category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await Category.remove();
  return Category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  createCategories,
};
