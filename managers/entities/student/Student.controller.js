const Student = require('./Student.model');

module.exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('school').populate('classroom');
    res.json({ ok: true, data: students });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to fetch students' });
  }
};

module.exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ ok: true, data: student });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ ok: false, error: 'Student not found' });
    }
    res.json({ ok: true, data: student });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ ok: false, error: 'Student not found' });
    }
    res.json({ ok: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to delete student' });
  }
};