const express = require('express');
const mongoose = require('mongoose');
const Content = require('../../Database/Contents');
const Profile = require('../../Database/Profile')

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");
const {response} = require("express");

/**키워드 입력으로 검색*/
module.exports.findContentByKeyword = async (req, res, next) => {
    const id = req.userId;
    const temp = req.body.keyword
    try {

        const user = await Profile.find({id: id})
        if (!user) {
            const error = new Error('에러가 발생했습니다.');
            error.statusCode = 401;
            error.root = "control/content/findContent/findUser"
            throw error;
        }

        if(!temp){
            const error = new Error('need Keyword');
            error.statusCode = 404;
            error.root = "control/content/findContentByKey/Keyword"
            throw error;
        }
        const keyword = new RegExp(temp); //keyword 받아서 정규식으로 바꿔
        const location_level = user.location.level; //유저정보에서 레벨을 추출해
        let location_value;
        let find_;
        switch (location_level){
            case 0:
                location_value = user.location.location0 //value에 레벨에 해당하는 모든 값을 넣어
                find_ = await Content.find({location: location_value})
                break; //value와 일치하는 모든 게시글을 찾아서 find_에 넣어
            case 1:
                location_value = user.location.location1
                find_ = await Content.find({location: location_value})
                break;
            case 2:
                location_value = user.location.location2
                find_ = await Content.find({location: location_value})
                break;
            case 3:
                location_value = user.location.location3
                find_ = await Content.find({location: location_value})
                break;
        }
//find_에서 keyword로 찾아
        const find_result = await find_.find({title: keyword})
        if (find_result) {
            res.status(201).json({
                result: find_result
            })
        } else {
            return res.status(404).json({message: "검색 결과 없음"})
        }
    } catch (err) {
        errormessage(err, res);
    }
}

module.exports.findAll = async (req, res, next) => {
    const id = req.userId;
    const findbyid = await Profile.findOne({id: id})
    if (!findbyid) {
        const error = new Error('Cannot Find User Infomation');
        error.statusCode = 401;
        error.root = "control/content/findContent/findUser"
        throw error;
    }
    try {
        const location_level = findbyid.location.level;
        let location_value;
        let find;
        switch (location_level){
            case 0:
                location_value = findbyid.location.location0
                find = await Content.find({location: location_value})
                break;
            case 1:
                location_value = findbyid.location.location1
                find = await Content.find({location: location_value})
                break;
            case 2:
                location_value = findbyid.location.location2
                find = await Content.find({location: location_value})
                break;
            case 3:
                location_value = findbyid.location.location3
                find = await Content.find({location: location_value})
                break;
        }
        // const find_result = await Content.find({location: find});
        if (find) {
            res.status(201).json({
                result: find
            })
        } else {
            return res.status(404).json({message: "검색 결과 없음"})
        }
    } catch (err) {
        errormessage(err, res)
    }
}

module.exports.findDetail = async (req, res, next) => {
    const userid = req.userId;
    const contentid = mongoose.mongo.ObjectId(req.body.content);
    try {
        const findbyid = await Profile.findOne({id: userid})
        if (!findbyid) {
            const error = new Error('Cannot Find User Infomation');
            error.statusCode = 401;
            error.root = "control/content/findContent/findUser"
            throw error;
        }

        const res_content = await Content.findById(contentid);
        if(!res_content){
            const error = new Error('Cannot Find Content');
            error.statusCode = 404;
            error.root = "control/content/findContent/findDetail"
            throw error;
        }

        if(userid === findbyid.id){
            res.status(200).json({
                contents: res_content,
                user: {
                    nickname: findbyid.nickname,
                    tag : findbyid.tag
                },
                match : true
            })
        }else{
            res.status(200).json({
                result: res_content,
                match : false
            })
        }
    }catch(err){
        errormessage(err, res);
    }
}