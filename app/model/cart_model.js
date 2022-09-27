const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sub schema
// -> when the object is too complex to defined inside the main schema, 
// we defined it outside for better readability and validation.
const ProductSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
}, {timestamps: true, versionKey: false});

const cartSchema = new Schema({
    // user and product!!
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    products: {
        type: [ProductSchema],
        default: [],
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('Cart', cartSchema);