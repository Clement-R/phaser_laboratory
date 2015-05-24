var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.bitmapFont('carrier_command',
                         '../assets/fonts/carrier_command.png',
                         '../assets/fonts/carrier_command.xml');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    create_controls();

    game.stage.backgroundColor = 0x337799;

    good_words_g = game.add.group();
    bad_words_g = game.add.group();

    /*b_word = game.add.bitmapText(150, 10, 'carrier_command', '', 17);
    g_word = game.add.bitmapText(350, 400, 'carrier_command', '', 17);*/

    /*g_word.is_launched = false;
    game.physics.arcade.enable([b_word, g_word]);

    b_word.body.collideWorldBounds = true;
    g_word.body.collideWorldBounds = true;*/

    add_word('PEACE', 350, 400, good_words_g)
    add_word('FUCK', 350, 10, bad_words_g)
}

function update() {
    /*game.physics.arcade.collide(b_word, g_word, function(){
        b_word.kill();
        g_word.kill();
    });*/

    // game.physics.arcade.overlap(bullets, veggies, collisionHandler, null, this);

    bad_words_g.forEach(function(b_word){
        b_word.y += 3;
        good_words_g.forEach(function(g_word){
            if (checkOverlap(b_word, g_word)) {
                b_word.destroy();
                g_word.destroy();
            } else {
                //
            }
        });
    });
    

    /*bad_words_g.forEach(function(b_word){
        b_word.body.velocity.setTo(0, 50);
    });*/

    /*if(g_word.is_launched) {
        game.physics.arcade.moveToObject(g_word, b_word, 1, 90);
    }

    if(spacebar.isDown){
        launch_word(g_word);
    }*/
}

/*function collisionHandler (bullet, veg) {
    bullet.kill();
    veg.kill();
}*/

function launch_word(word) {
    g_word.is_launched = true;
}

function add_word(word_s, x, y, words_group) {
    var word = game.add.group();

    for (var i = 0; i < word_s.length; i++) {
        var letter = word_s[i];
        word.add(game.add.bitmapText(x + (20 * i), y, 'carrier_command', letter, 17));    
    };
    words_group.add(word);
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function checkOverlap(sprite_a, sprite_b) {
    var bounds_a = sprite_a.getBounds();
    var bounds_b = sprite_b.getBounds();

    return Phaser.Rectangle.intersects(bounds_a, bounds_b);
}