const Review = require('../models/Review');
const Meal = require('../models/Meal');
const User = require('../models/User');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { mealId, cookId, rating, text } = req.body;

    if (!mealId || !cookId || !rating || !text) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Optional: check if user already reviewed this meal
    // const existing = await Review.findOne({ mealId, customerId: req.user.id });
    // if (existing) return res.status(400).json({ message: 'Already reviewed' });

    const review = new Review({
      mealId,
      cookId,
      customerId: req.user.id,
      rating,
      text
    });

    await review.save();

    // Recalculate average rating for the Meal
    const mealReviews = await Review.find({ mealId });
    const mealAvg = mealReviews.reduce((sum, r) => sum + r.rating, 0) / mealReviews.length;
    await Meal.findByIdAndUpdate(mealId, {
      rating: mealAvg,
      reviewCount: mealReviews.length
    });

    // Recalculate average rating for the Cook
    const cookReviews = await Review.find({ cookId });
    const cookAvg = cookReviews.reduce((sum, r) => sum + r.rating, 0) / cookReviews.length;
    await User.findByIdAndUpdate(cookId, {
      rating: cookAvg,
      reviewCount: cookReviews.length
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get reviews written by logged in user
// @route   GET /api/reviews/myreviews
// @access  Private
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ customerId: req.user.id })
      .populate('mealId', 'title images')
      .populate('cookId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get reviews for a specific cook
// @route   GET /api/reviews/cook/:cookId
// @access  Public
exports.getCookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ cookId: req.params.cookId })
      .populate('customerId', 'name avatar')
      .populate('mealId', 'title images')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
