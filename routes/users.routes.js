const express = require('express');

// controller
const usersController = require('./../controllers/users.controllers');
const validations = require('./../middlewares/validations.middleware');

// middleware
const usersMiddleware = require('./../middlewares/users.middleware');

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
  .get(usersMiddleware.validIfExistUser, usersController.findOneUsers);

// rutas protegidas ----->
router
  .use(usersMiddleware.protect)

  .patch(
    usersMiddleware.validIfExistUser,
    usersMiddleware.protectAccountOwner,
    usersMiddleware.restrictTo('employee'),
    usersController.updateUsers
  )
  .delete(
    usersMiddleware.validIfExistUser,
    usersMiddleware.protectAccountOwner,
    usersMiddleware.restrictTo('employee'),
    usersController.deleteUsers
  );

module.exports = router;
