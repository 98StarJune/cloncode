let io;

module.exports = {
    init : httpServer =>{
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: ()=>{
        if(!io){
            throw new Error('Socket.io가 초기화 되지 않았습니다.');
        }
        return io;
    }
}