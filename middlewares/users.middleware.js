const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');
const Repair = require('.././models/repairs.model');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },

    include: [
      {
        model: Repair,
      },
    ],
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});
