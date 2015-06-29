var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var collisionCircle;

function preload() {
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;

    game.stage.backgroundColor = 0x2c3e50;

    add_safe_zone();
    add_enemies();
    add_player();

    game.physics.p2.enable(player);
    player.body.fixedRotation = true;
    game.physics.p2.enable(baddy);
    baddy.body.fixedRotation = true;

    game.physics.p2.enable(baddy_radius);
    baddy_radius.body.setCircle(45);
    baddy_radius.body.fixedRotation = true;

    game.physics.p2.setPostBroadphaseCallback(checkOverlap, this);
}

function checkOverlap(body1, body2) {
    /*console.log(body1);
    console.log(body2);*/
    if ((body1.sprite.name === 'player' && body2.sprite.name === 'baddy_radius')){
        return false;
    }
    return true;
}

function update() {
    player.body.setZeroVelocity();

    if (cursors.left.isDown) {
        player.body.moveLeft(400);
    }
    if (cursors.right.isDown) {
        player.body.moveRight(400);
    }
    if (cursors.up.isDown) {
        player.body.moveUp(400);
    }
    if (cursors.down.isDown) {
        player.body.moveDown(400);
    }
}

function add_safe_zone() {
    var safe_texture = game.add.bitmapData(128, 128);
    safe_texture.ctx.beginPath();
    safe_texture.ctx.rect(0,0,128,128);
    safe_texture.ctx.fillStyle = '#ffffff';
    safe_texture.ctx.fill();
    safe_zone = game.add.sprite(500, 320, safe_texture);
}

function add_player() {
    var player_texture = game.add.bitmapData(32, 32);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,32,32);
    player_texture.ctx.fillStyle = '#0088dd';
    player_texture.ctx.fill();

    player = game.add.sprite(520, 340, player_texture);
    /*player.body.collideWorldBounds = true;
    player.body.maxVelocity.y = 500;*/
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
}

function add_enemies() {

    var radius = game.add.bitmapData(300, 300);

    baddy_radius = game.add.sprite(0, 0, radius);
    baddy_radius.anchor.setTo(0.5, 0.5);


    var baddies_texture = game.add.bitmapData(32, 32);
    baddies_texture.ctx.beginPath();
    baddies_texture.ctx.rect(0,0,32,32);
    baddies_texture.ctx.fillStyle = '#dd0000';
    baddies_texture.ctx.fill();

    baddy = game.add.sprite(150, 150, baddies_texture);
    /*baddy.body.collideWorldBounds = true;
    baddy.body.maxVelocity.y = 500;*/

    baddy_radius.x = baddy.x + (baddy.width / 2);
    baddy_radius.y = baddy.y + (baddy.height / 2);
}