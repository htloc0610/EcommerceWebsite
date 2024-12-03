const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const userRouter = require("./user.router");
const cartRouter = require("./cart.router");
const paymentRouter = require("./payment.router");

module.exports = (app) => {
  // Home
  app.use("/", homeRouter);

  // Product
  app.use("/products", productRouter);

  // Account
  app.use("/account", userRouter);

  // Cart
  app.use("/cart", cartRouter);

  // Payment
  app.use("/payment", paymentRouter);
};
