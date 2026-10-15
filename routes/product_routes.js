const express = require("express");
const router = express.Router();
const {
    postProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/product_controller");

const {
    validateProductCreate,
    validateProductUpdate
} = require("../validators/product_validators");

router.post('/products', validateProductCreate, postProduct);

router.get('/products', getAllProducts);

router.get('/products/:id', getProductById);

router.put('/products/:id', validateProductUpdate, updateProduct);

router.delete('/products/:id', deleteProduct);

module.exports = router; 