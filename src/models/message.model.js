const mongoose = require('mongoose');
const changeToSlug = require('../utils/changeSlug');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    roomName: {
        type: String,
        required: true,
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

messageSchema.pre('save', async function (next) {
  this.slug = await changeToSlug(this.name);
  next();
});

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
