const mongoose = require('mongoose');

const connectMongo = ({ uri }) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
};

module.exports = connectMongo;