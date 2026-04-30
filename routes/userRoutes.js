const express = require('express');
const router = express.Router();
const { getAllCooks, getCookById, getUserById, updateUser } = require('../controllers/userController');

router.get('/cooks', getAllCooks);
router.get('/cooks/:id', getCookById);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

module.exports = router;
