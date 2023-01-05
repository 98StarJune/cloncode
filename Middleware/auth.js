const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const {jwtauth} = require('./jwt');

const {signup} = require('../controller/auth/signup');
const {login} = require('../controller/auth/login');
const {addEmail} = require('../controller/auth/addemail');
const {signout} = require('../controller/auth/signout');



// auth middleware

router.post('/signup', [
        body('phone').exists().trim().isLength({min: 10, max: 11}).withMessage('전화번호를 확인하세요.'),
        body('nickname').exists().trim().withMessage('닉네임을 확인하세요.'),
        body('location').exists().trim().withMessage('위치 정보를 확인하세요.')]
    , signup);

router.post('/login', login);

router.post('/addemail', [
    body('id').exists().trim().isLength({min : 24}).withMessage('ID 값이 올바르지 않습니다.'),
    body('email').exists().trim().isEmail().withMessage('이메일을 확인하세요.')
], addEmail);

router.post('/signout', jwtauth, signout);

module.exports = router;