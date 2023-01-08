const express = require('express');
const mongoose = require('mongoose');
const Content = require('../../Database/Contents');
const Profile = require('../../Database/Profile')

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");
const {response} = require("express");

module.exports.findContentByKeyword = async (req, res, next) =>{
    try{
        const id = req.userId;
        const findbyid = await Profile.findOne({id : id})
        if(!findbyid){
            const error = new Error('에러가 발생했습니다.');
            error.statusCode = 401;
            error.root = "control/content/findContent/findUser"
            throw error;
        }
        const location_level = findbyid.location.location0
        const temp = req.body.keyword
        const keyword = new RegExp(temp);
        const find_result = await Content.find({title: keyword, location : location_level})
        if(find_result){
            console.log(find_result);
            res.status(201).json({
                result : find_result
            })
        }else{
            return res.status(404).json({message : "검색 결과 없음"})
        }
    }catch(err){
        errormessage(err, res);
    }
}

module.exports.findAll = async (req, res, next) =>{
    const id = req.userId;
    const findbyid = await Profile.findOne({id : id})
    if(!findbyid){
        const error = new Error('에러가 발생했습니다.');
        error.statusCode = 401;
        error.root = "control/content/findContent/findUser"
        throw error;
    }
    try{
        const location_level = findbyid.location.location0
        const find_result = await Content.find({location : location_level});
        if(find_result){
            res.status(201).json({
                result : find_result
            })
        }else{
            return res.status(404).json({message : "검색 결과 없음"})
        }
    }catch (err){
        errormessage(err, res)
    }
}