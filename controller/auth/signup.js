const User = require('../../Database/User')
const Profile = require('../../Database/Profile')
const {errormessage} = require('../error')
const {validation} = require('../validationError')
const {inquiry, nearlylocation} = require('./openapi');

const bcrypt = require('bcryptjs')
const {validationResult} = require("express-validator");

module.exports.signup = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return validation(res, errors);
    }

    try {
        const phone = req.body.phone;
        const nickname = req.body.nickname;

        const img = req.file;
        let id;
        const find = await User.findOne({phone: phone});
        if (find) {
            res.status(409).json({message: '이미 존재하는 사용자입니다.'});
        } else {
            const user = await new User({
                phone: phone
            })
            const saveresault = await user.save();
            if (saveresault) {
                const id = user._id.toString()
                const min = Math.ceil(10000);
                const max = Math.floor(99999);
                const usertag = Math.floor(Math.random() * (max - min)) + min;

                const profile = await Profile.findOne({nickname: nickname, usertag: usertag})
                if (!profile) {
                    let location = []
                    location.push(await inquiry(req.body.location));
                    let locationArr = [];
                    for (let i = 1; i < 4; i++) {
                        const locationTemp = await nearlylocation(location, i)
                        locationArr.push(locationTemp);
                    }
                    const profile = await new Profile({
                        id: id,
                        nickname: nickname,
                        usertag: usertag,
                        img: "/",
                        location: {
                            location0 : location,
                            location1 : locationArr[0],
                            location2 : locationArr[1],
                            location3 : locationArr[2]
                        }
                    })
                    const profilesave = await profile.save();
                    if (!profilesave) {
                        const error = new Error('에러가 발생했습니다.');
                        error.statusCode = 401;
                        error.root = "control/auth/profile/save"
                        throw error;
                    }
                    else {
                        console.log('New User Added  / ' + new Date())
                        res.status(201).json({message: "정상적으로 등록되었습니다."})
                    }
                }
                else {
                    const error = new Error('에러가 발생했습니다.');
                    error.statusCode = 401;
                    error.root = "control/auth/signup/check/profile"
                    throw error;
                }
            } else {
                const error = new Error('에러가 발생했습니다.');
                error.statusCode = 401;
                error.root = "control/auth/signup/save/user"
                throw error;
            }
        }
    }
    catch(err){
        errormessage(err, res);
    }
}