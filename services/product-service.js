const Book = require("../models/Book");
const Stationery = require("../models/Stationery");
const Toy = require("../models/Toy");
const { createError } = require("../utils/errors");

const createProductBaseOnCategory = (category, categoryName, productData) => {
  switch (categoryName.toLowerCase()) {
    case "books":
      return {
        productType: "Book",
        newProduct: new Book({ ...productData, category, productType: "Book" }),
      };
    case "stationery":
      return {
        productType: "Stationery",
        newProduct: new Stationery({ ...productData, category, productType: "Stationery" }),
      };
    case "toys":
      return {
        productType: "Toy",
        newProduct: new Toy({ ...productData, category, productType: "Toy" }),
      };
    default:
      throw createError("Category doesn't exist", 400);
  }
};

module.exports = { createProductBaseOnCategory }