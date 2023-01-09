const express = require('express');
const router = express.Router();

const multer = require('multer')

const {body} = require('express-validator');
const {jwtauth} = require('./jwt');

const {changeLocation} = require('../controller/profile/changelocation')


router.post('/changeLocation', changeLocation)

module.exports = router;