const {errormessage} = require('./error');
const {validationResult} = require("express-validator");

module.exports.validation = (res, errors) => {
    try{
        errors = errors.array()
        let messages = []
        for (let i = 0; i < errors.length; i++) {
            messages.push(errors[i].msg)
        }
        const error = new Error('유효성 검사에 실패했습니다.');
        error.validation = messages;
        throw error;
    }
    catch (err){
        errormessage(err, res);
    }
}