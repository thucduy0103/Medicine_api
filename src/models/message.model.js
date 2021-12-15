const mongoose = require('mongoose');
const changeToSlug = require('../utils/changeSlug');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
