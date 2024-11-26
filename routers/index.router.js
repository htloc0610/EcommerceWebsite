const homeRouter = require("./home.router");
const productRouter = require("./product.router");

module.exports = (app) => {
  // Home
  app.use("/", homeRouter);

  // Product
  app.use("/products", productRouter);
};
