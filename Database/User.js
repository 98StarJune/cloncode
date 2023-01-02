const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    pw: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    nickname: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    profileIMG: {
        type: String
    },
    phone: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);