var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var socket;
var num;
var clicked = 0;

function preload() {
    game.load.image('button', '../assets/images/boxItem.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    socket = io();
    var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(on_click, this);

    var style = { font: "45px Arial", fill: "#ffffff", align: "center" };
    num = game.add.text(game.world.centerX, 550, "Clicked : 0", style);
    num.anchor.setTo(0.5, 0.5);

    socket.on('update_counter', function(clicked){
        update_counter(clicked);
    });

    socket.on('player_connection', function(clicked){
        console.log("A new player has connect");
        num.text = "Clicked : " + clicked;
    });
}

function update() {
}

function on_click() {
    console.log('Clicked');
    socket.emit('button_click', 'Button clicked !');
}

function update_counter(clicked) {
    num.text = "Clicked : " + clicked;
}