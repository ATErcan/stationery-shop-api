const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [100, "Product name must be at most 100 characters"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      max: [999999, "Price cannot exceed 999.999,00"],
    },
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 0 && arr.length <= 15,
        message: "A product must have at least 1 image and at most 15 images",
      },
    },
    stock: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [0, "Stock cannot be negative"],
      max: [5000, "Stock cannot exceed 5000"],
    },
    productType: {
      type: String,
      required: true,
      enum: ["Book", "Stationery", "Toy"], // Discriminator Key
    },
  },
  { timestamps: true, discriminatorKey: "productType" }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;