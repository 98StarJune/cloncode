/**
 * 로케이션 레벨을 DB(Profile)에 저장하고 있는다. 기본 값은 0
 *
 * 그 상태에서 변경하기를 눌러 수정할 수 있는데,
 * 로케이션 레벨에 따라서 검색할 지역을 정한다.
 *
 * find를 요청할 때 location level을 배열 인덱스로 이용
 *
 * 찾기가 되는지 확인 시작*/

const Profile = require('../../Database/Profile')

const {errormessage} = require('../error')
const {validation} = require('../validationError')

module.exports.changeLevel = async (req, res, next) =>{
    const id = req.userId;
    const selected = req.body.selected;
    try{
        const user = Profile.find({id: id});
        if(!user){
            const error = new Error('해당하는 사용자를 찾을 수 없습니다.');
            error.statusCode = 401;
            error.root = "/changeLevel/findUser"
            throw error;
        }
        user.location.level = selected;
        const save_result = await user.save();
    }
    catch(err){
        errormessage(err, res);
    }
}