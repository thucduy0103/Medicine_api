const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const changeToSlug = require('../utils/changeSlug');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      unique: false,
      trim: true,
    },
    description: {
      type: String,
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
    discountPercentage: {
      type: Number,
      trim: true,
    },
    inventoryQty: {
      type: Number,
      required: true,
      trim: true,
    },
    productionDate: {
      type: String,
      required: true,
      trim: true,
    },
    expiryDate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.pre('save', async function (next) {
  this.slug = await changeToSlug(this.name);
  next();
});

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
