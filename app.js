// librerias
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// importar rutas
const usersRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');

// instanciar la app de express
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routes

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRoutes);

app.all('*', (req, res, next) => {
  new AppError(`Can't find ${req.originalUrl} on this server`, 404);
});

app.use(globalErrorHandler);

module.exports = app;
