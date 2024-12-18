# School Management API

## Overview

The School Management API is a RESTful service built using Node.js and Express.js. It provides endpoints for managing schools, classrooms, and students with role-based access control (RBAC) using JWT authentication. The API uses MongoDB for data persistence and Redis for caching.

## Features

- JWT-based authentication
- Role-based access control (Superadmin and School Admin roles)
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

3. Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following environment variables:

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

    ```bash
    curl -X GET http://localhost:3000/api/schools -H "Authorization: Bearer your_jwt_token"
    ```

- **Create a New School**

    ```bash
    curl -X POST http://localhost:3000/api/schools -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "School Name", "address": "School Address", "phone": "1234567890", "email": "school@example.com"}'
    ```

- **Update a School**

    ```bash
    curl -X PUT http://localhost:3000/api/schools/{schoolId} -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "Updated School Name"}'
    ```

- **Delete a School**

    ```bash
    curl -X DELETE http://localhost:3000/api/schools/{schoolId} -H "Authorization: Bearer your_jwt_token"
    ```

### Classrooms

- **Get All Classrooms**

    ```bash
    curl -X GET http://localhost:3000/api/classrooms -H "Authorization: Bearer your_jwt_token"
    ```

- **Create a New Classroom**

    ```bash
    curl -X POST http://localhost:3000/api/classrooms -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "Classroom Name", "capacity": 30, "resources": "Projector, Whiteboard", "school": "{schoolId}"}'
    ```

- **Update a Classroom**

    ```bash
    curl -X PUT http://localhost:3000/api/classrooms/{classroomId} -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"name": "Updated Classroom Name"}'
    ```

- **Delete a Classroom**

    ```bash
    curl -X DELETE http://localhost:3000/api/classrooms/{classroomId} -H "Authorization: Bearer your_jwt_token"
    ```

### Students

- **Get All Students**

    ```bash
    curl -X GET http://localhost:3000/api/students -H "Authorization: Bearer your_jwt_token"
    ```

- **Create a New Student**

    ```bash
    curl -X POST http://localhost:3000/api/students -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"firstName": "John", "lastName": "Doe", "age": 15, "school": "{schoolId}", "classroom": "{classroomId}"}'
    ```

- **Update a Student**

    ```bash
    curl -X PUT http://localhost:3000/api/students/{studentId} -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json" -d '{"firstName": "Updated First Name"}'
    ```

- **Delete a Student**

    ```bash
    curl -X DELETE http://localhost:3000/api/students/{studentId} -H "Authorization: Bearer your_jwt_token"
    ```


