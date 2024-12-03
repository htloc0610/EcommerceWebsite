const Payment = require("../../models/payment.model");
const cart = require("../../models/cart.model");

// Get products
module.exports.getPayment = async (userId) => {
  try {
    // Get all payments for the user
    const payment = await Payment.findOne({ userId: userId }).select(
      "_id userId amountPaid transactionId"
    );
    // Handle no payment
    if (payment.length === 0) {
      return { message: "No payment found" };
    }

    const userCart = await cart.findOne({ userId });
    if (!userCart) {
      return { message: "Cart not found" };
    }
    const items = userCart.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Return all payment
    return { payment, items };
  } catch (err) {
    // Handle Error
    console.error(err);
    return { message: "Error fetching payments" };
  }
};
