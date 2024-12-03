const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/client/cart.controller");

// [GET] /cart
// Get all carts
router.get("/", cartController.index);

// [POST] /cart/add
// Add to carts
router.post("/add", cartController.addToCart);

// [DELETE] /cart/add
// Delete product
router.delete("/add", cartController.deleteProduct);

// [GET] /cart/payment
// Payment
router.get("/payment", cartController.paymentProducts);

module.exports = router;
