const jwt = require('jsonwebtoken');
const {response, request} = require('express');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No token provided'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - user does not exist'
      });
    }

    // Verify if authUser state is true
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid token - authUser state false'
      });
    }

    // Check ADMIN_ROLE
    if (user.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        msg: 'Forbidden - user is not an admin'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token'
    });
  }
};

module.exports = {
  validateJWT
};
