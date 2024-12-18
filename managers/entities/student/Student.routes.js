const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('./Student.controller');
const { verifyToken, isSuperAdminOrSchoolAdmin } = require('../../../mws/authMiddleware');

// Middleware
router.use(verifyToken);

// Routes
router.get('/', isSuperAdminOrSchoolAdmin, getAllStudents);
router.post('/', isSuperAdminOrSchoolAdmin, createStudent);
router.put('/:id', isSuperAdminOrSchoolAdmin, updateStudent);
router.delete('/:id', isSuperAdminOrSchoolAdmin, deleteStudent);

module.exports = router;