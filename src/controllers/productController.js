const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = require("../models/Product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, price, image } = req.body;
  try {
    const product = await createProduct(name, price, image);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;

  const { name, price, image } = req.body;
  try {
    const product = await updateProduct(id, name, price, image);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await deleteProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
