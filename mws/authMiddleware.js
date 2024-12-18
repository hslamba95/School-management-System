const jwt = require('jsonwebtoken');
const config = require('../config/index.config.js');

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ ok: false, message: 'No token provided.' });
  }
  const tokenWithoutBearer = token.split(' ')[1];
  jwt.verify(tokenWithoutBearer, config.dotEnv.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ ok: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports.isSuperAdmin = (req, res, next) => {
  if (req.userRole !== 'superadmin') {
    return res.status(403).send({ ok: false, message: 'Requires Superadmin Role!' });
  }
  next();
};

module.exports.isSchoolAdmin = (req, res, next) => {
  if (req.userRole !== 'schooladmin') {
    return res.status(403).send({ ok: false, message: 'Requires School Admin Role!' });
  }
  next();
};

module.exports.isSuperAdminOrSchoolAdmin = (req, res, next) => {
  if (req.userRole !== 'superadmin' && req.userRole !== 'schooladmin') {
    return res.status(403).send({ ok: false, message: 'Requires Superadmin or School Admin Role!' });
  }
  next();
};

module.exports.isTeacher = (req, res, next) => {
  if (req.userRole !== 'teacher') {
    return res.status(403).send({ ok: false, message: 'Requires Teacher Role!' });
  }
  next();
};

module.exports.isStudent = (req, res, next) => {
  if (req.userRole !== 'student') {
    return res.status(403).send({ ok: false, message: 'Requires Student Role!' });
  }
  next();
};