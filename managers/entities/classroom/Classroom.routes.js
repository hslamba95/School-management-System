const express = require('express');
const router = express.Router();
const { getAllClassrooms, createClassroom, updateClassroom, deleteClassroom } = require('./Classroom.controller');
const { verifyToken, isSuperAdminOrSchoolAdmin } = require('../../../mws/authMiddleware');

// Middleware
router.use(verifyToken);

// Routes
router.get('/', isSuperAdminOrSchoolAdmin, getAllClassrooms);
router.post('/', isSuperAdminOrSchoolAdmin, createClassroom);
router.put('/:id', isSuperAdminOrSchoolAdmin, updateClassroom);
router.delete('/:id', isSuperAdminOrSchoolAdmin, deleteClassroom);

module.exports = router;