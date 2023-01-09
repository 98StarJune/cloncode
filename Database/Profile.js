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
        level:{
            type:Number,
            require : true,
            default : 0
        },
        location0: {
            type: Object,
            require: true
        },
        location1: {
            type: Object,
            require: true
        },
        location2: {
            type: Object,
            require: true
        },
        location3: {
            type: Object,
            require: true
        }
    }
})
module.exports = mongoose.model('Profile', userSchema);