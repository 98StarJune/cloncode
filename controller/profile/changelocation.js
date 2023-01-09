const express = require('express');
const mongoose = require('mongoose');
const Content = require('../../Database/Contents');
const Profile = require('../../Database/Profile')

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");
const {inquiry, nearlylocation} = require("../auth/openapi");

/** newlocation이 반드시 포함되어야합니다.*/
module.exports.changeLocation = async (req, res, next) =>{
    const id = req.userId;

    try{
        const user = await Profile.find({id:id});
        if(!user){
            const error = new Error('해당하는 사용자를 찾을 수 없습니다.');
            error.statusCode = 401;
            error.root = "/chageLocation/findUser"
            throw error;
        }

        let location = []
        location.push(await inquiry(req.body.newlocation)); //필수값
        let locationArr = [];
        for (let i = 1; i < 4; i++) {
            const locationTemp = await nearlylocation(location, i)
            locationArr.push(locationTemp);
        }

        user.location0 = location;
        user.location1 = locationArr[0];
        user.location2 = locationArr[1];
        user.location3 = locationArr[2];

        const save_result = await user.save();
        if(!save_result){
            const error = new Error('저장에 실패했습니다.');
            error.statusCode = 500;
            error.root = "/chageLocation/Save"
            throw error;
        }
    }
    catch(err){
        errormessage(err, res)
    }
}