const jwt = require('jsonwebtoken');
const {jwtcode} = require('../secret/secret.json')
const {errormessage} = require('../controller/error')

module.exports.jwtauth = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, jwtcode);
    }
    catch (err){
        return errormessage(err, res, 'Error Detected at [Middleware/jwt/auth]')

    }
    if(!decodedToken){
        res.status(401).json({message : "토큰이 존재하지 않습니다."})
    }
    req.userId = decodedToken;
    next();
}
