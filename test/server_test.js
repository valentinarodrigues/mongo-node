const dbConfig = require('../config/database.config.js');
const express = require('express')
const app = express();
app.use(express.json())

require('../api/routes/products.routes.js')(app);
require('../api/routes/categories.routes.js')(app);

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})

const MongoClient = require('mongodb').MongoClient
const dbport = 3001
// Configuring the database
const dbConfig = require('../config/database.config.js');
var db



app.get('/', (req, res)=>{
  console.log(__dirname)
  res.sendFile(__dirname + '/index.html')
})

// app.post('/test', (req, res) => {
//   console.log(req.body)
//   res.redirect('/')
// })


MongoClient.connect(dbConfig.url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('catalogue') 
    app.listen(dbport, () => {
      console.log('listening on 3001')
    })
})


// Add validation
app.post('/addCategory', (req, res) => {
  if(!req.body){
    return res.status(400).send({
      success: 'false',
      message: 'Need data for inserting category'
    });
  }
  db.collection('categories').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.post('/addProduct', (req, res) => {
  db.collection('products').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/fetch', (req, res) => {
  // var cursor = db.collection('products').find()
  // console.log(cursor)
  var cursor = db.collection('products').find().toArray(function(err, results){
    console.log(results)
    return res.set(results)
  })
  // console.log(cursor)
  // res.redirect('/')
})


app.get('/fetchcategory', (req, res) => {
  // var cursor = db.collection('products').find()
  // console.log(cursor)
  db.collection('categories').aggregate([
    // { $project : { "$name": 1} },
    { $group : { _id : "$parent_id", child_categories: { $push: "$name" } } }
  ]).toArray(function(err, results){
    console.log(results)
    return res.set(results)
  })
  var cursor = db.collection('products').find().toArray(function(err, results){
    console.log(results)
    return res.set(results)
  })
  // console.log(cursor)
  // res.redirect('/')
})

app.get('/fetchproducts/:category_id', (req, res) => {
  category_id = parseInt(req.params.category_id)
  var query = {category: category_id}
  var cursor = db.collection('products').find(query).toArray(function(err, results){
    console.log(results)
    return res.set(results)
  })
})


app.post('/updateProduct', (req, res) => {
  // var cursor = db.collection('products').find()
  // console.log(cursor)
  id = req.body._id
  // console.log(id)
  delete req.body['_id']
  // console.log(req.body)
  result = db.collection('products').updateOne({_id: id},   { $set: req.body});
  console.log(result)
  // console.log(cursor)
  // res.redirect('/')
})
