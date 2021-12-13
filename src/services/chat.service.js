const httpStatus = require('http-status');
const { Chat } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Chat
 * @param {Object} ChatBody
 * @returns {Promise<Chat>}
 */
const createChat = async (ChatBody) => {
  return Chat.create(ChatBody);
};


/**
 * Query for Chats
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryChats = async (filter, options) => {
  const list = await Chat.paginate(filter, options);
  return list;
};

/**
 * Get Chat by id
 * @param {ObjectId} id
 * @returns {Promise<Chat>}
 */
const getChatById = async (id) => {
  return Chat.findById(id);
};



module.exports = {
  createChat,
  queryChats,
  getChatById
};
