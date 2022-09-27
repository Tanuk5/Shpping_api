const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name :{
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
    description:{
        type: String,
        required: false,
        default: "",
        maxLength: 500,
        trim: true,
    },
    seller_name:{
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
        max: 100000,
        min: 0,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('Product', productSchema);