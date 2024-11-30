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
      isDeleted: false,
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

// Forgot password
module.exports.forgotPassword = async (email) => {
  try {
    const user = await adminUser.findOne({ email: email, isDeleted: false });
    if (!user) {
      return { message: "User not found" };
    }
    if (user.isDeleted) {
      return { error: "User account is deleted." };
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    await emailHelper.sendResetPasswordEmail(user.email, token);
    return { message: "Password reset email sent" };
  } catch (error) {
    return { message: "Internal server error" };
  }
};

// Reset password
module.exports.resetPassword = async (token, newPassword) => {
  try {
    const user = await adminUser.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return { message: "Invalid token" };
    }

    if (user.isDeleted) {
      return { error: "User account is deleted." };
    }

    const hash = crypto.createHash("sha256").update(newPassword).digest("hex");
    user.password = hash;
    user.resetPasswordToken = undefined; // Xóa token
    user.resetPasswordExpires = undefined; // Xóa thời gian hết hạn
    await user.save();

    return { message: "Password reset successful" };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { message: "Internal server error" };
  }
};
