var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../client')));

var clicked = 0;

io.on('connection', function(socket){
    console.log('Connection of a client.');
    console.log(clicked);

    socket.on('button_click', function(msg){
        console.log(msg);
        clicked += 1;
        console.log(clicked);
        io.emit('update_counter', clicked);
    });

    io.emit('player_connection', clicked);
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
