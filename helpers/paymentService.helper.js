const PayOS = require("@payos/node");

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

module.exports.createPaymentLink = async (requestData) => {
  return await payos.createPaymentLink(requestData);
};

// app.get("/test", async (req, res) => {
//   const requestData = {
//     orderCode: 2342246,
//     amount: 2000,
//     description: "Thanh toan don hang",
//     items: [
//       {
//         name: "Mì tôm hảo hảo ly",
//         quantity: 1,
//         price: 1000,
//       },
//     ],
//     cancelUrl: "http://127.0.0.1:3000/account/login",
//     returnUrl: "http://127.0.0.1:3000/products/67466c5df4d1172583c2845b",
//   };
//   const paymentLink = paymentHelper.createPaymentLink(requestData);
//   res.redirect(303, (await paymentLink).checkoutUrl);
// });

// module.exports.createPaymentLink = async (
//   orderCode,
//   amount,
//   description,
//   items,
//   returnUrl,
//   cancelUrl
// ) => {
//   const requestData = {
//     orderCode: Math.floor(Math.random() * 1000000),
//     amount: amount,
//     description: description,
//     items: items,
//     cancelUrl: cancelUrl,
//     returnUrl: returnUrl,
//   };
//   return await payos.createPaymentLink(requestData);
// };
