const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  resources: { type: String },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Classroom', classroomSchema);