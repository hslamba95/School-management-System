const express = require('express');
const router = express.Router();
const { getAllSchools, createSchool, updateSchool, deleteSchool } = require('./School.controller');
const { verifyToken, isSuperAdmin } = require('../../../mws/authMiddleware');

// Middleware
router.use(verifyToken);

// Routes
router.get('/', isSuperAdmin, getAllSchools);
router.post('/', isSuperAdmin, createSchool);
router.put('/:id', isSuperAdmin, updateSchool);
router.delete('/:id', isSuperAdmin, deleteSchool);

module.exports = router;