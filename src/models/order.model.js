const mongoose = require('mongoose');
const changeToSlug = require('../utils/changeSlug');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
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
    listCart: {
      type: Array,
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
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef order
 */
const order = mongoose.model('Order', orderSchema);

module.exports = order;
