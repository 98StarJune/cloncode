const User = require('../../Database/User')
const {errormessage} = require('../error')

const bcrypt = require('bcryptjs')

module.exports.signup = async (req, res, next) =>{
    const id = req.body.id;
    const pw = req.body.pw;
    const img = req.file;
    const nickname = req.body.nickname;
    const phone = req.body.phone;
    const location = req.body.location;
    const email = req.body.email;

    const hashed = await bcrypt.hash(pw, 12);
    try{
        const resault = await User.find({id:id})
        try{
            if(resault[0]){
                console.log(resault);
                return res.status(200).json({message : '이미 존재하는 ID 입니다.'});
            }
            const user = await new User({
                id: id,
                pw : hashed,
                email:email,
                profileIMG: img,
                nickname : nickname,
                phone : phone,
                location : location
            }).save()
            try{
                res.status(201).json({message : "정상적으로 등록되었습니다."})
            }catch(err){
                return errormessage(err, res, 'Error Detected at [control/signup/save]')
            }

        }catch (err){
            return errormessage(err, res, 'Error Detected at [control/signup/find]');
        }
    }catch (err){
        return errormessage(err, res, 'Error Detected at [control/signup/hash]');
    }
}