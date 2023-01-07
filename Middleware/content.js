const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const {jwtauth} = require('./jwt');

const {createContent} = require('../controller/content/createContent');
const {deleteContent} = require('../controller/content/deleteContent');
const {findContentByKeyword, findAll} = require('../controller/content/findContent');

router.post('/create',jwtauth, createContent);
router.post('/delete', jwtauth, deleteContent);
router.post('/findkey', jwtauth, findContentByKeyword);
router.post('/findall', jwtauth, findAll);

module.exports = router;
