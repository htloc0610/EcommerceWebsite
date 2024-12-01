const adminUser = require("../../models/adminUser.model");
const emailHelper = require("../../helpers/emailService.helper");
const crypto = require("crypto");

// Create account
module.exports.createAccount = async (user) => {
  try {
    const hash = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("hex");
    const newUser = new adminUser({
      username: user.username,
      email: user.email,
      password: hash,
    });

    const savedUser = await newUser.save();

    const {
      password,
      verificationToken: token,
      ...userWithoutSensitiveInfo
    } = savedUser.toObject();
    return {
      message: "User registered successfully. Please verify email",
      user: userWithoutSensitiveInfo,
    };
  } catch (err) {
    return { message: "Error creating account", error: err.message };
  }
};

// Login account
module.exports.loginAccount = async (user) => {
  try {
    const existingUser = await adminUser.findOne({
      username: user.username,
    });
    if (!existingUser) {
      throw new Error("User not found");
    }

    const hash = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("hex");
    const isMatch = hash === existingUser.password;

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const { password, ...userWithoutPassword } = existingUser.toObject();
    return { message: "Login successful", user: userWithoutPassword };
  } catch (err) {
    return { message: "Error logging in", error: err.message };
  }
};
