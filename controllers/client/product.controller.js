const productService = require('../../services/client/product.services')

// [GET] /products
// Get products
module.exports.index = async (req, res) => {
  const filterData = {
    deleted: false,
    title: req.query.title || "name",
    type: req.query.type || "desc",
    numItems: 4,
  };
  
  try {
    const products = await productService.getProducts(filterData);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (err) { 
    console.log(err);
    return res.status(500).json({ message: "Error fetching products" });
  }
}

// [POST] /products
// Create new product
module.exports.newProduct = async function (req, res) { 
  const dataProduct = { 
    name: req.body.name, 
    price: req.body.price, 
    description: req.body.description,
    image: req.body.image,
    category: req.body.category
  };

  if (!dataProduct.name || dataProduct.price === undefined) { 
    return res.status(400).json({ message: "Invalid data" });
  }

  const product = await productService.newProduct(dataProduct);

  if (product) {
    return res.status(201).json({ message: "Product created successfully", product });
  } else {
    return res.status(500).json({ message: "Error creating product" });
  }
}
