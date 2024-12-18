const express = require('express');
const router = express.Router();
const schoolRoutes = require('../entities/school/School.routes');
const classroomRoutes = require('../entities/classroom/Classroom.routes');
const studentRoutes = require('../entities/student/Student.routes');

// Routes for entities
router.use('/schools', schoolRoutes);
router.use('/classrooms', classroomRoutes);
router.use('/students', studentRoutes);

module.exports = router;
