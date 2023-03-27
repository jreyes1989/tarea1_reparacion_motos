const User = require('./../models/users.model');

exports.findAllUsers = async (req, res) => {
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
};

exports.createUsers = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).json({
      status: true,
      message: 'the user has benn created',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

exports.updateUsers = async (req, res) => {
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
};

exports.deleteUsers = async (req, res) => {
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
};

exports.findOneUsers = async (req, res) => {
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
};

// findAllUsers
// findOneUsers
// createUsers
// updateUsers
// deleteUsers
