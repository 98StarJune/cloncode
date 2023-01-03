const User = require('../../Database/User')
const Profile = require('../../Database/Profile')
const {errormessage} = require('../error')
const {validation} = require('../validationError')

const bcrypt = require('bcryptjs')
const {validationResult} = require("express-validator");

module.exports.signup = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return validation(req, res, errors);
    }
    const phone = req.body.phone;
    const nickname = req.body.nickname;
    const location = req.body.location;
    const img = req.file;
    let id;

    try {
        const find = await User.findOne({phone: phone});
        try {
            if (!find) {
                const user = await new User({
                    phone: phone
                }).save()
                id = user._id.toString()
                const min = Math.ceil(10000);
                const max = Math.floor(99999);
                const usertag = Math.floor(Math.random() * (max - min)) + min;
                const profilecheck = await Profile.findOne({nickname: nickname, usertag : usertag})
                if(!profilecheck){
                    const profile = await new Profile({
                        id: id,
                        nickname: nickname,
                        usertag: usertag,
                        img: "/"
                    }).save()
                        .then(resault => {
                            console.log('New User Added  / ' + new Date())
                            res.status(201).json({message: "정상적으로 등록되었습니다."})
                        })
                        .catch(err => {
                            errormessage(err, res, 'Error Detected at [control/signup/profilesave]')
                        })
                }
                else{
                    console.log(profilecheck)
                    res.status(409).json({message: '이미 존재하는 사용자입니다.'});
                }
            } else {
                res.status(409).json({message: '이미 존재하는 사용자입니다.'});
            }
        } catch (err) {
            errormessage(err, res, 'Error Detected at [control/signup/usersave]');
        }
    } catch (err) {
        errormessage(err, res, 'Error Detected at [control/signup/find]');
    }
}