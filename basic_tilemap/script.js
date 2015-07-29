var game = new Phaser.Game(700, 700, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    game.load.tilemap('map', '../assets/maps/basic_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grassCenter', '../assets/images/grassCenter.png');
    game.load.image('player', '../assets/images/playerBlue0.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x2c3e50;

    map = game.add.tilemap('map');
    map.addTilesetImage('grassCenter');
    map.setCollision(1);

    layer = map.createLayer('layer1');

    layer.debug = true;
    // layer.resizeWorld();

    player = game.add.sprite(100, 100, 'player');
    game.physics.enable(player);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.arcade.collide(player, layer);

    if (cursors.up.isDown) {
        player.body.velocity.y = -200;
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 200;
    }

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
    }
}
