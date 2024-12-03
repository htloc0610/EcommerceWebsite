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

    const payment = await paymentService.getPayment(paymentId);
    if (!payment) {
      return res.status(404).send("Payment not found.");
    }

    // Chuẩn bị dữ liệu để tạo liên kết thanh toán
    const requestData = {
      orderCode: payment.transactionId,
      amount: payment.amountPaid,
      description: "Thanh toan don hang",
      items: [
        {
          name: "Mì tôm hảo hảo ly",
          quantity: 1,
          price: 10,
        },
      ],
      cancelUrl: "http://127.0.0.1:3000/account/login",
      returnUrl: "http://127.0.0.1:3000/payment/success",
    };

    // Gọi hàm tạo liên kết thanh toán
    const paymentLink = await paymentMethod.createPaymentLink(
      requestData.orderCode,
      requestData.amount,
      requestData.description,
      requestData.items,
      requestData.returnUrl,
      requestData.cancelUrl
    );

    // Redirect đến URL thanh toán
    res.redirect(303, await paymentLink.checkoutUrl);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// [GET] /payment/success
module.exports.success = async (req, res) => {
  res.send("Payment success");
};
