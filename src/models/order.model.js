const mongoose = require('mongoose');
const changeToSlug = require('../utils/changeSlug');
const { toJSON, paginate } = require('./plugins');

const modelSchema = mongoose.Schema(
  {
    receiverName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    addressDelivery: {
      type: String,
      required: true,
    },
    shippingCode: {
        type: String,
        required: true,
    },
    shippingUnit: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: Number,
        required: true,
    },
    orderStatusString: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
modelSchema.plugin(toJSON);
modelSchema.plugin(paginate);

/**
 * @typedef Model
 */
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
