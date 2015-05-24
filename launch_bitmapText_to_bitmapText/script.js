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
    b_word = game.add.bitmapText(150, 10, 'carrier_command', 'FUCK', 17);
    g_word = game.add.bitmapText(350, 400, 'carrier_command', 'PEACE', 17);
    g_word.is_launched = false;
    game.physics.arcade.enable([b_word, g_word]);

    b_word.body.collideWorldBounds = true;
    g_word.body.collideWorldBounds = true;
}

function update() {
    game.physics.arcade.collide(b_word, g_word, function(){
        b_word.kill();
        g_word.kill();
    });

    b_word.body.velocity.setTo(0, 100);

    if(g_word.is_launched) {
        game.physics.arcade.moveToObject(g_word, b_word, 5, 100);
    }

    if(spacebar.isDown){
        launch_word(g_word);
    }
}

function launch_word(word) {
    // Calculate distance between the two words
    g_word.body.velocity.setTo(0, -500);
    g_word.is_launched = true;
}

function create_controls() {
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
