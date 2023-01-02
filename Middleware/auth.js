const express = require('express');
const router = express.Router();

const {signup} = require('../controller/auth/signup');

//router.post('/login', )
router.post('/signup', signup);

module.exports = router;