const express = require('express');

const mongoose = require('mongoose');  //paquete para no tratar de manera directa con mongodb, que debe ser instalado con npm install mongoose

const app = express();

const bodyParser = require('body-parser');  // paquete para analizar body de request

const db = mongoose.connect('mongodb://localhost/bookAPI');  // nos dara una coneccion de bd a mongodb

const Book = require('./models/bookModel');

const bookRouter = require('./routes/bookRouter')(Book);  // se le pasa Book para que routes tenga acceso

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true})); // configuracion para que el analizador funcione bodyParser

app.use(bodyParser.json());   // saca el body del post y lo entrega como json en req.body

app.use('/api', bookRouter);          

app.get('/', (req, res) => {
  res.send('Welome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
