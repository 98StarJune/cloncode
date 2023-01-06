const express = require('express');
const mongoose = require('mongoose');
const Content = require('../../Database/Contents');

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");

module.exports.delete = async (req, res, next) =>{
    const userid = req.userId;
    const contentid = mongoose.mongo.ObjectId(req.body.contentid);

    try{
        const find_resault = await Content.findById(contentid);
        if(find_resault){
            if(find_resault.id === userid){
                const delete_result = await find_resault.deleteOne();
                if(delete_result){
                    res.status(200).json({message: "게시글이 정상적으로 삭제되었습니다."})
                }
            }else{
                const error = new Error('요청자가 작성자와 일치하지 않습니다.');
                error.statusCode = 401;
                throw error;
            }
        }else{
            const error = new Error('존재하지 않는 게시글입니다.');
            error.statusCode = 404;
            throw error;
        }
    }catch(err){
        errormessage(err, res);
    }
}