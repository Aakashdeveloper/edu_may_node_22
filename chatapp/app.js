let express = require('express');
let http = require('http');
let path = require('path');
let io = require('socket.io');
let app= express();

app.set('port', 4500);
app.use(express.static(path.join(__dirname, 'public')));

let server = http.createServer(app).listen(app.get('port'),function(){
    console.log('Server is running on port 4500')
})

io = require('socket.io').listen(server);

//handle Socket Traffic
io.sockets.on('connection',function(socket){
    socket.on('nick',function(nick){
        socket.nickname = nick
    })

    //reply to chat
    socket.on('chat',function(data){
        let nickname = socket.nickname;
        let payload = {
            message:data.message,
            nick:nickname
        };

        socket.emit('chat',payload);
        socket.broadcast.emit('chat',payload);
    })
})