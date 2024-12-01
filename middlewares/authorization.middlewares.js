const passport = require("passport");

module.exports.authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      if (requiredRole == "user") {
        return res.redirect("/account/login");
      } else {
        return res.redirect("/admin/login");
      }
    }
    const role = req.user.role;
    if (role !== requiredRole) {
      return res
        .status(403)
        .send("Forbidden: You do not have permission to access this resource.");
    }
    next();
  };
};
