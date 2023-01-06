const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../../Database/Profile');
const Content = require('../../Database/Contents');

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");

module.exports.create = async (req, res, next) =>{
    const id = req.userId;
    const title = req.body.title;
    const content = req.body.content;
    const img = "/";
    try{
        const res_location = await Profile.findOne({id : id});
        if(res_location){
            const location = res_location.location.location0;
            const content = new Content({
                title : title,
                content : content,
                img : img,
                loaction : location[0]
            })
            const save_resault = await content.save();
            if(save_resault){
                res.status(201).json({message : "정상적으로 등록되었습니다."})
            }
        }
    }catch (err){
        errormessage(err, res);
    }
}