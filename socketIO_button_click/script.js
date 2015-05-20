var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var socket;
function preload() {
    game.load.image('button', '../assets/images/boxItem.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    socket = io();
    var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(on_click, this);

    /*socket.on('chat message', function(msg){
    });*/
}

function update() {
}

function on_click() {
    console.log('Clicked');
    socket.emit('button_click', 'Button clicked !');
}
