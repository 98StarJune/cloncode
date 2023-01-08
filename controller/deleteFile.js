const fs = require('fs');


module.exports.deleteFile = (content)=>{
    if(content.img && fs.existsSync(content.img)){
        fs.unlinkSync(content.img);
        return 'success';
    }else{
        return 'not exist';
    }
}