const Repair = require('./../models/repairs.model');
const castchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

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
  const { date, userid } = req.body;

  const repair = await Repair.create({ date, userid });

  res.status(201).json({
    status: 'success',
    message: 'the repair has benn created',
    repair,
  });
});

exports.updateRepairs = castchAsync(async (req, res) => {
  const { id } = req.params;
  const { date, userid } = req.body;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `Repairs with ${id} not found`,
    });
  }

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
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'cancelled',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `Repair with ${id} not found`,
    });
  }

  await repair.update({
    status: 'cancelled',
  });
  res.status(200).json({
    status: 'success',
    message: `The repair ${id} has been deleted`,
  });
});

exports.findOneRepairs = castchAsync(async (req, res) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `repair whith id ${id} not found`,
    });
  }

  res.status(200).json({
    status: 'completed',
    message: 'the query has been done successfully',
    repair,
  });
});

//findAllRepairs
//findOneRepairs
//createRepairs
//updateRepairs
//deleteRepairs
