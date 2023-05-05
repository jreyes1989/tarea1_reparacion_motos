const Repair = require('./../models/repairs.model');
const castchAsync = require('./../utils/catchAsync');

exports.findAllRepairs = castchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully',
    repairs,
  });
});

exports.createRepairs = castchAsync(async (req, res) => {
  const { date, userid, motorsNumber, description } = req.body;

  const repair = await Repair.create({
    date,
    userid,
    motorsNumber,
    description,
  });

  res.status(201).json({
    status: 'success',
    message: 'the repair has benn created',
    repair,
  });
});

exports.updateRepairs = castchAsync(async (req, res) => {
  const { repair } = req;
  const { date, userid } = req.body;

  await repair.update({
    status: 'completed',
    date,
    userid,
  });

  res.status(200).json({
    status: 'success',
    message: 'The repair has been update',
  });
});

exports.deleteRepairs = castchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'cancelled',
  });
  res.status(200).json({
    status: 'success',
    message: `The repair has been deleted`,
  });
});

exports.findOneRepairs = castchAsync(async (req, res) => {
  const { repair } = req;

  res.status(200).json({
    status: 'pending',
    message: 'the query has been done successfully',
    repair,
  });
});

//findAllRepairs
//findOneRepairs
//createRepairs
//updateRepairs
//deleteRepairs
