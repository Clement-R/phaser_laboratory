var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.bitmapFont('carrier_command',
                         '../assets/fonts/carrier_command.png',
                         '../assets/fonts/carrier_command.xml');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x337799;
    create_controls();

    good_words_g = game.add.group();
    bad_words_g = game.add.group();
    
    good_word = game.add.sprite(350, 400);
    bad_word = game.add.sprite(200, 10);

    game.physics.arcade.enable([good_word, bad_word]);

    add_word('PEACE', good_word);
    add_word('FUCK', bad_word);
}

function update() {
    bad_words_g.forEach(function(b_word){
        // b_word.y += 3;
    });

    good_words_g.forEach(function(g_word){
        if(g_word.is_launched) {
            // TODO : get closest b_word
            var b_word = bad_words_g.getFirstAlive();
            // game.physics.arcade.moveToObject(g_word, b_word, 1, 90);
        }
    });

    bad_words_g.forEach(function(b_word){
        good_words_g.forEach(function(g_word){
            if(checkOverlap(b_word, g_word)) {
                if(game.time.totalElapsedSeconds() > 1) {
                    b_word.destroy();
                    g_word.destroy();
                }
            }
        });
    });

    //game.physics.arcade.moveToObject(g_word, b_word, 1, 90);

    // if(g_word.is_launched) {
    //     game.physics.arcade.moveToObject(g_word, b_word, 1, 90);
    // }

    if(spacebar.isDown){
        var w = good_words_g.getFirstAlive();
        launch_word(w);
    }
}

function launch_word(word) {
    word.is_launched = true;
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

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function checkOverlap(entity_a, entity_b) {
    var bounds_a = entity_a.getBounds();
    var bounds_b = entity_b.getBounds();

    return Phaser.Rectangle.intersects(bounds_a, bounds_b);
}
