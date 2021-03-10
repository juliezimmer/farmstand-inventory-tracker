const express = require('express');
// sets 'app' equal to the result of executing express //
const app = express();
// import path for joining //
const path = require('path');
// require Mongoose in the file //
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// require product model //
const Product = require('./models/product');
const { truncate } = require('fs');


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

// middleware //
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

// basic routes with async/await api and category filtering //
app.get('/products', async (req, res) => {
   const { category } = req.query;
   if(category){
      const products = await Product.find({ category: category });
       // this gives us access to the db product list //
      res.render('products/index', { products, category });
   } else {
      // query the product model //
      const products = await Product.find({}) // asks for every product //
      res.render('products/index', { products, category: 'All' });
   }
})

// route for creating new products //
app.get('/products/new', (req, res) => {
   // renders html template identified //
   res.render('products/new', { categories });
})

// route for submitted form //
app.post('/products', async (req, res) => {
   // db query to add new product //
   const newProduct = new Product(req.body);
   await newProduct.save();
   res.redirect(`/products/${newProduct._id}`);
})

// route to view details about a single product //
app.get('/products/:id', async(req, res) => {
   const {id} = req.params;
   // db query //
   const product = await Product.findById(id); 
   res.render('products/show', { product }); 
})

// edit request form //
app.get('/products/:id/edit', async (req, res) => {
   const { id } = req.params;
   const product = await Product.findById(id);

   // when product is found, it's passed through in res.render //
   res.render('products/edit', { product, categories });
})

app.put('/products/:id', async (req, res) => {
   const { id } = req.params;
   // updating in Mongo via Mongoose //
   const product = Product.findByIdAndUpdate(id, req.body, {runValiaators: true, new: true});
   res.redirect(`/products/${id}`);
})

// DELETE route //
app.delete('/products/:id', async (req, res) => {
   const { id } = req.params;
   // remove the product from the DB using the id //
   const deletedProduct = await Product.findByIdAndDelete(id);
   res.redirect('/products');
})

// set the port //
app.listen(3000, () => {
   console.log('Listening on port 3000');
});
