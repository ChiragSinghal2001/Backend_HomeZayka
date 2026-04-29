const User = require('../models/User');

// @desc    Get all cooks
// @route   GET /api/users/cooks
// @access  Public
exports.getAllCooks = async (req, res) => {
  try {
    const cooks = await User.find({ role: 'cook' }).select('-password');
    res.json(cooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get cook by ID
// @route   GET /api/users/cooks/:id
// @access  Public
exports.getCookById = async (req, res) => {
  try {
    const cook = await User.findById(req.params.id).select('-password');
    if (!cook || cook.role !== 'cook') return res.status(404).json({ message: 'Cook not found' });
    res.json(cook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
