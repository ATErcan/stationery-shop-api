const mongoose = require("mongoose");

const Product = require("./Product");

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    maxlength: [30, "Author name must be at most 30 characters"],
    required: [true, "Author is required"],
  },
  publisher: {
    type: String,
    maxlength: [30, "Publisher name must be at most 30 characters"],
    required: [true, "Publisher is required"],
  },
  pages: {
    type: Number,
    min: [1, "A book must have at least 1 page"],
    max: [20000, "A book cannot have more than 20,000 pages"],
    required: [true, "Number of pages is required"],
  },
});

const Book = Product.discriminator("Book", bookSchema);

module.exports = Book;
