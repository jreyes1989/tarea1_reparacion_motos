// librerias
const express = require('express');
const morgan = require('morgan');

// importar rutas
const usersRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');

// instanciar la app de express
const app = express();

//  middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

//routes

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRoutes);

module.exports = app;
