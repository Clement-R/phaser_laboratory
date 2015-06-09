var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var counter = 0;
var sprites = [];
function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;
    game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var player_texture = game.add.bitmapData(4, 4);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,4,4);
    player_texture.ctx.fillStyle = '#eedd00';
    player_texture.ctx.fill();

    game.cache.addBitmapData('player_texture', player_texture);

    game.input.onDown.add(add_soldier, this);
}

function update() {
    game.debug.text(game.time.fps, 15, 15);
    sprites.forEach(function(sprite){
        sprite.x += game.rnd.integerInRange(-50, 50);
        sprite.y += game.rnd.integerInRange(-50, 50);
    });
}

function add_soldier() {
    for (var i = 0; i < 100; i++) {
        var sprite = game.add.sprite(game.world.randomX,
                                 game.world.randomY,
                                 game.cache.getBitmapData('player_texture'));
        counter += 1;
        game.physics.arcade.enable(sprite);
        sprite.body.collideWorldBounds = true;
        sprites.push(sprite);
    };
    console.log(counter);
}