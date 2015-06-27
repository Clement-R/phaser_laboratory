var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x2c3e50;

    add_safe_zone();
    add_enemies();
    add_player();
}

function update() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
    }
    if (cursors.right.isDown) {
        player.body.velocity.x = 150;
    }
    if (cursors.up.isDown) {
        player.body.velocity.y = -150;
    }
    if (cursors.down.isDown) {
        player.body.velocity.y = 150;
    }

    // Player in enemy radius
    if (game.physics.arcade.overlap(player, baddy_radius)) {
        game.physics.arcade.moveToObject(baddy, player);
    } else {
        baddy.body.velocity.x = 0;
        baddy.body.velocity.y = 0;
    }

    baddy_radius.x = baddy.x + (baddy.width / 2);
    baddy_radius.y = baddy.y + (baddy.height / 2);
}

function add_safe_zone() {
    var safe_texture = game.add.bitmapData(128, 128);
    safe_texture.ctx.beginPath();
    safe_texture.ctx.rect(0,0,128,128);
    safe_texture.ctx.fillStyle = '#ffffff';
    safe_texture.ctx.fill();
    safe_zone = game.add.sprite(500, 320, safe_texture);

    game.physics.enable(safe_zone, Phaser.Physics.ARCADE);
}

function add_player() {
    var player_texture = game.add.bitmapData(32, 32);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,32,32);
    player_texture.ctx.fillStyle = '#0088dd';
    player_texture.ctx.fill();

    player = game.add.sprite(520, 340, player_texture);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.maxVelocity.y = 500;
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
}

function add_enemies() {

    var radius = game.add.bitmapData(300, 300);
    radius.circle(150, 150, 100, 'rgb(0,200,0)');

    baddy_radius = game.add.sprite(0, 0, radius);
    game.physics.enable(baddy_radius, Phaser.Physics.ARCADE);
    baddy_radius.anchor.setTo(0.5, 0.5);


    var baddies_texture = game.add.bitmapData(32, 32);
    baddies_texture.ctx.beginPath();
    baddies_texture.ctx.rect(0,0,32,32);
    baddies_texture.ctx.fillStyle = '#dd0000';
    baddies_texture.ctx.fill();

    baddy = game.add.sprite(50, 50, baddies_texture);
    game.physics.enable(baddy, Phaser.Physics.ARCADE);
    baddy.body.collideWorldBounds = true;
    baddy.body.maxVelocity.y = 500;

    baddy_radius.x = baddy.x + (baddy.width / 2);
    baddy_radius.y = baddy.y + (baddy.height / 2);
}