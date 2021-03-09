const express = require('express');
// sets 'app' equal to the result of executing express //
const app = express();
// import path for joining //
const path = require('path');
// require Mongoose in the file //
const mongoose = require('mongoose');

// import Mongoose //
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

// basic routes //
app.get('/dog', (req, res) => {
   res.send('WOOF!!');
})


// set the port //
app.listen(3000, () => {
   console.log('Listening on port 3000');
});
