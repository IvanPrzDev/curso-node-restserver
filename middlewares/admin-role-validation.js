const { request, response } = require('express');


const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Token must be validated before role verification'
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(403).json({
      msg: `${name} is not an administrator - action not allowed`
    });
  }

  next();
}

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Token must be validated before role verification'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: `Service requires one of these roles: ${roles}`
      });
    }
    
    next();
  }
};

module.exports = {
  isAdminRole,
  hasRole
};