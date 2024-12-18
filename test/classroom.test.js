import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'; // Ensure the path is correct and includes the .js extension
import Classroom from '../managers/entities/classroom/Classroom.model.js'; // Ensure the path is correct and includes the .js extension
import School from '../managers/entities/school/School.model.js'; // Ensure the path is correct and includes the .js extension

chai.use(chaiHttp);
const should = chai.should();

describe('Classrooms', () => {
  beforeEach(async () => {
    await Classroom.deleteMany({});
    await School.deleteMany({});
  });

  describe('/GET classrooms', () => {
    it('it should GET all the classrooms', (done) => {
      chai.request(server)
        .get('/api/classrooms')
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

  describe('/POST classroom', () => {
    it('it should POST a new classroom', (done) => {
      const school = new School({
        name: 'Test School',
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@school.com'
      });
      school.save().then((school) => {
        const classroom = {
          name: 'Test Classroom',
          capacity: 30,
          resources: 'Projector, Whiteboard',
          school: school.id
        };
        chai.request(server)
          .post('/api/classrooms')
          .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
          .send(classroom)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('Test Classroom');
            done();
          });
      });
    });
  });

  describe('/PUT/:id classroom', () => {
    it('it should UPDATE a classroom given the id', (done) => {
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
          chai.request(server)
            .put('/api/classrooms/' + classroom.id)
            .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
            .send({ name: 'Updated Classroom' })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.have.property('name').eql('Updated Classroom');
              done();
            });
        });
      });
    });
  });

  describe('/DELETE/:id classroom', () => {
    it('it should DELETE a classroom given the id', (done) => {
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
          chai.request(server)
            .delete('/api/classrooms/' + classroom.id)
            .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Classroom deleted successfully');
              done();
            });
        });
      });
    });
  });
});