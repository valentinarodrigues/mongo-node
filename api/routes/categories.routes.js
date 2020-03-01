module.exports = (app) => {
    const category = require('../controllers/categories.controller.js');

    // Create a new category
    app.post('/category', category.create);

    // Retrieve all categories
    app.get('/category', category.findAll);

    // Retrieve a single cateogory with categoryId
    app.get('/category/:categoryId', category.findOne);

    // Retrieve a single cateogory with categoryId
    app.get('/categories', category.findChildCategory);

    // // Update a category with categoryId
    // app.put('/category/:categoryId', category.update);

    // // Delete a category with categoryId
    // app.delete('/category/:categoryId', category.delete);
}