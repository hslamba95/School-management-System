import { should, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'; // Ensure the path is correct and includes the .js extension
import Student from '../managers/entities/student/Student.model.js'; // Ensure the path is correct and includes the .js extension
import User from '../managers/entities/user/User.model.js'; // Ensure the path is correct and includes the .js extension
import School from '../managers/entities/school/School.model.js'; // Ensure the path is correct and includes the .js extension
import Classroom from '../managers/entities/classroom/Classroom.model.js'; // Ensure the path is correct and includes the .js extension

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
        .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
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
              .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
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
                .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
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
                .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
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