const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    price :{
        type : String,
        require : true
    },
    content: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    location: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true
    },
    createrid: {
        type: String,
        require: true
    },
    counter: {
        chat: {
            type: Number,
            default: 0
        },
        like: {
            type: Number,
            default: 0
        },
        normal: {
            type: Number,
            default: 0
        }
    }
})

module.exports = mongoose.model('Contents', userSchema);