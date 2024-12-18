import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'; // Ensure the path is correct and includes the .js extension
import School from '../managers/entities/school/School.model.js'; // Ensure the path is correct and includes the .js extension

chai.use(chaiHttp);
const should = chai.should();

describe('Schools', () => {
  beforeEach(async () => {
    await School.deleteMany({});
  });

  describe('/GET schools', () => {
    it('it should GET all the schools', (done) => {
      chai.request(server)
        .get('/api/schools')
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

  describe('/POST school', () => {
    it('it should POST a new school', (done) => {
      const school = {
        name: 'Test School',
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@school.com'
      };
      chai.request(server)
        .post('/api/schools')
        .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
        .send(school)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.property('name').eql('Test School');
          done();
        });
    });
  });

  describe('/PUT/:id school', () => {
    it('it should UPDATE a school given the id', (done) => {
      const school = new School({
        name: 'Test School',
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@school.com'
      });
      school.save().then((school) => {
        chai.request(server)
          .put('/api/schools/' + school.id)
          .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
          .send({ name: 'Updated School' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('Updated School');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id school', () => {
    it('it should DELETE a school given the id', (done) => {
      const school = new School({
        name: 'Test School',
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@school.com'
      });
      school.save().then((school) => {
        chai.request(server)
          .delete('/api/schools/' + school.id)
          .set('Authorization', 'Bearer your_jwt_token') // Replace with a valid token
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('School deleted successfully');
            done();
          });
      });
    });
  });
});