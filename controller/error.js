module.exports.errormessage = (error, res, message) =>{
    console.log(message);
    console.log(error);
    res.status(500).json({message : "에러가 발생했습니다."});
}