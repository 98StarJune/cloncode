const express = require('express');
const mongoose = require('mongoose');
const User = require('../../Database/User')

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");
const {stringify} = require("nodemon/lib/utils");

module.exports.addEmail = async (req, res, next) =>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return validation(req, res, errors);
    }
    try{
        const email = req.body.email;
        const id = mongoose.mongo.ObjectId(req.body.id);
        const user = await User.findOne({_id : id});
        if(user){
            user.email = email;
        }
        else{
            const error = new Error('존재하지 않는 사용자입니다.');
            error.statusCode = 401;
            throw error;
        }

        const resault = await user.save();
        if(resault){
            res.status(202).json({message : "이메일이 등록되었습니다."})
        }
        else{
            const error = new Error('에러가 발생했습니다.');
            error.statusCode = 401;
            error.root = "control/auth/addEmail/save"
            throw error;
        }
    }
    catch (err){
        errormessage(err, res);
    }
}
