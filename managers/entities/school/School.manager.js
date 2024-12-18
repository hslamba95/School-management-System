const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchoolSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const School = mongoose.model('School', SchoolSchema);

const createSchool = async (data) => {
  const school = new School(data);
  return await school.save();
};

const getSchools = async (filter = {}) => {
  return await School.find(filter);
};

const updateSchool = async (id, data) => {
  return await School.findByIdAndUpdate(id, data, { new: true });
};

const deleteSchool = async (id) => {
  return await School.findByIdAndDelete(id);
};

module.exports = { createSchool, getSchools, updateSchool, deleteSchool };
