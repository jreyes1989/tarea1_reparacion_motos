const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const castchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');

exports.protect = castchAsync(async (req, res, next) => {
  let token; // extraer token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // validacion de token si existe

  if (!token) {
    return next(
      new AppError('You are not logged in! PLease log in to get access', 401)
    );
  }

  //decodificacion de jwt || promisify para pasar a promesas en js
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  //  se busca el usuario y validar si existe!
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: true,
    },
  });

  if (!User) {
    return next(
      AppError('Username does not exist, or the token is not available', 401)
    );
  }

  req.sessionUser = user;
  next();
});

exports.validUser = castchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});

exports.protectAccountOwner = castchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }

    next();
  };
};
