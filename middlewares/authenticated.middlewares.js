// auth.middleware.js
const passport = require("passport");

// Middleware Passport
module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`Hello, ${req.user.username}`);
    return next(); // Allow continue
  }
  res.redirect("/account/login"); // Redirect to login
};
