const express = require('express');

const mongoose = require('mongoose');  //paquete para no tratar de manera directa con mongodb, que debe ser instalado con npm install mongoose

const app = express();

const bodyParser = require('body-parser');  // paquete para analizar body de request

const db = mongoose.connect('mongodb://localhost/bookAPI');  // nos dara una coneccion de bd a mongodb

const bookRouter = express.Router();  //.Router= clase para crear manejadores de rutas

const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({extended: true})); // configuracion para que el analizador funcione bodyParser
app.use(bodyParser.json());   // saca el body del post y lo entrega como json en req.body

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    res.status(201).json(book);
  })
  .get((req, res) => {
    const query = {};
    if(req.query.genre){
      query.genre = req.query.genre;
    }
    if(req.query.author){
      query.author = req.query.author;
    }
    if(req.query.title){
      query.title = req.query.title
    }
    Book.find(query,(err, books) => {
      if(err){
        res.send(err);
      } else {
        res.json(books);
      }      
    });
  });
  bookRouter.route('/books/:bookId')
  .get((req, res) => {
    
    Book.findById(req.params.bookId,(err, books) => {
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
