const cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Payment = require("../../models/payment.model");

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
      const product = await Product.findById(productId);
      userCart = new cart({
        userId,
        items: [
          { productId, name: product.name, quantity, price: product.price },
        ],
      });
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

// Delete product from cart
module.exports.deleteProduct = async (userId, productId, quantity) => {
  try {
    let userCart = await cart.findOne({ userId });

    if (!userCart) {
      return { message: "Cart not found" };
    }

    const itemIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const product = await Product.findById(productId);
      if (quantity) {
        if (userCart.items[itemIndex].quantity > quantity) {
          userCart.items[itemIndex].quantity -= quantity;
          userCart.totalPrice -= product.price * quantity;
        } else {
          userCart.totalPrice -=
            userCart.items[itemIndex].quantity * product.price;
          userCart.items.splice(itemIndex, 1);
        }
      } else {
        userCart.totalPrice -=
          userCart.items[itemIndex].quantity * product.price;
        userCart.items.splice(itemIndex, 1);
      }
      await userCart.save();
      return { message: "Product removed from cart", userCart };
    } else {
      return { message: "Product not found in cart" };
    }
  } catch (error) {
    return { message: "Error removing product from cart", error };
  }
};

module.exports.payment = async (userId) => {
  try {
    const userCart = await cart.findOne({ userId });

    if (!userCart || userCart.items.length === 0) {
      return { message: "Cart is empty" };
    }

    const payment = new Payment({
      userId,
      cartId: userCart._id,
      amountPaid: userCart.totalPrice,
    });

    await payment.save();

    return { message: "Payment pending", payment };
  } catch (error) {
    return { message: "Error processing payment", error };
  }
};
