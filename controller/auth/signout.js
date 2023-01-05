const User = require('../../Database/User');
const Profile = require('../../Database/Profile');
const Content = require('../../Database/Contents');
const mongoose = require("mongoose");
const {errormessage} = require("../error");

module.exports.signout = async (req, res, next) => {
    const id = req.userId;
    const _id = mongoose.mongo.ObjectId(id);
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(401).json({message : "존재하지 않는 사용자입니다."});
        }
        else{
            const content = await Content.find({id: id});
            if (content) {
                await Content.deleteMany({id: id});
            }else{
                console.log('Contents가 존재하지 않는 사용자입니다.')
            }
            const profile = await Profile.find({id: id})
            if (profile) {
                await Profile.deleteMany({id: id});
            }else{
                const error = new Error('에러가 발생했습니다.');
                error.statusCode = 500;
                error.root = "control/auth/signout/findprofile"
                throw error;
            }
            const resault = await User.findByIdAndRemove(_id);
            if(resault){
              res.status(200).json({message : "모든 데이터가 삭제되었습니다."})
            }else{
                const error = new Error('에러가 발생했습니다.');
                error.statusCode = 500;
                error.root = "control/auth/signout/deleteUser"
                throw error;
            }
        }
    } catch (err) {
        errormessage(err, res);
    }
}