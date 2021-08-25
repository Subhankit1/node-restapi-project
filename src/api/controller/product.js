const Product = require('../models/product');
const mongoose = require("mongoose");
const Order = require('../models/order');

//GET
exports.products_get_all = async(req,res,next) => {
    try {
        const product = await Product.find();
        res.status(200).json({
            message: 'Handling GET request to /products',
            product: product
        });
        
    } catch (error) {
        res.status(400).send(error);
    }
}

//POST
exports.create_product = async(req,res,next) => {

    try {
        console.log(req.file);
        //create new product
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        //save th new product
        const createProduct = await product.save();
        res.status(201).json({
            message: 'Handling POST request to /products',
            product: createProduct
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

//GET BY ID
exports.products_get_byid = async(req,res,next) => {
    try {
        const _id = req.params.productId;
        const product = await Product.findById(_id);
            res.status(200).json({
                message: 'Handling GET request to products by id',
                product: product
            });
    } catch (error) {
        res.status(400).send(error);
    }
}

//PATCH
exports.update_product = async(req,res,next) => {
    
    try {
        const id = req.params.parentId;
        const updateProduct = await Product.findByIdAndUpdate(id, req.body,{
            new : true
        });
        res.send(updateProduct);
    } catch (error) {
        res.status(404).send(error);
    }
}

//DELETE
exports.delete_product = async(req,res,next) => {
    try {
        const id = req.params.productId;
        const deleteProduct = await Product.findByIdAndDelete(id);
        if(!id){
            return res.status(400).send();
        }else{
            res.status(200).json({
                message: 'Deleted',
                product: deleteProduct
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
 }