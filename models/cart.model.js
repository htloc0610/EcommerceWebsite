const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến bảng User
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Tham chiếu đến bảng Product
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    status: { type: String, enum: ["active", "completed"], default: "active" },
    totalPrice: { type: Number, default: 0 }, // Tổng giá trị giỏ hàng
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema, "carts");
