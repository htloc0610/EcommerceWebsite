const adminUserRouter = require("./adminUser.router");

module.exports = (app) => {
  // Account
  app.use("/admin/account", adminUserRouter);
};
