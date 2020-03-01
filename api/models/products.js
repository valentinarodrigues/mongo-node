'use strict';
const Category = require('../models/category.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Product Schema 
var ProductSchema = new Schema()
ProductSchema.add({
        // _id: { type: Schema.ObjectId, required: true },
        sku_id: {type: Number, default: 0},
        name: {type: String},
        url_key: {type: String},
        // parent_id: [ProductSchema],
        is_active: {type: Number, default: 0},
        barcode: {type: String},
        image_name: {type: String},
        price: {type: Number},
        discount_price: {type: Number},
        gst: {type: Number},
        stock: {type: Number},
        category:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        Created_date: { type: Date, default: Date.now},
        Updated_date: { type: Date, default: Date.now}
     });

module.exports = mongoose.model('Product', ProductSchema);
