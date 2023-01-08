const express = require('express');
const mongoose = require('mongoose');
const Content = require('../../Database/Contents');
const Profile = require('../../Database/Profile')

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");

module.exports.updateContent = async (req, res, next) => {
    try {
        const id = req.userId;
        const contentid = mongoose.mongo.ObjectId(req.body.contentid);  //컨텐츠 ID는 필수값
        const req_title = req.body.title;
        const req_content = req.body.content;
        const req_tag = req.body.tag;
        const req_img = "/";
        let user_location

        const content = await Content.findById(contentid);

        if (content) {
            if (content.createrid === id) {
                const res_location = await Profile.findOne({id: id});
                if (res_location) {
                    user_location = res_location.location.location0[0].toString()
                }
                if (content.title !== req_title) {
                    content.title = req_title
                }
                if (content.content !== req_content) {
                    content.content = req_content
                }
                if (content.tag !== req_tag) {
                    content.tag = req_tag
                }
                if (content.img !== req_img) {
                    content.img = req_img
                }
                if (content.location !== user_location) {
                    content.location = user_location
                }
                content.time.editedTime = new Date().toISOString()

                const result = await content.save();
                if (result) {
                    res.status(200).json({messgae: "게시글이 성공적으로 수정되었습니다."})
                }
            } else {
                const error = new Error('요청자가 작성자와 일치하지 않습니다.');
                error.statusCode = 401;
                throw error;
            }
        }
    } catch (err) {
        errormessage(err, res)
    }
}