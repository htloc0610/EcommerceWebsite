const Payment = require("../../models/payment.model");

// Get products
module.exports.getPayment = async (userId) => {
  try {
    // Get all payments for the user
    const payments = await Payment.find({ userId: userId });
    // Handle no payments
    if (payments.length === 0) {
      return { message: "No payments found" };
    }
    // Return all payments
    return payments;
  } catch (err) {
    // Handle Error
    console.error(err);
    return { message: "Error fetching payments" };
  }
};
