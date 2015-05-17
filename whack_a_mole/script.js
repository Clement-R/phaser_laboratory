var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var grid;
var LINE = 3;
var COLUMN = 3;
var moles_number = LINE * COLUMN;
var HOLE_WIDTH = 128;
var HOLE_HEIGHT = 128;
var moles = new Array();

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
    moles.forEach(function(mole){
        if(mole.sprite.visible == false && mole.is_moving == false) {
            mole.appear();
        }
    });
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

/* MOLE CLASS */
function Mole(x, y) {
    x = x || 100;
    y = y || 100;

    this.base_x = x;
    this.base_y = y;
    this.default_height = game.cache.getImage("diglett").height;

    this.sprite = game.add.sprite(x, y + 120, 'diglett');
    this.sprite.visible = false;
    this.sprite.height = 0;
    this.is_moving = false;
}

Mole.prototype.disapear = function() {
    this.sprite.visible = true;
    this.is_moving = true;

    var mole_h = game.add.tween(this.sprite).to({y: 250});
    var mole_x = game.add.tween(this.sprite).to({height: 0});
    mole_x.onComplete.add(function(){
        this.is_moving = false;
    }, this);

    mole_x.start();
    mole_h.start();
};

Mole.prototype.appear = function() {
    this.sprite.visible = true;
    this.is_moving = true;

    
    var mole_h = game.add.tween(this.sprite).to({y: this.base_y}, 700);
    var mole_x = game.add.tween(this.sprite).to({height: this.default_height}, 700);
    mole_x.onComplete.add(function(){
        this.is_moving = false;
    }, this);

    mole_x.start();
    mole_h.start();
};