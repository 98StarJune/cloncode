const express = require('express');
const router = express.Router();

const {body} = require('express-validator');

const {signup} = require('../controller/auth/signup');
const {login} = require('../controller/auth/login');

// auth middleware

//router.post('/login', )
router.post('/signup', [
        body('phone').exists().trim().isLength({min: 10, max: 11}).withMessage('전화번호를 확인하세요.'),
        body('nickname').exists().trim().withMessage('닉네임을 확인하세요.'),
        body('location').exists().trim().withMessage('위치 정보를 확인하세요.')]
    , signup);
router.post('/login', login);

module.exports = router;