var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
    /* Character parts */
    // game.load.image('player', '../assets/images/friendly_fire/player.png');
    // game.load.image('arm', '../assets/images/friendly_fire/arm.png');
    game.load.image('player', '../assets/images/body.png');
    game.load.image('arm', '../assets/images/arm.png');
    game.load.image('legs', '../assets/images/legs.png');
    game.load.image('head', '../assets/images/head.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x2c3e50;

    player = game.add.sprite(100, 100, 'player');

    head = game.add.sprite(player.width / 2,
                           0,
                           'head');
    head.anchor.setTo(0.5, 1);

    arm = game.add.sprite(player.width / 2,
                          player.height / 6,
                          'arm');
    arm.anchor.setTo(0.5, 0);
    arm.angle = -90;

    legs = game.add.sprite(player.width / 2,
                           player.height,
                           'legs');
    legs.anchor.setTo(0.5, 0);

    player.addChild(head);
    player.addChild(arm);
    player.addChild(legs);

    cursors = game.input.keyboard.createCursorKeys();

    // player.scale.setTo(0.25, 0.25);
    game.physics.enable(player);
}

function update() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    /* Player movement */
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

    /* Arm rotation */
    // mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/Math.PI)) - 88;
    console.log(game.physics.arcade.angleToPointer(arm) * (180/Math.PI) - 88);
    arm.rotation = game.physics.arcade.angleToPointer(player) - (Math.PI / 2);
}
