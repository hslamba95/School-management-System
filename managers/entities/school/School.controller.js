const School = require('./School.model');

module.exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json({ ok: true, data: schools });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to fetch schools' });
  }
};

module.exports.createSchool = async (req, res) => {
  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).json({ ok: true, data: school });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!school) {
      return res.status(404).json({ ok: false, error: 'School not found' });
    }
    res.json({ ok: true, data: school });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

module.exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).json({ ok: false, error: 'School not found' });
    }
    res.json({ ok: true, message: 'School deleted successfully' });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to delete school' });
  }
};