const {errormessage} = require('./error');
const {validationResult} = require("express-validator");

module.exports.validation = (req, res, errors) => {
    errors = errors.array()
    let messages = []
    for (let i = 0; i < errors.length; i++) {
        messages.push(errors[i].msg)
    }
    return errormessage(errors, res, "Validation Fail", messages);
}