const adminUserRouter = require("./adminUser.router");
const adminHomeRouter = require("./home.router");

module.exports = (app) => {
  // Account
  app.use("/admin", adminUserRouter);

  app.use("/admin", adminHomeRouter);
};
