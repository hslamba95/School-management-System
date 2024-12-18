const jwt = require('jsonwebtoken');
const config = require('../../../config/index.config.js');
const User = require('./User.model');

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ ok: false, error: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ ok: false, error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, config.dotEnv.JWT_SECRET, { expiresIn: '1h' });

    res.json({ ok: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};

module.exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Create a new user
    const user = new User({ username, password, role });
    await user.save();

    res.json({ ok: true, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Something went wrong!' });
  }
};