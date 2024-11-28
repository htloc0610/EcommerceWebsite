const User = require("../../models/user.model");
const emailHelper = require("../../helpers/emailService.helper");
const crypto = require("crypto");

// Create account
module.exports.createAccount = async (user) => {
  try {
    const hash = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("hex");
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hash,
      verificationToken: verificationToken,
    });

    const savedUser = await newUser.save();
    emailHelper.sendVerificationEmail(user.email, verificationToken);
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
    const existingUser = await User.findOne({
      username: user.username,
      isDeleted: false,
    });
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (!existingUser.isVerified) {
      throw new Error("User email not verified");
    }

    const hash = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("hex");
    const isMatch = hash === existingUser.password;

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const { password, isVerified, ...userWithoutPassword } =
      existingUser.toObject();
    return { message: "Login successful", user: userWithoutPassword };
  } catch (err) {
    return { message: "Error logging in", error: err.message };
  }
};

// Verify account
module.exports.verifyAccount = async (token) => {
  try {
    // Find user
    const user = await User.findOne({ verificationToken: token });
    if (user.isDeleted) {
      return { error: "User account is deleted." };
    }

    if (!user) {
      return { error: "Invalid or expired token." };
    }

    // Cập nhật trạng thái xác minh
    user.isVerified = true;
    user.verificationToken = undefined; // Xóa token sau khi xác minh
    await user.save();

    return { message: "Email verification successful!" };
  } catch (err) {
    return { error: err.message };
  }
};

// Forgot password
module.exports.forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email, isDeleted: false });
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
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (user.isDeleted) {
      return { error: "User account is deleted." };
    }

    if (!user) {
      return { message: "Invalid token" };
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
