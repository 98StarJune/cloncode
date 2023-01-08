const express = require('express');
const fs = require("fs");

module.exports.errormessage = (err, res) => {
    console.log(new Date());
    fs.appendFileSync('log.txt', "["+ new Date().toISOString() + "] ")
    if (err.validation) {
        fs.appendFileSync('log.txt', "Validation Error \n")
        return res.status(500).json({message: err.message, error: err.validation});
    }
    if (err.message) {
        fs.appendFileSync('log.txt', "Error Message : " + err.message);
        console.log(err.message);
    }
    if (err.root) {
        fs.appendFileSync('log.txt', "Error : " + err + "\n");
        fs.appendFileSync('log.txt', "Root : " + err.root);
    }
    if (err.statusCode) {
        fs.appendFileSync('log.txt', "Error Code : "+err.statusCode)
        res.status(err.statusCode).json({message: err.message});
    } else {
        res.json({message: err.message})
    }
}