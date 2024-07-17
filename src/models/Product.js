const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: Number,
    required: [true, "Size is required"],
    min: [18, "Size must be at least 18"],
    max: [54, "Size must be at most 54"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  offerPrice: { type: Number, required: false },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
  },
  sku: {
    type: String,
    required: [true, "SKU is required"],
    unique: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category id is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    featuredImage: {
      type: String,
      required: [true, "Featured image is required"],
    },
    hoverImage: {
      type: String,
      required: [true, "Hover image is required"],
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return Array.isArray(v);
        },
        message: "Images field must be an array",
      },
    },
    price: {
      type: Number,
    },
    totalStock: {
      type: Number,
    },
    offerPrice: {
      type: Number,
    },
    sizes: {
      type: [sizeSchema],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Sizes array cannot be empty",
      },
    },
    sales: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
