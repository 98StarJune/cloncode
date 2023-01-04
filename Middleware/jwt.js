const jwt = require('jsonwebtoken');
const {jwtcode} = require('../secret/secret.json')
const {errormessage} = require('../controller/error')

module.exports.jwtauth = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[0];
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, jwtcode);
        if(!decodedToken){
            return res.status(401).json({message : "토큰이 존재하지 않습니다."})
        }
        req.userId = decodedToken.id;
        next();
    }
    catch (err){
        err.statusCode = 500;
        err.message = "토큰이 유효하지 않습니다."
        errormessage(err, res);
    }
}
