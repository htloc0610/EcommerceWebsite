const accountService = require("../../services/admin/adminAccount.services");

// [GET] admin/account/login
module.exports.index = (req, res) => {
  res.send("Login admin page");
};

// [GET] admin/account/register
module.exports.register = (req, res) => {
  res.send("Register admin page");
};

// [POST] admin/account/register
module.exports.createAccount = async (req, res) => {
  const { username, email, password } = req.body;
  const user = {
    username,
    email,
    password,
  };
  try {
    const savedUser = await accountService.createAccount(user);
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send("Error creating account");
  }
};

// [POST] admin/account/login
module.exports.loginAccount = async (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  try {
    const User = await accountService.loginAccount(user);
    res.send(User);
  } catch (err) {
    res.status(500).send("Error logging in");
  }
};

// [POST] admin/account/forgot-password/:email
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await accountService.forgotPassword(email);
    res.status(200).send("Password reset link sent");
  } catch (err) {
    res.status(500).send("Error sending password reset link");
  }
};

// [POST] admin/account/reset-password/
module.exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await accountService.resetPassword(token, newPassword);
    res.status(200).send(user.message);
  } catch (err) {
    res.status(500).send("Error resetting password");
  }
};

// [GET] admin/account/logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("admin/account/login");
  });
};
