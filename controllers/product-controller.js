const Product = require("../models/Product");
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

module.exports = { getProducts };