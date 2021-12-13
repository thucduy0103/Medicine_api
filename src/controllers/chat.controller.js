const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const createChat = catchAsync(async (req, res) => {
  const Chat = await chatService.createChat(req.body);
  res.status(httpStatus.CREATED).send(Chat);
});

const getChats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await chatService.queryChats(filter, options);
  res.send(result);
});

const getChat = catchAsync(async (req, res) => {
  const Chat = await chatService.getChatById(req.params.chatId);
  if (!Chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  res.send(Chat);
});

const updateChat = catchAsync(async (req, res) => {
  const Chat = await chatService.updateChatById(req.params.ChatId, req.body);
  res.send(Chat);
});


module.exports = {
  createChat,
  getChats,
  getChat,
  updateChat,
};
