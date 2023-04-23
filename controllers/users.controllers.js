const User = require('./../models/users.model');
const castchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt');

exports.findAllUsers = castchAsync(async (req, res) => {
  const { requestTime } = req;
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully ',
    results: users.length,
    requestTime,
    users,
  });
});

exports.createUsers = castchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;

  //  contrasena  encriptada
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username: username.toLowerCase(), // toLowerCase minusculas
    email: email.toLowerCase(), // toLowerCase minusculas
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: true,
    message: 'the user has benn created',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    },
  });
});

exports.loginUser = castchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  // validacion de contrasema sea correcta
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: true,
    message: 'the user has benn generate good',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    },
  });
});

exports.updateUsers = castchAsync(async (req, res) => {
  const { id } = req.params;
  const { username, email } = await req.body;
  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with ${id} not found`,
    });
  }
  await user.update({
    username,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been update',
  });
});

exports.deleteUsers = castchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with ${id} not found`,
    });
  }
  await user.update({
    status: false,
  });

  res.status(200).json({
    status: 'success',
    message: `The user ${id} has been deleted `,
  });
});

exports.findOneUsers = castchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `user whith id ${id} not found`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'the query has been done successfully ',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
});

// findAllUsers
// findOneUsers
// createUsers
// updateUsers
// deleteUsers
