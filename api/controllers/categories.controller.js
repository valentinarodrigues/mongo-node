const Category = require('../models/category.js');

// Create and Save a new category
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Create Category
    const category = new Category({
            // _id: req.body._id,
            name: req.body.name,
            url_key: req.body.url_key,
            parent_id: req.body.parent_id,
            is_active: req.body.is_active,
            Created_date: req.body.Created_date,
            Updated_date:req.body.Updated_date
    });

    // Save category in the database
    category.save().then(data => {
        console.log("Saved")
        return res.send(data);

    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating category."
        });
    });

};

// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
    Category.find()
    .then(category => {
        res.send(category);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving category."
        });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });            
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Category with id " + req.params.categoryId
        });
    });
};

// Find all child categories of a category
exports.findChildCategory = (req, res) => {
    Category.aggregate([
        { $group : { _id : "$parent_id", child_categories: { $push: "$name" } } }
      ])
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });            
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Category with id " + req.params.categoryId
        });
    });
};

// Update a Category identified by the categoryId in the request

// exports.findOne = (req, res) => {
//     // Find category and update it with the request body
//     Category.findByIdAndUpdate(req.params.categoryId, {
//         title: req.body.title || "Untitled category",
//         content: req.body.content
//     }, {new: true})
//     .then(category => {
//         if(!category) {
//             return res.status(404).send({
//                 message: "category not found with id " + req.params.categoryId
//             });
//         }
//         res.send(category);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "category not found with id " + req.params.categoryId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating category with id " + req.params.categoryId
//         });
//     });
// };





// Delete a category with the specified categoryId in the request
// exports.delete = (req, res) => {
//     Category.findByIdAndRemove(req.params.categoryId)
//     .then(category => {
//         if(!category) {
//             return res.status(404).send({
//                 message: "category not found with id " + req.params.categoryId
//             });
//         }
//         res.send({message: "category deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "category not found with id " + req.params.categoryId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete category with id " + req.params.categoryId
//         });
//     });
// };