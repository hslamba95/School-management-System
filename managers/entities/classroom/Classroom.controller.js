const Classroom = require('./Classroom.model');

module.exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('school');
    res.json({ ok: true, data: classrooms });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to fetch classrooms' });
  }
};

module.exports.createClassroom = async (req, res) => {
  try {
    const classroom = new Classroom(req.body);
    await classroom.save();
    res.status(201).json({ ok: true, data: classroom });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classroom) {
      return res.status(404).json({ ok: false, error: 'Classroom not found' });
    }
    res.json({ ok: true, data: classroom });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!classroom) {
      return res.status(404).json({ ok: false, error: 'Classroom not found' });
    }
    res.json({ ok: true, message: 'Classroom deleted successfully' });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to delete classroom' });
  }
};