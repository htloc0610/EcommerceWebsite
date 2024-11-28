const passport = require("passport");

module.exports.authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/account/login");
    }
    const { role } = req.user.role;
    if (role !== requiredRole) {
      return res
        .status(403)
        .send("Forbidden: You do not have permission to access this resource.");
    }
    next();
  };
};
