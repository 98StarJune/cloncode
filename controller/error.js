const express = require('express');

module.exports.errormessage = (err, res) => {
    if(err.validation){
        return res.status(500).json({message : err.message, error : err.validation});
    }
    res.status(err.statusCode).json({message : err.message});
    if(err.root){
        console.log(err)
        console.log(err.root)
    }
}