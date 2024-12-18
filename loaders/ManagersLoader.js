const express = require('express');

class ManagersLoader {
  constructor({ config, cache, cortex }) {
    this.config = config;
    this.cache = cache;
    this.cortex = cortex;
  }

  load() {
    const app = express();

    // Load routes
    const authRoutes = require('../managers/entities/auth/Auth.routes');
    app.use('/api/auth', authRoutes);

    const schoolRoutes = require('../managers/entities/school/School.routes');
    const classroomRoutes = require('../managers/entities/classroom/Classroom.routes');
    const studentRoutes = require('../managers/entities/student/Student.routes');

    const { verifyToken } = require('../mws/authMiddleware');
    app.use('/api/schools', verifyToken, schoolRoutes);
    app.use('/api/classrooms', verifyToken, classroomRoutes);
    app.use('/api/students', verifyToken, studentRoutes);

    return app;
  }
}

module.exports = ManagersLoader;