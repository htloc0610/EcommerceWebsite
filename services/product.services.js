const Product = require("../models/product.model");

// Get products
module.exports.getProducts = async () => {
  try {
    // Get all products
    const products = await Product.find();

    // Handle no products
    if (products.length === 0) {
      return { message: "No products found" };
    }

    // Return all products
    return products;
  } catch (err) {
    // Handle Error
    console.error(err);
    return { message: "Error fetching products" };
  }
};

// Create product
module.exports.newProduct = async (dataProduct) => {
  try {
    // Create new productSchema
    const product = new Product({
      name: dataProduct.name,
      price: dataProduct.price,
      description: dataProduct.description,
      image: dataProduct.image,
      category: dataProduct.category,
    });

    // Save to database
    await product.save();

    // Return product
    return product;
  } catch (err) {
    // Handle Error
    console.error(err);
    return null;
  }
};
