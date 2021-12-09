const mongoose = require('mongoose');
const changeToSlug = require('../utils/changeSlug');
const { toJSONFull, paginate } = require('./plugins');

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
        type: String
    },
    shippingUnit: {
        type: String,
        required: true,
    },
    shippingTotal: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    totalAmount: {
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
orderSchema.plugin(toJSONFull);
orderSchema.plugin(paginate);

/**
 * @typedef order
 */
const order = mongoose.model('Order', orderSchema);

module.exports = order;
