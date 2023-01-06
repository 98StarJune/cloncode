const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const {jwtauth} = require('./jwt');

const {create} = require('../controller/content/create');

router.post('/create',jwtauth, create);

module.exports = router;