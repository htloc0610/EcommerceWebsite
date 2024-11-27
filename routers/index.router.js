const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const userRouter = require("./user.router");

module.exports = (app) => {
  // Home
  app.use("/", homeRouter);

  // Product
  app.use("/products", productRouter);

  // Account
  app.use("/account", userRouter);
};
