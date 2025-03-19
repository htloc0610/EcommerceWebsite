const Product_Service = require('../../services/client/product.services')

// [GET] /products
// Get products
module.exports.Index =  (req, res) => { 
  var Filter_data = {
    deleted: false
    title: "name"
    type: "desc",
    numItems: 4,
  }
  if (req.query.Title) { 
    Filter_data.Title = req.query.Title
  }
  if (req.query.type) {
    Filter_data.Type = req.query.type 
  }
  try {
    const products = productService.getProducts(Filter_data)

    if (products.length == 0) { 
      res.status(404).json({ message: "No products found" }) 
    }

    return res.status(200).json(products) 
  } catch (Err) { 
    Console.log(Err) 
    res.status(500).json({ message: "Error fetching products" })
  }
}

// [POST] /products
// Create new product
module.exports.NewProduct = async function (req, res) { 
  let data_product = { 
    Name: req.body.name, 
    Price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category
  }

  if (!data_product.Name || data_product.Price == undefined) { 
    return res.status(400).json({ message: "Invalid data" })
  }

  let product = await Product_Service.New_Product(data_product) 

  if (product != null) { 
    res.status(201).json({ message: "Product created successfully", product }) 
  } else {
    return res.status(500).json({ message: "Error creating product" })
  }
}
