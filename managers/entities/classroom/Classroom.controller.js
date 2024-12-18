const Classroom = require('./Classroom.model');
const School = require('../school/School.model');

module.exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('school').populate('students').populate('teacher');
    res.json({ ok: true, data: classrooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.createClassroom = async (req, res) => {
  const { name, capacity, resources, school } = req.body;

  try {
    const classroom = new Classroom({ name, capacity, resources, school });
    await classroom.save();

    // Add classroom to the school's classrooms array
    await School.findByIdAndUpdate(school, { $push: { classrooms: classroom._id } });

    res.status(201).json({ ok: true, data: classroom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.updateClassroom = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const classroom = await Classroom.findByIdAndUpdate(id, updates, { new: true });
    if (!classroom) {
      return res.status(404).json({ ok: false, error: 'Classroom not found' });
    }

    // If the school is updated, ensure the classroom is moved to the new school's classrooms array
    if (updates.school && updates.school !== classroom.school.toString()) {
      await School.findByIdAndUpdate(classroom.school, { $pull: { classrooms: classroom._id } });
      await School.findByIdAndUpdate(updates.school, { $push: { classrooms: classroom._id } });
    }

    res.json({ ok: true, data: classroom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.deleteClassroom = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Classroom.findByIdAndDelete(id);
    if (!classroom) {
      return res.status(404).json({ ok: false, error: 'Classroom not found' });
    }

    // Remove classroom from the school's classrooms array
    await School.findByIdAndUpdate(classroom.school, { $pull: { classrooms: classroom._id } });

    res.json({ ok: true, message: 'Classroom deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};