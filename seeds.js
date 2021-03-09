// This file was cfreated to seed the db //

const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { // error handling //
   console.log("Mongo connection open!");
})
.catch(err => {
   console.log("Oh, no! Mongo connection error!");
   console.log(err);
});

// create new product //
const p = new Product({
   name: 'Ruby Grapefruit',
   price: 1.99,
   category:'fruit'
})
// save the new product, catch any errors in posting to Mongo //
// p.save()
//    .then(p => {
//       console.log(p);
//    })
//    .catch(e => {
//       console.log(e);
//    })

// Using the mongoose method insertMany() which takes an array of products and inserts them //
const seedProducts = [
   {
       name: 'Fairy Eggplant',
       price: 1.00,
       category: 'vegetable'
   },
   {
       name: 'Organic Goddess Melon',
       price: 4.99,
       category: 'fruit'
   },
   {
       name: 'Organic Mini Seedless Watermelon',
       price: 3.99,
       category: 'fruit'
   },
   {
       name: 'Organic Celery',
       price: 1.50,
       category: 'vegetable'
   },
   {
       name: 'Chocolate Whole Milk',
       price: 2.69,
       category: 'dairy'
   },
]

Product.insertMany(seedProducts)
   .then(res => {
      console.log(res);
   })
   .catch(e => {
      console.log(e);
   })