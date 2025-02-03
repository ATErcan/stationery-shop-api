const Category = require("../models/Category");
const { createError } = require("../utils/errors");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({ data: categories }).sort({ name: 1 });
  } catch (error) {
    return next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      throw createError("Category not found!", 404);
    }

    res.status(200).json({ data: category });
  } catch (error) {
    if (error.name === "CastError") {
      return next(createError("Invalid category ID format", 400));
    }
    return next(error);
  }
}

const addNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });

    await category.save();
    res.status(201).json({ data: category });
  } catch (error) {
    if (error.code === 11000) {
      return next(createError("Category name already exists", 409));
    }
    return next(error);
  }
}

module.exports = { getAllCategories, addNewCategory, getCategoryById };