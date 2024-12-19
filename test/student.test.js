import { should, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'; 
import Student from '../managers/entities/student/Student.model.js'; 
import User from '../managers/entities/user/User.model.js'; 
import School from '../managers/entities/school/School.model.js';
import Classroom from '../managers/entities/classroom/Classroom.model.js';n

use(chaiHttp);
should();

describe('Students', () => {
  beforeEach(async () => {
    await Student.deleteMany({});
    await User.deleteMany({});
    await School.deleteMany({});
    await Classroom.deleteMany({});
  });

  describe('/GET students', () => {
    it('it should GET all the students', (done) => {
      chai.request(server)
        .get('/api/students')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjMwODc5NWM3MDdmNWI1MzAwOTJmZCIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM0NTg1Njg4LCJleHAiOjE3MzQ1ODkyODh9.C0zjfjFHBGJOJXecQcMCGkM1RGnFTgNFsyaSX6tio_8') 
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST student', () => {
    it('it should POST a new student', (done) => {
      const user = new User({
        username: 'student_user',
        password: 'password123',
        role: 'student'
      });
      user.save().then((user) => {
        const school = new School({
          name: 'Test School',
          address: '123 Test St',
          phone: '1234567890',
          email: 'test@school.com'
        });
        school.save().then((school) => {
          const classroom = new Classroom({
            name: 'Test Classroom',
            capacity: 30,
            resources: 'Projector, Whiteboard',
            school: school.id
          });
          classroom.save().then((classroom) => {
            const student = {
              user: user.id,
              school: school.id,
              classroom: classroom.id
            };
            chai.request(server)
              .post('/api/students')
              .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjMwODc5NWM3MDdmNWI1MzAwOTJmZCIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM0NTg1Njg4LCJleHAiOjE3MzQ1ODkyODh9.C0zjfjFHBGJOJXecQcMCGkM1RGnFTgNFsyaSX6tio_8')
              .send(student)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.data.should.have.property('user').eql(user.id);
                done();
              });
          });
        });
      });
    });
  });

  describe('/PUT/:id student', () => {
    it('it should UPDATE a student given the id', (done) => {
      const user = new User({
        username: 'student_user',
        password: 'password123',
        role: 'student'
      });
      user.save().then((user) => {
        const school = new School({
          name: 'Test School',
          address: '123 Test St',
          phone: '1234567890',
          email: 'test@school.com'
        });
        school.save().then((school) => {
          const classroom = new Classroom({
            name: 'Test Classroom',
            capacity: 30,
            resources: 'Projector, Whiteboard',
            school: school.id
          });
          classroom.save().then((classroom) => {
            const student = new Student({
              user: user.id,
              school: school.id,
              classroom: classroom.id
            });
            student.save().then((student) => {
              chai.request(server)
                .put('/api/students/' + student.id)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjMwODc5NWM3MDdmNWI1MzAwOTJmZCIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM0NTg1Njg4LCJleHAiOjE3MzQ1ODkyODh9.C0zjfjFHBGJOJXecQcMCGkM1RGnFTgNFsyaSX6tio_8') 
                .send({ classroom: classroom.id })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.should.have.property('classroom').eql(classroom.id);
                  done();
                });
            });
          });
        });
      });
    });
  });

  describe('/DELETE/:id student', () => {
    it('it should DELETE a student given the id', (done) => {
      const user = new User({
        username: 'student_user',
        password: 'password123',
        role: 'student'
      });
      user.save().then((user) => {
        const school = new School({
          name: 'Test School',
          address: '123 Test St',
          phone: '1234567890',
          email: 'test@school.com'
        });
        school.save().then((school) => {
          const classroom = new Classroom({
            name: 'Test Classroom',
            capacity: 30,
            resources: 'Projector, Whiteboard',
            school: school.id
          });
          classroom.save().then((classroom) => {
            const student = new Student({
              user: user.id,
              school: school.id,
              classroom: classroom.id
            });
            student.save().then((student) => {
              chai.request(server)
                .delete('/api/students/' + student.id)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjMwODc5NWM3MDdmNWI1MzAwOTJmZCIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM0NTg1Njg4LCJleHAiOjE3MzQ1ODkyODh9.C0zjfjFHBGJOJXecQcMCGkM1RGnFTgNFsyaSX6tio_8') 
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Student deleted successfully');
                  done();
                });
            });
          });
        });
      });
    });
  });
});