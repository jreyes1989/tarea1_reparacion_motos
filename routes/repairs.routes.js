const express = require('express');

//controler
const repairsController = require('./../controllers/repairs.controllers');

// middleware
const validations = require('./../middlewares/validations.middleware');
const repairMiddleware = require('./../middlewares/repairs.middleware');

const router = express.Router();

//router.use(authMiddleware.protect);
// rutas protegidas ----->

router
  .route('/')
  .get(repairsController.findAllRepairs)
  .post(repairsController.createRepairs);

router
  .route('/:id')
  .get(repairMiddleware.validRepair, repairsController.findOneRepairs)
  .patch(
    repairMiddleware.validRepair,
    //authMiddleware.protectAccountOwner,
    //authMiddleware.restrictTo('employee'), // permiso por rol
    repairsController.updateRepairs
  )
  .delete(
    repairMiddleware.validRepair,
    //authMiddleware.protectAccountOwner,
    // authMiddleware.restrictTo('employee'), // permisos por rol
    repairsController.deleteRepairs
  );

//findAllRepairs
//findOneRepairs
//createRepairs
//updateRepairs
//deleteRepairs
module.exports = router;
