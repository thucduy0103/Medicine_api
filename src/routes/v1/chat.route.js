const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const chatValidation = require('../../validations/chat.validation');
const chatController = require('../../controllers/chat.controller');

const router = express.Router();

router.get('/',auth('admin'), validate(chatValidation.getChats), chatController.getChats);

router.get('/:chatId', validate(chatValidation.getChatById), chatController.getChat);

module.exports = router;
