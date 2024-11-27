const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = 10;

// Create account
module.exports.createAccount = async (user) => {
  try {
    const hash = await bcrypt.hash(user.password, saltRounds);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hash,
      verificationToken: verificationToken,
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
    console.error("Error creating account:", err);
    throw err;
  }
};

// Login account
module.exports.loginAccount = async (user) => {
  try {
    const existingUser = await User.findOne({ username: user.username });
    if (!existingUser) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const { password, ...userWithoutPassword } = existingUser.toObject();
    return { message: "Login successful", user: userWithoutPassword };
  } catch (err) {
    return { message: "Error logging in" };
  }
};
