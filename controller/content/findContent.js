const express = require('express');
const mongoose = require('mongoose');
const Content = require('../../Database/Contents');

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");
const {response} = require("express");

module.exports.findContentByKeyword = async (req, res, next) =>{
    try{
        const temp = req.body.keyword
        const keyword = new RegExp(temp);
        const find_result = await Content.find({title: keyword})
        if(find_result){
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
