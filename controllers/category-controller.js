const Category = require("../models/Category");
const { isCategoryExist } = require("../utils/category-utils");
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
    if (error.name === "CastError" || error.name === "BSONTypeError") {
      return next(createError("Invalid category ID", 400));
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
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (val) => val.message
      );
      const combinedMessage = validationErrors.join(", ");
      return next(createError(`Validation Error: ${combinedMessage}`, 400));
    }
    return next(error);
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      throw createError("Category not found!", 404);
    }

    await isCategoryExist(name, id);

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    res.status(200).json({ data: updatedCategory });
  } catch (error) {
    if (error.code === 11000) {
      return next(createError("Category name already exists", 409));
    }
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (val) => val.message
      );
      const combinedMessage = validationErrors.join(", ");
      return next(createError(`Validation Error: ${combinedMessage}`, 400));
    }
    return next(error);
  }
}

module.exports = {
  getAllCategories,
  addNewCategory,
  getCategoryById,
  updateCategory,
};