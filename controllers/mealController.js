const Meal = require('../models/Meal');

// @desc    Get all meals
// @route   GET /api/meals
// @access  Public
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ isAvailable: true }).populate('cookId', 'name avatar rating reviewCount location');
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single meal
// @route   GET /api/meals/:id
// @access  Public
exports.getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate('cookId', 'name avatar rating reviewCount location');
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a meal
// @route   POST /api/meals
// @access  Private/Cook
exports.createMeal = async (req, res) => {
  try {
    const newMeal = new Meal({
      ...req.body,
      cookId: req.user.id
    });
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
