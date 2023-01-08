const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const {jwtauth} = require('./jwt');

const {createContent} = require('../controller/content/createContent');
const {deleteContent} = require('../controller/content/deleteContent');
const {findContentByKeyword, findAll, findDetail} = require('../controller/content/findContent');
const {updateContent} = require('../controller/content/updateContent')
const fileUpload = require('../Middleware/file')

router.post('/create',jwtauth, fileUpload.single('image'), createContent);
router.post('/delete', jwtauth, deleteContent);
router.post('/findkey', jwtauth, findContentByKeyword);
router.post('/findall', jwtauth, findAll);
router.post('/update', jwtauth, updateContent)
router.post('/findDetail', jwtauth, findDetail)

module.exports = router;