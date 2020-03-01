'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Category Schema
var CategorySchema = new Schema({ _id: false })

CategorySchema.add({
    name: {type: String},
    url_key: {type: String, unique: true},
    parent_id: [{ type: Number, ref: 'Category' }],
    is_active: {type: Number, default: 0},
    Created_date: { type: Date, default: Date.now},
    Updated_date: { type: Date, default: Date.now}
 });
module.exports = mongoose.model('Category', CategorySchema);
