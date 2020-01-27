const express = require('express');

const app = express();

const bookRouter = express.Router();  //.Router= clase para crear manejadores de rutas

const port = process.env.PORT || 3000;

bookRouter.route('/books')
  .get((req, res) => {
    const response = { hello : 'This is my API'};
    res.json(response);
  });
app.use('/api', bookRouter);          

app.get('/', (req, res) => {
  res.send('Welome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
