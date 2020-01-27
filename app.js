const express = require('express');

const mongoose = require('mongoose');  //paquete para no tratar de manera directa con mongodb, que debe ser instalado con npm install mongoose

const app = express();

const db = mongoose.connect('mongodb://localhost/bookAPI');  // nos dara una coneccion de bd a mongodb

const bookRouter = express.Router();  //.Router= clase para crear manejadores de rutas

const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');

bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if(err){
        res.send(err);
      } else {
        res.json(books);
      }      
    });
  });
app.use('/api', bookRouter);          

app.get('/', (req, res) => {
  res.send('Welome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
