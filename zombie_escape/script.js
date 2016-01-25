var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});
/*
    TO DO :
    Move to player when player enter in aggro
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
    game.stage.backgroundColor = 0x2c3e50;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    add_safe_zone();
    add_enemies();
    add_player();
}

function update() {
    if (cursors.left.isDown) {
        player.x -= 2;
    }
    if (cursors.right.isDown) {
        player.x += 2;
    }
    if (cursors.up.isDown) {
        player.y -= 2;
    }
    if (cursors.down.isDown) {
        player.y += 2;
    }

    baddy.aggro();
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
    player.anchor.setTo(0.5, 0.5);
    cursors = game.input.keyboard.createCursorKeys();
}

function add_enemies() {
    var baddies_texture = game.add.bitmapData(32, 32);
    baddies_texture.ctx.beginPath();
    baddies_texture.ctx.rect(0,0,32,32);
    baddies_texture.ctx.fillStyle = '#dd0000';
    baddies_texture.ctx.fill();

    baddy = game.add.sprite(150, 150, baddies_texture);
    baddy.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(baddy, Phaser.Physics.ARCADE);

    baddy.aggro = function() {
        var distance = Math.sqrt(Math.pow((player.x - baddy.x), 2) + Math.pow((player.y - baddy.y), 2));
        if(distance <= 150) {
            console.log("BRAIN !");
            game.physics.arcade.moveToObject(baddy,
                                             player,
                                             5,
                                             1000);
        }
    };
}