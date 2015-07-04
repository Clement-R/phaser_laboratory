var game = new Phaser.Game(800, 400, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

var player;
var jumpTimer = 0;
var jumpButton;
var jump = 0;
var speed = 1;
var powers = {
    'maxJump': 1,
    'sprint': 0
};

function preload() {
}

/* IDEAS

   getPowerUp(power_up_name) that search in a json of power up
*/

function create() {
    game.world.setBounds(0, 0, 1900, 400);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x2c3e50;

    game.physics.arcade.gravity.y = 1000;

    // Player
    var player_texture = game.add.bitmapData(32, 32);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,32,32);
    player_texture.ctx.fillStyle = '#00eeff';
    player_texture.ctx.fill();

    player = game.add.sprite(32, 320, player_texture);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.maxVelocity.y = 500;
    //player.body.setSize(20, 32, 5, 16);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    // Wall
    var wall_t = game.add.bitmapData(32, 256);
    wall_t.ctx.beginPath();
    wall_t.ctx.rect(0,0,32,256);
    wall_t.ctx.fillStyle = '#33aa00';
    wall_t.ctx.fill();
    wall = game.add.sprite(700, 320, wall_t);
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.collideWorldBounds = true;
    wall.body.immovable = true;
    wall.body.allowGravity = true;

    var wall_t_2 = game.add.bitmapData(32, 128);
    wall_t_2.ctx.beginPath();
    wall_t_2.ctx.rect(0,0,32,128);
    wall_t_2.ctx.fillStyle = '#33aa00';
    wall_t_2.ctx.fill();
    wall_1 = game.add.sprite(500, 320, wall_t_2);
    game.physics.enable(wall_1, Phaser.Physics.ARCADE);
    wall_1.body.collideWorldBounds = true;
    wall_1.body.immovable = true;
    wall_1.body.allowGravity = true;


    // Power ups
    var power_up_texture = game.add.bitmapData(32, 32);
    power_up_texture.ctx.beginPath();
    power_up_texture.ctx.rect(0,0,32,32);
    power_up_texture.ctx.fillStyle = '#ff0099';
    power_up_texture.ctx.fill();
    power_up_1 = game.add.sprite(400, 320, power_up_texture);
    game.physics.enable(power_up_1, Phaser.Physics.ARCADE);
    power_up_1.body.collideWorldBounds = true;
    power_up_1.body.maxVelocity.y = 500;
    power_up_1.type = 'maxJump';

    power_up_3 = game.add.sprite(620, 320, power_up_texture);
    game.physics.enable(power_up_3, Phaser.Physics.ARCADE);
    power_up_3.body.collideWorldBounds = true;
    power_up_3.body.maxVelocity.y = 500;
    power_up_3.type = 'maxJump';

    power_up_2 = game.add.sprite(250, 320, power_up_texture);
    game.physics.enable(power_up_2, Phaser.Physics.ARCADE);
    power_up_2.body.collideWorldBounds = true;
    power_up_2.body.maxVelocity.y = 500;
    power_up_2.type = 'sprint';

    jumpButton.onDown.add(function(){
        if(jump < powers['maxJump']){
            player.body.velocity.y = -500;
            jump += 1;
        }
    });

    game.camera.follow(player);
}

function update() {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150 * speed;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150 * speed;
    }

    if(sprintButton.isDown) {
        if(powers['sprint'] == 1) {
            speed = 2;
        }
    } else {
        speed = 1;
    }

    if(player.body.onFloor()) {
        jump = 0;
    }

    game.physics.arcade.collide(player, wall, wall_collide);
    game.physics.arcade.collide(player, wall_1, wall_collide);

    if(power_up_1 || power_up_2 || power_up_3) {
        game.physics.arcade.collide(player, power_up_1, getPowerUp);
        game.physics.arcade.collide(player, power_up_2, getPowerUp);
        game.physics.arcade.collide(player, power_up_3, getPowerUp);
    }

    if(player.body.touching.down) {
        jump = 0;
    }

    if(player.body.touching.left || player.body.touching.right) {
        player.body.velocity.y = player.body.velocity.y * 0.5;
        jump = 0;
    }
}

function render () {
    game.debug.bodyInfo(player, 16, 24);
}

function wall_collide(player, wall) {
}

function getPowerUp(player, power_up) {
    powers[power_up.type] += 1;
    power_up.kill();
}

var Player = function() {
}

Player.prototype.getPowerUp = function() {
}