const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();
const uploadClound = require("../middlewares/uploadClound.middlewares");

const productController = require("../controllers/product.controller");

// [GET] /products
// Get all products
router.get("/", productController.index);

// [POST] /products
// Create new product
router.post(
  "/",
  //   upload.single("image"),
  //   uploadClound.upload,
  productController.newProduct
);

module.exports = router;
