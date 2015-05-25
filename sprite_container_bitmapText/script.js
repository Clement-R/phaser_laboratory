var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
var s;
function preload() {
    game.load.bitmapFont('carrier_command',
                         '../assets/fonts/carrier_command.png',
                         '../assets/fonts/carrier_command.xml');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x337799;
    create_controls();

    s = game.add.sprite(200, 10);
    s_1 = game.add.sprite(350, 450);

    game.physics.arcade.enable([s, s_1]);

    add_word('FUCK', s);
    add_word('PEACE', s_1);
}

function update() {
    if(s.exists && s_1.exists) {
        if(checkOverlap(s, s_1)) {
            s.destroy();
            s_1.destroy();
        }
    }

    if(spacebar.isDown){
        game.physics.arcade.moveToObject(s_1, s, 1, 80);    
    }
}

function add_word(word, sprite) {
    var font_size = 17;
    var width = 0;

    for(var i = 0; i < word.length; i++) {
        var letter = word[i];
        width += 20;
        sprite.addChild(game.add.bitmapText((20 * i), 0,
                       'carrier_command', letter, font_size));
    };

    sprite.is_launched = false;
    sprite.body.setSize(width, font_size, 0, 0);
}

function checkOverlap(entity_a, entity_b) {
    var bounds_a = entity_a.getBounds();
    var bounds_b = entity_b.getBounds();

    return Phaser.Rectangle.intersects(bounds_a, bounds_b);
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
