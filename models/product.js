// require mongoose in the file //
const mongoose = require('mongoose');

// Create the productSchema //
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true,
      min: 0
   },
   category: {
      type: String,
      lowercase: true,
      enum: ['fruit', 'vegetable', 'dairy']
   }
});

// compile the model //
const Product = mongoose.model('Product', productSchema);

// export the model from this file //
module.exports = Product;