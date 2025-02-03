const mongoose = require("mongoose");

const Product = require("./Product");

const stationerySchema = new mongoose.Schema({
  color: {
    type: String,
    maxlength: [20, "Color name must be at most 20 characters"],
  },
  brand: {
    type: String,
    maxlength: [30, "Brand name must be at most 30 characters"],
  },
});

const Stationery = Product.discriminator("Stationery", stationerySchema);

module.exports = Stationery;
