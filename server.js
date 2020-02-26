const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient
const port = 3000
const dbport = 3001

var db


app.listen(port, ()=> {
    console.log(`listening on ${port}`)
  })

app.use(express.json())

app.get('/', (request, response)=>{
  console.log(__dirname)
  response.sendFile(__dirname + '/index.html')
})

app.post('/test', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})


MongoClient.connect('mongodb://localhost', (err, client) => {
  if (err) return console.log(err)
  db = client.db('catalogue') 
  app.listen(dbport, () => {
    console.log('listening on 3001')
  })
})


app.post('/addCategory', (req, res) => {
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
