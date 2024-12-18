const Student = require('./Student.model');
const School = require('../school/School.model');

module.exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user').populate('school').populate('classroom');
    res.json({ ok: true, data: students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.createStudent = async (req, res) => {
  const { user, school, classroom } = req.body;

  try {
    const student = new Student({ user, school, classroom });
    await student.save();

    // Add student to the school's students array
    await School.findByIdAndUpdate(school, { $push: { students: student._id } });

    res.status(201).json({ ok: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const student = await Student.findByIdAndUpdate(id, updates, { new: true });
    if (!student) {
      return res.status(404).json({ ok: false, error: 'Student not found' });
    }

    // If the school is updated, ensure the student is moved to the new school's students array
    if (updates.school && updates.school !== student.school.toString()) {
      await School.findByIdAndUpdate(student.school, { $pull: { students: student._id } });
      await School.findByIdAndUpdate(updates.school, { $push: { students: student._id } });
    }

    res.json({ ok: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ ok: false, error: 'Student not found' });
    }

    // Remove student from the school's students array
    await School.findByIdAndUpdate(student.school, { $pull: { students: student._id } });

    res.json({ ok: true, message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};