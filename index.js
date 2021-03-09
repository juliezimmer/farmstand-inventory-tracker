const express = require('express');
// sets 'app' equal to the result of executing express //
const app = express();
// import path for joining //
const path = require('path');
// require Mongoose in the file //
const mongoose = require('mongoose');
// require product model //
const Product = require('./models/product');

// import Mongoose and connect to MongoDB //
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { // error handling //
   console.log("Mongo connection open!");
})
.catch(err => {
   console.log("Oh, no! Mongo connection error!");
   console.log(err);
});


app.set('views', path.join(__dirname, 'views'));
// set view engine to ejs //
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


// basic routes with async/await api //
app.get('/products', async (req, res) => {
   // query the product model //
   const products = await Product.find({}) // asks for every product //
   // this gives us access to the db product list //
   res.render('products/index', {products});
})

// route for submitted form //
app.post('/products', async (req, res) => {
   // db query to add new product //
   const newProduct = new Product(req.body);
   await newProduct.save();
   res.redirect(`/products/${newProduct._id}`);

})

// route for creating new products //
app.get('/products/new', (req, res) => {
   // renders tml template identified //
   res.render('products/new')
})

// route to view details about a single product //
app.get('/products/:id', async(req, res) => {
   const {id} = req.params;
   // db query //
   const product = await Product.findById(id); 
   res.render('products/show', { product }); 
})


// set the port //
app.listen(3000, () => {
   console.log('Listening on port 3000');
});
