var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var grid;
var LINE = 3;
var COLUMN = 3;
var moles_number = LINE * COLUMN;
var HOLE_WIDTH = 128;
var HOLE_HEIGHT = 128;

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x95a5a6;
    setup_grid();
    //create_moles();
}

function update() {
}

function setup_grid() {
    var hole_texture = game.add.bitmapData(HOLE_WIDTH, HOLE_HEIGHT);
    hole_texture.ctx.beginPath();
    hole_texture.ctx.rect(0,0,HOLE_WIDTH,HOLE_HEIGHT);
    hole_texture.ctx.fillStyle = '#995500';
    hole_texture.ctx.fill();

    grid = game.add.group();

    for (var i = 0; i < LINE; i++) {
        for (var j = 0; j < COLUMN; j++) {
            // + 10 = offset
            var sprite = game.add.sprite((i * HOLE_WIDTH + i * 10) + 10,
                                         (j * HOLE_HEIGHT + j * 10) + 10,
                                         hole_texture);
            grid.add(sprite);
            console.log(sprite);
        }
    }
    console.log(grid);
}

function create_moles() {
    var mole_texture = game.add.bitmapData(32, 32);
    mole_texture.ctx.beginPath();
    mole_texture.ctx.rect(0,0,128,128);
    mole_texture.ctx.fillStyle = '#ff00ff';
    mole_texture.ctx.fill();

    for (var i = 0; i < moles_number; i++) {
        var sprite = game.add.sprite(0, 0, 'mole_texture');
        grid.add(sprite);
    }
}
