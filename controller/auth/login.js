const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../../Database/User');
const {errormessage} = require("../error");
const secret = require('../../secret/secret.json')

module.exports.login = async (req, res, next) =>{
    const phone = req.body.phone;
    const user = await User.findOne({phone : phone});
    try{
        if(!user){
            return res.status(401).json({message : "존재하지 않는 회원입니다."});
        }
        else{
            const token = await jwt.sign({
                id : user._id.toString(),
                time : new Date().toString()
            }, secret.jwt, {expiresIn : '1h'});
            res.status(200).json({token : token, message : "로그인에 성공했습니다."});
        }

    }catch (err){
        errormessage(err, res);
    }
}