const paymentService = require("../../services/client/payment.services");
const paymentMethod = require("../../helpers/paymentService.helper");

// [GET] /payment
module.exports.index = async (req, res) => {
  res.send("Payment home");
};

// [GET] /payment/pay
module.exports.pay = async (req, res) => {
  try {
    const paymentId = req.query.id; // Lấy giá trị tham số 'id' từ query string
    if (!paymentId) {
      return res.status(400).send("Payment ID is required.");
    }

    const { payment, items } = await paymentService.getPayment(paymentId);

    console.log(`${payment._id}`);

    // Chuẩn bị dữ liệu để tạo liên kết thanh toán
    const requestData = {
      orderCode: Math.floor(Math.random() * 1000000),
      amount: payment.amountPaid,
      description: "Thanh toan don hang",
      items: items,
      cancelUrl: "http://127.0.0.1:3000/account/login",
      returnUrl: `http://127.0.0.1:3000/payment/success/${payment._id}`,
    };

    // Gọi hàm tạo liên kết thanh toán
    const paymentLink = await paymentMethod.createPaymentLink(requestData);

    // Redirect đến URL thanh toán
    res.redirect(303, await paymentLink.checkoutUrl);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// [GET] /payment/success
module.exports.success = async (req, res) => {
  const paymentId = req.params.id;
  if (!paymentId) {
    return res.status(400).send("Payment ID is required.");
  }

  try {
    await paymentService.setPaymentStatusSuccess(paymentId);
    res.send("Payment status success.");
  } catch (error) {
    res.status(500).send("Failed to update payment status.");
  }
};
