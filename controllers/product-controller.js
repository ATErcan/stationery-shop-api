const Product = require("../models/Product");
const { createError } = require("../utils/errors");
const { buildProductQuery, buildSortQuery } = require("../utils/product-utils");

const getProducts = async (req, res, next) => {
  try {
    const query = buildProductQuery(req);
    const sortOption = buildSortQuery(req);

    const pageNumber = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (pageNumber - 1) * pageSize;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      page: pageNumber,
      totalPages,
      totalProducts,
      pageSize,
      data: products,
    });
  } catch (error) {
    return next(error);
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return next(createError("Product not found!", 404));
    }

    res.status(200).json({ data: product });
  } catch (error) {
    if (error.name === "CastError" || error.name === "BSONTypeError") {
      return next(createError("Invalid product ID", 400));
    }
    return next(error);
  }
}

module.exports = { getProducts, getProductById };