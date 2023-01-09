const express = require('express');
const router = express.Router();

const multer = require('multer')

const {body} = require('express-validator');
const {jwtauth} = require('./jwt');

const {changeLocation} = require('../controller/profile/changelocation')
const {changeLevel} = require('../controller/profile/changeLevel')


router.post('/changelocation', changeLocation);
router.post('/changelevel', changeLevel);

module.exports = router;