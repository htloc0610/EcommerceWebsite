const accountService = require("../services/account.services");

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
