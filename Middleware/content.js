const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const {jwtauth} = require('./jwt');

const {createContent} = require('../controller/content/createContent');
const {deleteContent} = require('../controller/content/deleteContent')

router.post('/create',jwtauth, createContent);
router.post('/delete', jwtauth, deleteContent);

module.exports = router;