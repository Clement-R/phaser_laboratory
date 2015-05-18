var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var timer;
function preload() {
    game.load.image('img', '../assets/images/heart_full.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    var sprite = game.add.sprite(100, 100, 'img');
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(launch, this);

    
}

function update() {
}

function launch() {
    timer = game.time.create(true);
    timer.add(2000, explode);
    timer.start();
}

function explode() {
    console.log('Explode');
}