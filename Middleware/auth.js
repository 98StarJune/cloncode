const express = require('express');
const router = express.Router();

const {signup} = require('../controller/auth/signup');
const {login} = require('../controller/auth/login');

// auth middleware

//router.post('/login', )
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;