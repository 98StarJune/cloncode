const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../../Database/Profile');
const Content = require('../../Database/Contents');

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");

module.exports.createContent = async (req, res, next) => {
    const id = req.userId;
    if (id) {
        console.log('로그인됨')
    }
    const title = req.body.title;
    const content = req.body.content;
    console.log(content)
    const tag = req.body.tag;
    const img = "/";
    try {
        const res_location = await Profile.findOne({id: id});
        if (res_location) {
            const location = res_location.location.location0;
            const contents = new Content({
                title: title,
                content: content,
                img: img,
                loaction: location[0],
                tag: tag
            })
            const save_resault = await contents.save();
            if (save_resault) {
                res.status(201).json({message: "정상적으로 등록되었습니다."})
            }
        }
    } catch (err) {
        errormessage(err, res);
    }
}