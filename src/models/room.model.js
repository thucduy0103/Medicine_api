const mongoose = require('mongoose');
const changeToSlug = require('../utils/changeSlug');
const { toJSON, paginate } = require('./plugins');

const roomSchema = mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    roomAvatar: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String
    },
    adminRead: {
      type: Boolean,
      default : true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
roomSchema.plugin(toJSON);
roomSchema.plugin(paginate);

/**
 * @typedef Room
 */
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
