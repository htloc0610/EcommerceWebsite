const paymentService = require("../../services/client/payment.services");

// [GET] account/login
module.exports.index = async (req, res) => {
  try {
    const paymentId = req.query.id; // Lấy giá trị của tham số 'id'
    const payment = await paymentService.getPayment(paymentId);
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
