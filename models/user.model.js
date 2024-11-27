const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Loại bỏ khoảng trắng đầu và cuối
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Chuyển email thành chữ thường
      match: [/\S+@\S+\.\S+/, "Invalid email format"], // Kiểm tra định dạng email
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Mật khẩu phải có ít nhất 6 ký tự
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true } // Tự động thêm `createdAt` và `updatedAt`
);

// Tạo model
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
