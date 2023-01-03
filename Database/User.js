const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        default : null
    }
})

module.exports = mongoose.model('User', userSchema);