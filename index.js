const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/index.config.js');
const Cortex = require('ion-cortex');
const ManagersLoader = require('./loaders/ManagersLoader.js');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB Connection
const mongoDB = config.dotEnv.MONGO_URI ? require('./connect/mongo')({
    uri: config.dotEnv.MONGO_URI
}) : null;

// Cache Setup
const cache = require('./cache/cache.dbh')({
    prefix: config.dotEnv.CACHE_PREFIX,
    url: config.dotEnv.CACHE_REDIS
});

// Cortex Setup
const cortex = new Cortex({
    prefix: config.dotEnv.CORTEX_PREFIX,
    url: config.dotEnv.CORTEX_REDIS,
    type: config.dotEnv.CORTEX_TYPE,
    state: () => {
        return {}
    },
    activeDelay: "50ms",
    idlDelay: "200ms",
});

// Managers Loader
const managersLoader = new ManagersLoader({ config, cache, cortex });
const managers = managersLoader.load();

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const schoolRoutes = require('./managers/entities/school/School.routes');
const classroomRoutes = require('./managers/entities/classroom/Classroom.routes');
const studentRoutes = require('./managers/entities/student/Student.routes');
const authRoutes = require('./managers/entities/auth/Auth.routes');

app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ ok: false, error: 'Something went wrong!' });
});

// Start Server
const PORT = config.dotEnv.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});