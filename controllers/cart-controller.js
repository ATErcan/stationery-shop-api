const mongoose = require("mongoose");

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { createError } = require("../utils/errors");
const { updateCartItems } = require("../services/cart-service");

const getCart = async (req, res, next) => {
  try {
    const { userId } = req;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return next(createError("Cart not found", 404));
    }

    const sortedItems = cart.items.sort((a, b) => b.updatedAt - a.updatedAt);

    const pageNumber = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (pageNumber - 1) * pageSize;

    const paginatedItems = sortedItems.slice(skip, skip + pageSize);

    const totalItems = cart.items.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    res.status(200).json({
      page: pageNumber,
      totalPages,
      totalItemsInCart: totalItems,
      pageSize,
      data: paginatedItems,
    });
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return next(createError("Invalid product ID", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(createError("Product not found", 404));
    }

    if(quantity < 0) {
      return next(createError("Quantity cannot be negative", 400));
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    cart.items = updateCartItems(cart, productId, quantity);

    await cart.save();

    res.status(200).json({ data: cart.items });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getCart, addToCart };
