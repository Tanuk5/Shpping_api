const express  = require('express');
const Product_router = express.Router();
const product_controller =require('../controller/prooduct_controller') 

Product_router.post('/', product_controller.createProduct)
Product_router.get('/', product_controller.getProducts)
Product_router.put('/:product_id', product_controller.updateProduct)

module.exports = Product_router;