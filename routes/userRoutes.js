const express = require('express');
const router = express.Router();
const { getAllCooks, getCookById } = require('../controllers/userController');

router.get('/cooks', getAllCooks);
router.get('/cooks/:id', getCookById);

module.exports = router;
