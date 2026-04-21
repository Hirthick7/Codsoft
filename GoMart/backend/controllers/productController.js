const Product = require('../models/Product');

// @desc Fetch all products
// @route GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Fetch single product
// @route GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = async (req, res) => {
    const { name, price, description, image, category, stock } = req.body;

    const product = new Product({
        name,
        price,
        description,
        image,
        category,
        stock
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

module.exports = { getProducts, getProductById, createProduct };
