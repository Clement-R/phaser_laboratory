var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var life;

function preload() {
    game.load.image('heart_full', '../assets/images/heart_full.png');
    game.load.image('heart_half', '../assets/images/heart_half.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    show_life();

    debug();
}

function update() {
}

function debug() {
    console.log(life);
}

function show_life() {
    life = game.add.group()
    life.create(0, 0, 'heart_full');
    life.create(100, 0, 'heart_full');
    life.create(200, 0, 'heart_full');
}