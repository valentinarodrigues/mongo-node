const Product = require('../models/products.js');

// Create and Save a new product
exports.create = (req, res) => {
    console.log(req.body)
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create Product
    const product = new Product({
            sku_id: req.body.sku_id,
            name: req.body.name,
            url_key: req.body.url_key,
            parent_id: req.body.parent_id,
            is_active: req.body.is_active,
            barcode: req.body.barcode,
            image_name: req.body.image_name,
            price: req.body.price,
            discount_price: req.body.discount_price,
            gst: req.body.gst,
            stock: req.body.stock,
            category: req.body.category,
            Created_date: req.body.Created_date,
            Updated_date:req.body.Updated_date
    });

    // Save product in the database
    product.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating product."
        });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};


// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};


// Fetch products based on category
exports.findProducts = (req, res) => {
category_id = req.params.categoryId
  var query = {category: category_id}
    Product.find(query)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.categoryId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.categoryId
        });
    });
}


// Update a product identified by the productId in the request
exports.update = (req, res) => {
    // Find product and update it with the request body
    Product.findByIdAndUpdate({_id: req.params.productId}, 
        { $set: {
            sku_id: req.body.sku_id,
            name: req.body.name,
            url_key: req.body.url_key,
            parent_id: req.body.parent_id,
            is_active: req.body.is_active,
            barcode: req.body.barcode,
            image_name: req.body.image_name,
            price: req.body.price,
            discount_price: req.body.discount_price,
            gst: req.body.gst,
            stock: req.body.stock,
            category: req.body.category,
            Created_date: req.body.Created_date,
            Updated_date:req.body.Updated_date
        }
        
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};


// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
    product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};