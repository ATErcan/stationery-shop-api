const updateCartItems = (cart, productId, quantity) => {
  const cartItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (cartItemIndex > -1) {
    // If product exists, update quantity
    cart.items[cartItemIndex].quantity = quantity;
    cart.items[cartItemIndex].updatedAt = Date.now();

    // If new quantity is 0, remove the product from the cart
    if (quantity === 0) {
      cart.items.splice(cartItemIndex, 1);
    }
  } else {
    // If product does not exist and quantity > 0, add it to cart
    if (quantity > 0) {
      cart.items.push({ product: productId, quantity });
    }
  }

  return cart.items.sort((a, b) => b.updatedAt - a.updatedAt);
};

module.exports = { updateCartItems };