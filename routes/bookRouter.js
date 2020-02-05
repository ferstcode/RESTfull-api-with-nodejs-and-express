const express = require('express');

function routes(Book) {     //la funcion creara bookRouter para nosotros se le pasa Book
  const bookRouter = express.Router();  //.Router= clase para crear manejadores de rutas
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

  const getBook = (req, res, next ) => {
    Book.findById(req.params.bookId,(err, book) => {
      if(err){
        res.send(err);
      } else {
        if(book){
          req.book = book;
          return next();
        }
        res.sendStatus(404);
      }      
    });
  }
  const setBook = (book,bookParameters) => {
        book.title = bookParameters.title;
        book.genre = bookParameters.genre;
        book.author = bookParameters.author;
        book.read = bookParameters.read;
        book.save();
  }
  const verifyParametersForSetBook = (bookParameters) => {
    const verify = {}
    if(bookParameters.title){
      verify.title = true
    } else {
      verify.title = false
    };
    if(bookParameters.genre){
      verify.genre = true
    } else {
      verify.genre = false
    };
    if(bookParameters.author){
      verify.author = true
    } else {
      verify.author = false
    };
      console.log(verify);
      return verify;    
   }
   const getParametersError = (verifiedParameters) => {
    parametersError = []
    for (const [key, value] of Object.entries(verifiedParameters)) {
      if(value == false) {
        parametersError.push(key)
      };        
    };
    return parametersError;
   };
  bookRouter.use('/books/:bookId', getBook )
  bookRouter.route('/books/:bookId')
  .get((req, res) => res.json(req.book))
  .put((req, res) => {
        const verifiedParameters = verifyParametersForSetBook(req.body)
        const parametersError = getParametersError(verifiedParameters)
        if(parametersError.length > 0){
          res.status(400).send(`Faltaron ingresar datos: ${parametersError}`);
        }else{
        setBook(req.book, req.body);
        res.json(req.book)
        }
      }      
    );
  return bookRouter;
};

module.exports = routes;