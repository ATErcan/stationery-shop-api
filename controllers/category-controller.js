const Category = require("../models/Category");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({ data: categories }).sort({ name: 1 });
  } catch (error) {
    return next(error);
  }
};

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

module.exports = { getAllCategories, addNewCategory };