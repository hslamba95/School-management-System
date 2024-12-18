const School = require('./School.model');

module.exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find()
      .populate('classrooms')
      .populate('students');
    res.json({ ok: true, data: schools });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.createSchool = async (req, res) => {
  const { name, address, phone, email } = req.body;

  try {
    const school = new School({ name, address, phone, email });
    await school.save();
    res.status(201).json({ ok: true, data: school });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.updateSchool = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const school = await School.findByIdAndUpdate(id, updates, { new: true })
      .populate('classrooms')
      .populate('students');
    if (!school) {
      return res.status(404).json({ ok: false, error: 'School not found' });
    }
    res.json({ ok: true, data: school });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.deleteSchool = async (req, res) => {
  const { id } = req.params;

  try {
    const school = await School.findByIdAndDelete(id);
    if (!school) {
      return res.status(404).json({ ok: false, error: 'School not found' });
    }
    res.json({ ok: true, message: 'School deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};