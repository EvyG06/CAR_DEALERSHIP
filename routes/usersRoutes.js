const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersController');
const authService = require('../services/authService');

router.post('/register', authService, userController.register);
router.post('/login', authService, userController.login);


module.exports = router;