const cartService = require("../../services/client/cart.services");

// [GET] /cart
// Get all carts
module.exports.index = async (req, res) => {
  try {
    // Get all carts
    const carts = await cartService.getCarts();
    // Return all carts
    return res.status(200).json(carts);
  } catch (err) {
    // Handle Error
    console.error(err);
    return res.status(500).json({ message: "Error fetching carts" });
  }
};

// [GET] /cart
// Get all carts
module.exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const result = await cartService.addToCart(userId, productId, quantity);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error adding to cart" });
  }
};

// [DELETE] /cart/add
// Delete product
module.exports.deleteProduct = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const result = await cartService.deleteProduct(userId, productId, quantity);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error delete product" });
  }
};

// [GET] /cart/payment
// Payment
module.exports.paymentProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await cartService.payment(userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error payment" });
  }
};
