const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    nickname: {
        type: String,
        require: true
    },
    usertag: {
        type: Number,
        require: true
    },
    location: {
        location0: {
            type: String,
            require: true
        },
        location1: {
            type: String,
            require: true
        },
        location2: {
            type: String,
            require: true
        },
        location3: {
            type: String,
            require: true
        }
    }
})
module.exports = mongoose.model('Profile', userSchema);