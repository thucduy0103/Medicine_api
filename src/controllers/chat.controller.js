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
  const filter = {roomId:req.params.chatId};
  console.log(req.params.chatId);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await chatService.getChatById(filter, options);
  // console.log(result);
  res.send(result);
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
