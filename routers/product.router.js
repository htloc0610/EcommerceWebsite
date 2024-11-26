const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// [GET] /products
// Get all products
router.get("/", productController.index);

// [POST] /products
// Create new product
router.post("/", productController.newProduct);

module.exports = router;
