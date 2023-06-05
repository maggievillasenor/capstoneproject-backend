const ProductService = require("../services/products");

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts();
    res.json({
      products: products,
    });
  } catch (err) {
    console.error("err", err);
    res.status(500).json({
      message: "Product were not retrieved",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    let product = await ProductService.getProductById(req.params.id);
    res.json({
      product: product,
    });
  } catch (err) {
    console.error("err", err);
    res.status(404).json({
      message: "Product was not found",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let productSaved = await ProductService.createProduct(req.body);
    res.status(201).json({
      message: "Product created",
      productSaved: productSaved,
    });
  } catch (err) {
    console.error("err", err);
    res.status(400).json({
      message: "Was not able to create the product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const updatedProduct = await ProductService.updateProduct(id, productData);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductService.deleteProduct(id);

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
};