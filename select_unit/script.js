var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('phaser', 'sprites/phaser-dude.png');
    game.load.image('atari', 'sprites/atari800.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;
    var g = game.add.group();

    var sprite = game.add.sprite(200, 200, 'phaser');
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(select_unit, this);
    
    var circle = game.add.graphics(0, 0);
    circle.lineStyle(2, 0xffffff, 1);
    circle.drawCircle(sprite.x + sprite.width/2, sprite.y + sprite.height/2, sprite.height);
    circle.alpha = 0;
    
    g.add(circle);
    g.add(sprite);

    var y = game.add.group();

    var sprite = game.add.sprite(500, 200, 'atari');
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(select_unit, this);
    
    var circle = game.add.graphics(0, 0);
    circle.lineStyle(2, 0xffffff, 1);
    circle.drawCircle(sprite.x + sprite.width/2, sprite.y + sprite.height/2, sprite.width);
    circle.alpha = 0;
    
    y.add(circle);
    y.add(sprite);
}

function update() {
}

function select_unit(sprite) {
    circle = sprite.parent.children[0];
    console.log(circle);
    if(circle.alpha == 0) {
        circle.alpha = 1;
    } else {
        circle.alpha = 0;
    }
}