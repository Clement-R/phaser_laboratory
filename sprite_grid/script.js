var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var block_x = 10;
var block_y = 7;
var block_width = 64;
var block_height = 64;
var margin_y = 10;
var margin_x = 27;

function preload() {
    game.load.image('star', '../assets/images/starGold.png');
}

function create() {
    game.stage.backgroundColor = 0x337799;

    game.world.width / block_width;

    var grid = game.add.group();
    for (var i = 0; i < block_x; i++) {
        for (var j = 0; j < block_y; j++) {
            sprite = game.add.sprite((i * block_width) + margin_y,
                            (j * block_height) + margin_x,
                            'star');
            grid.add(sprite);
        };
    };

    grid.forEach(function(sprite){
    }, this);
}

function update() {
}
