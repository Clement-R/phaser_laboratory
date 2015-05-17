var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.image('diglett', '../assets/images/diglett.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;
    mole = new Mole();
    mole.sprite.height = 0;
    mole.sprite.y = 250;

    mole.appear();
}

function update() {
}

function Mole(x, y) {
    x = x || 100;
    y = y || 100;
    this.sprite = game.add.sprite(x, y, 'diglett');

    this.visible = true;
}

Mole.prototype.disapear = function() {
    var mole_h = game.add.tween(this.sprite).to({y: 250});
    var mole_x = game.add.tween(this.sprite).to({height: 0});
    mole_x.onComplete.add(function(){
        this.appear();
    }, this);
    mole_x.start();
    mole_h.start();
};

Mole.prototype.appear = function() {
    var default_height = game.cache.getImage("diglett").height;
    var mole_h = game.add.tween(this.sprite).to({y: 100}, 700);
    var mole_x = game.add.tween(this.sprite).to({height: default_height}, 700);
    mole_x.onComplete.add(function(){
        this.visible = false;
    }, this);
    mole_x.start();
    mole_h.start();
};