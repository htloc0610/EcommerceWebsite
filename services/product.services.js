const Product = require("../models/product.model");

// Get products
module.exports.getProducts = async (filter) => {
  try {
    // Get all products
    const products = await Product.find()
      .sort({ [filter.title]: filter.type })
      .limit(filter.numItems);
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

// Delete product
module.exports.deleteProduct = async (productId) => {
  try {
    const product = await Product.find({ _id: productId });
    console.log(product);

    // Find product by ID and delete
    const result = await Product.findByIdAndDelete(productId);

    // Handle no product found
    if (!result) {
      return { message: "Product not found" };
    }

    // Return success message
    return { message: "Product deleted successfully" };
  } catch (err) {
    // Handle Error
    console.error(err);
    return { message: "Error deleting product" };
  }
};
