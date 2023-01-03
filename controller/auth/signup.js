const User = require('../../Database/User')
const Profile = require('../../Database/Profile')
const {errormessage} = require('../error')

const bcrypt = require('bcryptjs')

module.exports.signup = async (req, res, next) => {
    const phone = req.body.phone;

    const find = await User.findOne({phone: phone});
    try {
        if (!find) {
            const user = await new User({
                phone: phone
            }).save()
            try {
                return res.status(201).json({message: "정상적으로 등록되었습니다."})
            } catch (err) {
                return errormessage(err, res, 'Error Detected at [control/signup/save]')
            }
        }
        return res.status(409).json({message: '이미 존재하는 ID 입니다.'});
    } catch (err) {
        return errormessage(err, res, 'Error Detected at [control/signup/find]');
    }
}