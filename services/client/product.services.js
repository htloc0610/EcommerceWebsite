const Product = require("../../models/product.model");

// Get products
module.exports.getProducts = async (filter) => {
  try {
    // Get all products
    const products = await Product.find({ deleted: filter.deleted })
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
    // Find product by ID and delete
    const result = await Product.findByIdAndUpdate(
      productId,
      { deleted: true },
      { new: true }
    );

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

// Detail product
module.exports.detailProduct = async (productId) => {
  try {
    // Find product by ID and delete
    const result = await Product.findOne({ _id: productId, deleted: false });

    // Handle no product found
    if (!result) {
      return { message: "Product not found" };
    }

    // Return success message
    return result;
  } catch (err) {
    // Handle Error
    console.error(err);
    return { message: "Error getting product" };
  }
};

// Update product
module.exports.updateProduct = async (productId, dataProduct) => {
  try {
    // Find product by ID and update
    const result = await Product.findByIdAndUpdate(productId, dataProduct, {
      new: true,
    });

    // Handle no product found
    if (!result) {
      return { message: "Product not found" };
    }

    // Return updated product
    return result;
  } catch (err) {
    // Handle Error
    console.error(err);
    return { message: "Error updating product" };
  }
};

// Get products
module.exports.findProduct = async (productName) => {
  try {
    // Get all products using regex for case-insensitive search
    const products = await Product.find({
      deleted: false,
      name: { $regex: new RegExp(productName, "i") },
    });
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
