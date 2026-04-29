const express = require('express');
const router = express.Router();
const { createReview, getMyReviews, getCookReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReview);
router.get('/myreviews', protect, getMyReviews);
router.get('/cook/:cookId', getCookReviews); // Public access

module.exports = router;
