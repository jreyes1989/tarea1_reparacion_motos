const express = require('express');

//controler
const repairsController = require('./../controllers/repairs.controllers');

// middleware
const authMiddleware = require('../middlewares/auth.middleware');
const validations = require('./../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleware.protect);
// rutas protegidas ----->

router
  .route('/')
  .get(repairsController.findAllRepairs)
  .post(repairsController.createRepairs);

router
  .route('/:id')
  .get(repairsController.findOneRepairs)
  .patch(
    //authMiddleware.validIfExistUser,
    //authMiddleware.protectAccountOwner,
    authMiddleware.restrictTo('employee'), // permiso por rol
    repairsController.updateRepairs
  )
  .delete(
    //authMiddleware.validIfExistUser,
    //authMiddleware.protectAccountOwner,
    authMiddleware.restrictTo('employee'), // permisos por rol
    repairsController.deleteRepairs
  );

//findAllRepairs
//findOneRepairs
//createRepairs
//updateRepairs
//deleteRepairs
module.exports = router;
