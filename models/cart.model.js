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
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    status: { type: String, enum: ["active", "completed"], default: "active" },
    totalPrice: { type: Number, default: 0 }, // Tổng giá trị giỏ hàng
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  if (this.isModified("items")) {
    const productIds = this.items.map((item) => item.productId);
    const products = await mongoose
      .model("Product")
      .find({ _id: { $in: productIds } });

    this.totalPrice = this.items.reduce((total, item) => {
      const product = products.find((p) => p._id.equals(item.productId));
      return total + product.price * item.quantity;
    }, 0);
  }
  next();
});
module.exports = mongoose.model("Cart", cartSchema, "carts");
