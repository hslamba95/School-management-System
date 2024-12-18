# School Management API

## Overview

The School Management API is a RESTful service built using Node.js and Express.js. It provides endpoints for managing schools, classrooms, and students with role-based access control (RBAC) using JWT authentication. The API uses MongoDB for data persistence and Redis for caching.

## Features

- JWT-based authentication
- Role-based access control (Superadmin, School Admin, and Student roles)
- CRUD operations for schools, classrooms, and students
- Input validation and error handling
- API rate limiting and security measures

## Prerequisites

- Node.js and npm
- MongoDB
- Redis

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/hslamba95/School-management-System.git
    cd school-management-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a [.env] file in the root directory and add the following environment variables:

    ```plaintext
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/school-management
    JWT_SECRET=your_jwt_secret
    CACHE_PREFIX=your_cache_prefix
    CACHE_REDIS=redis://localhost:6379
    CORTEX_PREFIX=your_cortex_prefix
    CORTEX_REDIS=redis://localhost:6379
    CORTEX_TYPE=your_cortex_type
    LONG_TOKEN_SECRET=your_long_token_secret
    SHORT_TOKEN_SECRET=your_short_token_secret
    NACL_SECRET=your_nacl_secret
    ```

4. Start MongoDB and Redis servers:

    ```bash
    mongod
    redis-server
    ```

5. Start the server:

    ```bash
    node app.js
    ```

## Roles and Permissions

### Superadmin

- Full access to all endpoints
- Can manage schools, classrooms, teachers, and students

### School Admin

- Access to manage classrooms and students within their school
- Cannot manage other schools or other school admins

### Teacher

- Access to manage assignments and grades for their students
- Cannot manage schools, classrooms, or other teachers

### Student

- Access to view and submit assignments
- Cannot manage schools, classrooms, teachers, or other students

## API Endpoints

### Authentication

- **Login**

    ```bash
    curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password"}'
    ```

- **Register**

    ```bash
    curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password", "role": "superadmin"}'
    ```

### Schools

- **Get All Schools**

    **Request:**

    ```bash
    curl -X GET http://localhost:3000/api/schools -H "Authorization: Bearer your_jwt_token"
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": [
        {
          "_id": "67630a616733102e6943d79d",
          "name": "Golden bells",
          "address": "School Address",
          "phone": "1234567890",
          "email": "school@example.com",
          "createdAt": "2024-12-18T17:46:09.567Z",
          "__v": 0,
          "classrooms": [
            {
              "_id": "67630a616733102e6943d79e",
              "name": "Classroom Name",
              "capacity": 30,
              "resources": "Projector, Whiteboard",
              "school": "67630a616733102e6943d79d",
              "students": [],
            }
          ],
          "students": [
            {
              "_id": "67630a616733102e6943d7a0",
              "user": {
                "_id": "67630a616733102e6943d79f",
                "username": "student_user",
                "role": "student",
                "school": "67630a616733102e6943d79d"
              },
              "school": "67630a616733102e6943d79d",
              "classroom": "67630a616733102e6943d79e"
            }
          ]
        }
      ]
    }
    ```

- **Create a New School**

    **Request:**

    ```bash
    curl -X POST http://localhost:3000/api/schools -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "School Name", "address": "School Address", "phone": "1234567890", "email": "school@example.com"}'
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": {
        "_id": "67630a616733102e6943d79d",
        "name": "School Name",
        "address": "School Address",
        "phone": "1234567890",
        "email": "school@example.com",
        "createdAt": "2024-12-18T17:46:09.567Z",
        "__v": 0,
        "classrooms": [],
        "students": []
      }
    }
    ```

- **Update a School**

    **Request:**

    ```bash
    curl -X PUT http://localhost:3000/api/schools/{schoolId} -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "Updated School Name"}'
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": {
        "_id": "67630a616733102e6943d79d",
        "name": "Updated School Name",
        "address": "School Address",
        "phone": "1234567890",
        "email": "school@example.com",
        "createdAt": "2024-12-18T17:46:09.567Z",
        "__v": 0,
        "classrooms": [],
        "students": []
      }
    }
    ```

- **Delete a School**

    **Request:**

    ```bash
    curl -X DELETE http://localhost:3000/api/schools/{schoolId} -H "Authorization: Bearer your_jwt_token"
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "message": "School deleted successfully"
    }
    ```

### Classrooms

- **Get All Classrooms**

    **Request:**

    ```bash
    curl -X GET http://localhost:3000/api/classrooms -H "Authorization: Bearer your_jwt_token"
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": [
        {
          "_id": "67630a616733102e6943d79e",
          "name": "Classroom Name",
          "capacity": 30,
          "resources": "Projector, Whiteboard",
          "school": "67630a616733102e6943d79d",
          "students": []
        }
      ]
    }
    ```

- **Create a New Classroom**

    **Request:**

    ```bash
    curl -X POST http://localhost:3000/api/classrooms -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "Classroom Name", "capacity": 30, "resources": "Projector, Whiteboard", "school": "67630a616733102e6943d79d"}'
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": {
        "_id": "67630a616733102e6943d79e",
        "name": "Classroom Name",
        "capacity": 30,
        "resources": "Projector, Whiteboard",
        "school": "67630a616733102e6943d79d",
        "students": []
      }
    }
    ```

