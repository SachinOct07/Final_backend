const express = require('express');
const { login, register } = require('../controllers/adminController');
const { body } = require('express-validator');

const router = express.Router();

router.post('/login', [
  body('username').notEmpty(),
  body('password').notEmpty(),
], login);

router.post('/register', [
  body('username').notEmpty(),
  body('password').isLength({ min: 6 }),
], register);

module.exports = router;