const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/client/cart.controller");

// [GET] /cart
// Get all carts
router.get("/", cartController.index);

// [POST] /cart/add
// Add to carts
router.post("/add", cartController.addToCart);

module.exports = router;
