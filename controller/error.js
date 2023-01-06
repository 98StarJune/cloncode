const express = require('express');

module.exports.errormessage = (err, res) => {
    console.log(new Date());
    if(err.validation){
        return res.status(500).json({message : err.message, error : err.validation});
    }
    if(err.root){
        console.log(new Date());
        console.log(err)
        console.log(err.root)
    }
    if(err.statusCode){
        res.status(err.statusCode).json({message : err.message});
    }else{
        res.json({message : err.message})
    }
}