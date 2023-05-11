const Repair = require('../models/repairs.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!repair) {
    return next(new AppError('Repair not fount', 404));
  }

  req.repair = repair;
  //req.repair = repair.user;
  next();

  //buscar la reparacion
  //include del modelo user

  //req.repair = repair.user;
  //req.repair = repair;
});
