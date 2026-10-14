const ProductModel = require("../models/product_model");

const postProduct = async(req, res, next) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json({
            message: "Product created",
            data: newProduct
        })
    } catch (error) {
        next(error)
    }
};

const getAllProducts = async(req, res, next) => {
    const {limit = 10, page = 1, search} = req.query;
    const skip = parseInt(page - 1) * parseInt(limit);

    let query = {};
    if (search){
        query = {
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}},
                {category: {$regex: search, $options: 'i'}}
            ]
        }
    }

    try {
        const products = await ProductModel.find(query)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        const totalProducts = await ProductModel.countDocuments(query)
        res.status(200).json({
            data: products,
            meta: {
                page: parseInt(page),
                limit: limit,
                total: totalProducts
            }
        })
    } catch (error) {
        next(error)
    }
}

const getProductById = async(req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({
            message: "Product found",
            data: product
        })
    } catch (error) {
        next(error)
    }
}

const updateProduct = async(req, res, next) => {
    try {
        const update = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!update){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({
            message: "Product updated",
            data: update
        })
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async(req, res, next) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted"});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}