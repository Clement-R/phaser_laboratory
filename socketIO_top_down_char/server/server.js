var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../client')));

var players = new Array();
var num_players = 0;

io.on('connection', function(socket){
    console.log('Connection of a client.');

    socket.on('new_player', function(player_pos){
        console.log("New player at : " + player_pos.x + " - " + player_pos.y);

        players[num_players] = player_pos;
        var data = {id:  num_players,
                    pos: player_pos
                };
        io.emit('notify_new_player', data);

        num_players += 1;
    });

    socket.on('game_update', function(data){
        //
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