- **Update a Classroom**

    **Request:**

    ```bash
    curl -X PUT http://localhost:3000/api/classrooms/{classroomId} -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "Updated Classroom Name"}'
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": {
        "_id": "67630a616733102e6943d79e",
        "name": "Updated Classroom Name",
        "capacity": 30,
        "resources": "Projector, Whiteboard",
        "school": "67630a616733102e6943d79d",
        "students": []
      }
    }
    ```

- **Delete a Classroom**

    **Request:**

    ```bash
    curl -X DELETE http://localhost:3000/api/classrooms/{classroomId} -H "Authorization: Bearer your_jwt_token"
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "message": "Classroom deleted successfully"
    }
    ```

### Students

- **Get All Students**

    **Request:**

    ```bash
    curl -X GET http://localhost:3000/api/students -H "Authorization: Bearer your_jwt_token"
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": [
        {
          "_id": "67630a616733102e6943d7a0",
          "user": {
            "_id": "67630a616733102e6943d79f",
            "username": "student_user",
            "role": "student",
            "school": "67630a616733102e6943d79d"
          },
          "school": "67630a616733102e6943d79d",
          "classroom": "67630a616733102e6943d79e"
        }
      ]
    }
    ```

- **Create a New Student**

    **Request:**

    ```bash
    curl -X POST http://localhost:3000/api/students -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"user": "67630a616733102e6943d79f", "school": "67630a616733102e6943d79d", "classroom": "67630a616733102e6943d79e"}'
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": {
        "_id": "67630a616733102e6943d7a0",
        "user": {
          "_id": "67630a616733102e6943d79f",
          "username": "student_user",
          "role": "student",
          "school": "67630a616733102e6943d79d"
        },
        "school": "67630a616733102e6943d79d",
        "classroom": "67630a616733102e6943d79e"
      }
    }
    ```

- **Update a Student**

    **Request:**

    ```bash
    curl -X PUT http://localhost:3000/api/students/{studentId} -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"user": "67630a616733102e6943d79f", "school": "67630a616733102e6943d79d", "classroom": "67630a616733102e6943d79e"}'
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "data": {
        "_id": "67630a616733102e6943d7a0",
        "user": {
          "_id": "67630a616733102e6943d79f",
          "username": "updated_student_user",
          "role": "student",
          "school": "67630a616733102e6943d79d"
        },
        "school": "67630a616733102e6943d79d",
        "classroom": "67630a616733102e6943d79e"
      }
    }
    ```

- **Delete a Student**

    **Request:**

    ```bash
    curl -X DELETE http://localhost:3000/api/students/{studentId} -H "Authorization: Bearer your_jwt_token"
    ```

    **Response:**

    ```json
    {
      "ok": true,
      "message": "Student deleted successfully"
    }
    ```


### Database Schema

#### 1. User Schema

The `User` schema stores information about users, including their roles (superadmin, schooladmin, student).

| Field     | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| _id       | ObjectId | Unique identifier for the user                   |
| username  | String   | Username of the user                             |
| password  | String   | Hashed password of the user                      |
| role      | String   | Role of the user (superadmin, schooladmin, teacher, student) |
| school    | ObjectId | Reference to the school (optional)               |

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['superadmin', 'schooladmin', 'teacher', 'student'] },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' }, // Optional, only for schooladmin, teacher, and student
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### 2. School Schema

The `School` schema stores information about schools.

| Field       | Type       | Description                                      |
|-------------|------------|--------------------------------------------------|
| _id         | ObjectId   | Unique identifier for the school                 |
| name        | String     | Name of the school                               |
| address     | String     | Address of the school                            |
| phone       | String     | Phone number of the school                       |
| email       | String     | Email address of the school                      |
| schoolAdmins| [ObjectId] | Array of references to school admin users        |
| students    | [ObjectId] | Array of references to student users             |
| classrooms  | [ObjectId] | Array of references to classrooms                |

```javascript
const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  schoolAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }]
});

module.exports = mongoose.model('School', schoolSchema);
```

#### 3. Classroom Schema

The `Classroom` schema stores information about classrooms.

| Field     | Type       | Description                                      |
|-----------|------------|--------------------------------------------------|
| _id       | ObjectId   | Unique identifier for the classroom              |
| name      | String     | Name of the classroom                            |
| capacity  | Number     | Capacity of the classroom                        |
| resources | String     | Resources available in the classroom             |
| school    | ObjectId   | Reference to the school                          |
| students  | [ObjectId] | Array of references to student users             |

```javascript
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  resources: { type: String },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Classroom', classroomSchema);
```

#### 4. Student Schema

The `Student` schema stores information about students. Note that students are also users, so this schema mainly references the `User` schema.

| Field     | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| _id       | ObjectId | Unique identifier for the student                |
| user      | ObjectId | Reference to the user                            |
| school    | ObjectId | Reference to the school                          |
| classroom | ObjectId | Reference to the classroom                       |

```javascript
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
});

module.exports = mongoose.model('Student', studentSchema);
```

