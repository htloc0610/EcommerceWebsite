const productService = require("../services/product.services");

// [GET] /products
// Get products
module.exports.index = async (req, res) => {
  const filter = {
    title: "name",
    type: "desc",
    numItems: 4,
  };
  if (req.query.title) {
    filter.title = req.query.title;
  }
  if (req.query.type) {
    filter.type = req.query.type;
  }
  try {
    // Get all products
    const products = await productService.getProducts(filter);
    // Handle no products
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Return all products
    return res.status(200).json(products);
  } catch (err) {
    // Handle Error
    console.error(err);
    return res.status(500).json({ message: "Error fetching products" });
  }
};

// [POST] /products
// Create new product
module.exports.newProduct = async (req, res) => {
  const dataProduct = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
  };

  // Validate
  if (!dataProduct.name || !dataProduct.price) {
    return res.status(400).json({ message: "Invalid data" });
  }

  // Call service
  const product = await productService.newProduct(dataProduct);

  // Check successful
  if (product) {
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } else {
    return res.status(500).json({ message: "Error creating product" });
  }
};

// [DELETE] /products/:id
// Delete product
module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // Find product by ID and delete
    const result = await productService.deleteProduct(productId);

    // Handle no product found
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Return success message
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    // Handle Error
    console.error(err);
    return res.status(500).json({ message: "Error deleting product" });
  }
};

// [GET] /products/:id
// Get detail product
module.exports.detailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // Find product by ID
    const result = await productService.detailProduct(productId);

    // Handle no product found
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Return success message
    return res.status(200).json(result);
  } catch (err) {
    // Handle Error
    console.error(err);
    return res.status(500).json({ message: "Error deleting product" });
  }
};

// [PATCH] /products/:id
// Update product
module.exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const dataProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    };
    // Update product by ID
    const updatedProduct = await productService.updateProduct(
      productId,
      dataProduct
    );

    // Handle no product found
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Return success message
    return res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    // Handle Error
    console.error(err);
    return res.status(500).json({ message: "Error updating product" });
  }
};
