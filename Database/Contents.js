const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    content : {
        type : String,
        require : true
    },
    img : {
        type:String
    },
    location:{
        type:String,
        require:true
    },

    counter :{
        chat : {
            type: Number
        },
        like:{
            type:Number
        },
        normal:{
            type:Number
        }
    }
})

module.exports = mongoose.model('Contents', userSchema);