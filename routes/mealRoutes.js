const express = require('express');
const router = express.Router();
const { getAllMeals, getMealById, createMeal } = require('../controllers/mealController');
const { protect, cookOnly } = require('../middleware/authMiddleware');

router.get('/', getAllMeals);
router.get('/:id', getMealById);
router.post('/', protect, cookOnly, createMeal);

module.exports = router;
