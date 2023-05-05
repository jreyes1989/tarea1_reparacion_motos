const express = require('express');

// controller
const usersController = require('./../controllers/users.controllers');

// middleware
const authMiddleware = require('../middlewares/auth.middleware');
const validations = require('./../middlewares/validations.middleware');

const router = express.Router();

router
  .route('/')
  .get(usersController.findAllUsers)
  .post(validations.createUserValidation, usersController.createUsers);

router.post(
  '/login',
  validations.loginUserValidation,
  usersController.loginUser
);

router
  .route('/:id')
  .get(authMiddleware.validUser, usersController.findOneUsers)
  .patch(
    validations.updateUserValidation,
    authMiddleware.validUser,
    usersController.updateUsers
  )
  .delete(authMiddleware.validUser, usersController.deleteUsers);

module.exports = router;
