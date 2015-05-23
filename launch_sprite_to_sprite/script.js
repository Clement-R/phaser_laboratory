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
    b_word = game.add.bitmapText(350, 10, 'carrier_command', 'FUCK', 17);
    g_word = game.add.bitmapText(350, 400, 'carrier_command', 'PEACE', 17);

    game.physics.arcade.enable([b_word, g_word]);

    b_word.body.collideWorldBounds = true;
    g_word.body.collideWorldBounds = true;
    launch_word();
}

function update() {
    game.physics.arcade.collide(b_word, g_word, function(){
        b_word.kill();
        g_word.kill();
    });
}

function launch_word(word) {
    b_word.body.velocity.setTo(0, 500);
}