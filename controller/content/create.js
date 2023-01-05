const express = require('express');
const mongoose = require('mongoose');
const User = require('../../Database/User')

const {errormessage} = require("../error");
const {validationResult} = require("express-validator");
const {validation} = require("../validationError");

module.exports.create = (req, res, next) =>{
    console.log('create controller')
}