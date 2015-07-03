var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var collisionCircle;

/*
    TO DO :
    Move to player whean player enter in aggro
    http://www.html5gamedevs.com/topic/4826-help-arcade-physics-with-p2-objects/?p=29613

    Move radius with baddy
    Create generic baddy class

    Aggro zone of zombies
    Zombie motion path
    Map imported from Tiled (object containing data ? like key)
    (One item at a time, picked up on overlap)
    Transition between maps like Zelda
*/

function preload() {
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 0;

    game.stage.backgroundColor = 0x2c3e50;

    add_safe_zone();
    add_enemies();
    add_player();

    // game.physics.p2.enable(player, true);
    game.physics.p2.enable(player);
    player.body.fixedRotation = true;
    player.name = "player";
    player.body.collideWorldBounds = true;

    // game.physics.p2.enable(baddy, true);
    game.physics.p2.enable(baddy);
    //baddy.body.fixedRotation = true;
    baddy.name = "baddy";
    baddy.body.collideWorldBounds = true;

    // game.physics.p2.enable(baddy_radius, true);
    game.physics.p2.enable(baddy_radius, true);
    baddy_radius.name = "baddy_radius";
    baddy_radius.body.setCircle(200);
    baddy_radius.body.fixedRotation = true;

    game.physics.p2.setPostBroadphaseCallback(checkOverlap, this);
}

function checkOverlap(body1, body2) {
    if (body1.sprite.name === 'player' && body2.sprite.name === 'baddy_radius') {
        moveBaddy(baddy);
        return false;
    }
    if (body1.sprite.name === 'baddy_radius' && body2.sprite.name === 'player') {
        moveBaddy(baddy);
        return false;
    }
    if ((body1.sprite.name === 'baddy' && body2.sprite.name === 'baddy_radius') ||
        (body1.sprite.name === 'baddy_radius' && body2.sprite.name === 'baddy')){
        return false;
    }
    if ((body1.sprite.name === 'baddy' && body2.sprite.name === 'player') ||
        (body1.sprite.name === 'player' && body2.sprite.name === 'baddy')){
        return true;
    }
    return true;
}

function update() {
    player.body.setZeroVelocity();

    baddy_radius.body.x = baddy.body.x;
    baddy_radius.body.y = baddy.body.y;

    if (cursors.left.isDown) {
        player.body.moveLeft(300);
    }
    if (cursors.right.isDown) {
        player.body.moveRight(300);
    }
    if (cursors.up.isDown) {
        player.body.moveUp(300);
    }
    if (cursors.down.isDown) {
        player.body.moveDown(300);
    }
}

function moveBaddy (baddy) {
     accelerateToObject(baddy, player, 100);
}

function accelerateToObject(obj1, obj2, speed) {
    console.log(obj1);
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);
    obj1.body.force.x = Math.cos(angle) * speed;
    obj1.body.force.y = Math.sin(angle) * speed;
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

    baddy_radius.x = baddy.x;
    baddy_radius.y = baddy.y;
}