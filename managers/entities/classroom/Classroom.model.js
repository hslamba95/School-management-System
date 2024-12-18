const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  resources: { type: String },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Classroom', classroomSchema);