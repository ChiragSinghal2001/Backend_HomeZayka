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

// @desc    Get any user by ID
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Public (should be protected in prod)
exports.updateUser = async (req, res) => {
  try {
    const { name, phone, address, bio, avatar } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    const updatedUser = await user.save();
    
    // Don't return password
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
