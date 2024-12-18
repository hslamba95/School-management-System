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
