const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true, 
    },
    unit: {
      type: String,
      required: true,
      trim: true, 
    },
    category: {
      type: [String],
      required: true,
      trim: true, 
    },
    discount_percentage : {
      type: Number,
      required: true,
      trim: true, 
    },
    inventory_qty : {
      type: Number,
      required: true,
      trim: true, 
    },
    production_date : {
      type: String,
      required: true,
      trim: true, 
    },
    expiry_date : {
      type: String,
      required: true,
      trim: true, 
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);


// productSchema.pre('save', async function (next) {
//   const user = this;
//   next();
// });

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
