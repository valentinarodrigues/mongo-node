module.exports = (app) => {
    const products = require('../controllers/products.controller.js');

    // Create a new Product
    app.post('/products', products.create);

    // // Retrieve all Product
    // app.get('/products', products.findAll);

    // // Retrieve a single product with productId
    // app.get('/products/:productId', products.findOne);


    // Retrieve a single product with categoryId
    app.get('/products/:categoryId', products.findProducts);


    // Update a product with productId
    app.put('/products/:productId', products.update);

    // // Delete a product with productId
    // app.delete('/products/:productId', products.delete);
}