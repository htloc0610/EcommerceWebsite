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
  console.log(req.body);

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
