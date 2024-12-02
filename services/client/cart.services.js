const cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// Get carts
module.exports.getCarts = async (filter) => {
  try {
    // Get all carts
    const carts = await cart.find();
    // Return all carts
    return carts;
  } catch (err) {
    // Handle Error
    console.error(err);
    return { message: "Error fetching carts" };
  }
};

// Add to cart
module.exports.addToCart = async (userId, productId, quantity) => {
  try {
    let userCart = await cart.findOne({ userId });

    if (!userCart) {
      userCart = new cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = userCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        userCart.items[itemIndex].quantity += Number(quantity);
      } else {
        userCart.items.push({ productId, quantity });
      }
    }

    const product = await Product.findById(productId);
    userCart.totalPrice += product.price * quantity;

    await userCart.save();
    return { message: "Product added to cart", userCart };
  } catch (error) {
    return { message: "Error adding to cart", error };
  }
};
