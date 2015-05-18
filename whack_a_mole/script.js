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
var score_text;

function preload() {
    game.load.image('diglett', '../assets/images/diglett.png');
    game.load.image('hole', '../assets/images/whack_hole.png');
}

function create() {
    game.stage.backgroundColor = 0x95a5a6;
    setup_grid();
    create_moles();

    var timer = game.time.create(false);
    
    timer.loop(500, launch);
    timer.start();

    var style = { font: "45px Arial", fill: "#ffffff", align: "center" };
    score_text = game.add.text(game.world.centerX, 550, "Score : ", style);
    score_text.anchor.setTo(0.5, 0.5);
}

function update() {
    score_text.text = "Score : " + score;
}

function launch() {
    var mole = get_random_mole();
    if(mole) {
        mole.appear();
        mole.timer.start();
    }
}

function get_random_mole() {
    var group = new Array();

    moles.forEach(function(mole) {
        if(mole.sprite.visible == false) {
            group.push(mole);
        }
    });

    if(group.length > 0) {
        var num = game.rnd.integerInRange(0, group.length - 1);
        return group[num];
    }
}

function debug() {
    game.debug.spriteBounds(mole.sprite);
}

function setup_grid() {
    grid = game.add.group();

    for (var i = 0; i < LINE; i++) {
        for (var j = 0; j < COLUMN; j++) {
            var sprite = game.add.sprite((i * HOLE_WIDTH + i * 10) + 200,
                                         (j * HOLE_HEIGHT + j * 10) + 80,
                                         'hole');
        }
    }
}

function create_moles() {
    for (var i = 0; i < LINE; i++) {
        for (var j = 0; j < COLUMN; j++) {
            mole = new Mole((i * HOLE_WIDTH  + i * 10) + 205,
                            (j * HOLE_HEIGHT + j * 10) + 70,
                            1500);
            moles.push(mole);
        }
    }
}
