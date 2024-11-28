const accountService = require("../../services/client/account.services");

// [GET] account/login
module.exports.index = (req, res) => {
  res.send("Login page");
};

// [GET] account/register
module.exports.register = (req, res) => {
  res.send("Register page");
};

// [POST] account/register
module.exports.createAccount = async (req, res) => {
  const { username, email, password } = req.body;
  const user = { username, email, password };

  try {
    const savedUser = await accountService.createAccount(user);
    res.status(201).send(savedUser);
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).send("Error creating account");
  }
};

// [POST] account/login
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

// [GET] account/verify/:token
module.exports.verifyAccount = async (req, res) => {
  try {
    const { token } = req.query;
    // Find user
    const user = await accountService.verifyAccount(token);
    if (user.error) {
      return res.status(400).send(user.error);
    }
    res.redirect("/account/login");
  } catch (err) {
    res.status(500).send("Error verifying account");
  }
};

// [POST] account/forgot-password/:email
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await accountService.forgotPassword(email);
    res.status(200).send("Password reset link sent");
  } catch (err) {
    res.status(500).send("Error sending password reset link");
  }
};

// [POST] account/reset-password/
module.exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await accountService.resetPassword(token, newPassword);
    res.status(200).send(user.message);
  } catch (err) {
    res.status(500).send("Error resetting password");
  }
};

// [GET] account/logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/account/login");
  });
};
