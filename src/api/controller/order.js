const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require("mongoose");

//Get
exports.orders_get_all =  async(req,res,next) => {
    try {
        const order = await Order.find();
        res.status(200).json({
            message: 'Orders were fetched',
            order: order
        });
        
    } catch (error) {
        res.status(400).send(error);
    }
}

//POST
exports.orders_create_order = async(req,res,next) => {
    try {
        //create new product
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        });
        //save th new product
        const createOrder = await order.save();
        res.status(201).json({
            message: 'Order was created',
            order: order
        });
    } catch (error) {
        res.status(400).json({
            error
        })
    }    
}

//GET BY ID
exports.get_by_id =  async(req,res,next) => {
    try {
        const _id = req.params.orderId;
        const order = await Order.findById(_id);
        res.status(200).json({
            message: 'Orders details',
            order: order
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

//DELETE Order
exports.delete_order_byid = async(req,res,next) => {
    try {
        const id = req.params.orderId;
        const deleteOrder = await Order.findByIdAndDelete(id);
        if(!id){
            return res.status(400).send();
        }else{
            res.status(200).json({
                message: 'Orders deleted',
                order: deleteOrder
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}