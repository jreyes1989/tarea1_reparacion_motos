const express = require('express');
const usersController = require('./../controllers/users.controllers');
const router = express.Router();

router
  .route('/')
  .get(usersController.findAllUsers)
  .post(usersController.createUsers);

router
  .route('/:id')
  .get(usersController.findOneUsers)
  .patch(usersController.updateUsers)
  .delete(usersController.deleteUsers);

module.exports = router;
