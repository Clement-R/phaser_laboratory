var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var grid;
var LINE = 3;
var COLUMN = 3;
var moles_number = LINE * COLUMN;
var HOLE_WIDTH = 128;
var HOLE_HEIGHT = 128;
var moles = new Array();
var score = 0;

function preload() {
    game.load.image('diglett', '../assets/images/diglett.png');
    game.load.image('hole', '../assets/images/whack_hole.png');
}

function create() {
    game.stage.backgroundColor = 0x95a5a6;
    setup_grid();
    create_moles();
}

function update() {
    /*moles.forEach(function(mole){
        if(mole.sprite.visible == false && mole.is_moving == false) {
            mole.appear();
        }
    });*/

    // debug();
}

function debug() {
    game.debug.spriteBounds(mole.sprite);
}

function setup_grid() {
    grid = game.add.group();

    for (var i = 0; i < LINE; i++) {
        for (var j = 0; j < COLUMN; j++) {
            // + 10 = offset
            var sprite = game.add.sprite((i * HOLE_WIDTH + i * 10) + 200,
                                         (j * HOLE_HEIGHT + j * 10) + 100,
                                         'hole');
        }
    }
}

function create_moles() {

    for (var i = 0; i < LINE; i++) {
        for (var j = 0; j < COLUMN; j++) {
            mole = new Mole((i * HOLE_WIDTH  + i * 10) + 205,
                            (j * HOLE_HEIGHT + j * 10) + 90);
            moles.push(mole);
        }
    }
}
