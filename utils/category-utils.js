const Category = require("../models/Category");
const { createError } = require("./errors");

const isCategoryExist = async (name, id) => {
  const existingCategory = await Category.findOne({ name: name.toLowerCase() });
  if (existingCategory && existingCategory._id.toString() !== id) {
    throw createError("Category name already exists", 409);
  }
}

module.exports = { isCategoryExist };