const express = require('express');
const repairsController = require('./../controllers/repairs.controllers');
const router = express.Router();

router
  .route('/')
  .get(repairsController.findAllRepairs)
  .post(repairsController.createRepairs);

router
  .route('/:id')
  .get(repairsController.findOneRepairs)
  .patch(repairsController.updateRepairs)
  .delete(repairsController.deleteRepairs);

//findAllRepairs
//findOneRepairs
//createRepairs
//updateRepairs
//deleteRepairs
module.exports = router;
