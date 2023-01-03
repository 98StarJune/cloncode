module.exports.errormessage = (error, response, con_message) => {
    console.log(message);
    console.log(error);
    response.status(500).json({message: "에러가 발생했습니다."});
}

module.exports.errormessage = (error, response, con_message, res_message, status_code) => {
    console.log(con_message)
    console.log(error);
    if (!status_code) {
        response.status(400).json({message: res_message})
    } else {
        response.status(status_code).json({message: res_message})
    }
}