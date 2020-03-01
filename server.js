const dbConfig = require('./config/database.config.js');
const express = require('express')
const app = express();
app.use(express.json())
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./api/routes/products.routes.js')(app);
require('./api/routes/categories.routes.js')(app);

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})

app.get('/', (req, res)=>{
  console.log(__dirname)
  res.sendFile(__dirname + '/index.html')
})


