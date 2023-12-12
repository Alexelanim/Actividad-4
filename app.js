const express = require('express');
const librosRouter = require('./routes/libros');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());
app.use('/libros', librosRouter);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});