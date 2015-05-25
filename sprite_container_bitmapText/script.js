var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var s;
function preload() {
    game.load.bitmapFont('carrier_command',
                         '../assets/fonts/carrier_command.png',
                         '../assets/fonts/carrier_command.xml');
}

function create() {
    game.stage.backgroundColor = 0x337799;
    s = game.add.sprite(350, 10);
    add_word('PEACE', s);
}

function update() {
    game.debug.spriteBounds(s);
}

function add_word(word, sprite) {
    var font_size = 17;

    for(var i = 0; i < word.length; i++) {
        var letter = word[i];
        sprite.addChild(game.add.bitmapText((20 * i), 0,
                       'carrier_command', letter, font_size));
    };

    sprite.is_launched = false;
}