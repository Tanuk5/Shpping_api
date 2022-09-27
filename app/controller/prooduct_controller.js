const Product = require('../model/product_model');
const http_formatter = require('../util/http_formatter');

const createProduct = async (request, response) => {
    try {
        const product = await Product.create(request.body);
        return response.status(201).json(
            http_formatter(product, "User created successfully"),
        );
    } catch ( err ) {
        return response.status(400).json(http_formatter(err, "Something went wrong, please try again", false));
    }
}

const getProducts = async (request, response) => {
    try {

        // wee need to do 2 things,
        // 1. count total -> why??
        // end calculate? -> who to do it?

        const {pageNo = 1, perPage = 20} = request.query; // can be undefined in the query params.
        const total_count = await Product.find({isDeleted: false}).count();
        const has_more = total_count > pageNo * perPage;
        const product = await Product.find({isDeleted: false}).skip(perPage * (pageNo - 1)).limit(perPage);

        return response.status(200).json(http_formatter({count: total_count, data: product, has_more}));
    } catch (error) {
        console.log(error);
        return response.status(400).json(http_formatter(error, "Something went wrong, please try again", false));
    }
}

const updateProduct = async (request, response) => {

    try {
        // update krna hota h, but dhyaan se krna hota h
    
        const {product_id} = request.params;
        if(!product_id) {
            throw (new Error('Product ID is mandatory'));
        }
    
        // // methods
        // // 1. call back method
        // // fetch and update method; // recommend;
        // // validation of allowed keys
        // let __updatedProduct = {};
        // // drawback ??
        // // nested object?
        // ['name', 'description', 'price', 'seller_name'].forEach(key => {
        //     const body = request.body;
        //     if(body[key] !== undefined && body[key] !== null) {
        //         __updatedProduct[key] = body[key];
        //     }
        // });
    
        // if(Object.keys(__updatedProduct).length === 0){
        //     return response.status(200).json(http_formatter({}));
        // }
    
        // const updatedProduct = await Product.findByIdAndUpdate(product_id, request.body);
    
        // find and then do selected update!!
        const current_product = await Product.findById(product_id);
        if(!current_product) {
            return response.status(400).json(http_formatter({}, "Invalid user id", false));
        }
        const {body} = request;
    
        // root level updates?
        ['name', 'description', 'seller_name', 'price'].forEach(key => {
            if(body[key] !== undefined && body[key] !== null){
                current_product[key] = body[key];
            }
        })
        
        // // nested object;
        // ['line1', 'state', 'pincode'].forEach(key => {
        //     const {address} = request.body;
        //     if(address && address[key] !== null && address[key] !== undefined) {
        //         current_product.address[key] = address[key];
        //     }
        // })
    
        const saved_maal = await current_product.save();
        return response.status(200).json(http_formatter(saved_maal, 'Product updated successfully'));
    } catch (error) {
        
    }
}

const deleteProduct = async (request, response) => {
    const { product_id } = request.body;
    try {
        // we don't actually delete things from db
        // we only set the the isDeleted filed to true!!
        const done = await Product.findByIdAndUpdate(product_id, {isDeleted: true});
        return response.status(200).json()
    } catch (error) {
        
    }
}

module.exports = { createProduct, getProducts, updateProduct };