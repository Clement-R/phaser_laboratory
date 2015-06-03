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
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x2c3e50;

    game.physics.arcade.gravity.y = 1000;

    var player_texture = game.add.bitmapData(64, 64);
    player_texture.ctx.beginPath();
    player_texture.ctx.rect(0,0,32,32);
    player_texture.ctx.fillStyle = '#00eeff';
    player_texture.ctx.fill();

    player = game.add.sprite(32, 320, player_texture);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.maxVelocity.y = 500;
    player.body.setSize(20, 32, 5, 16);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    sprintButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    var power_up_texture = game.add.bitmapData(64, 64);
    power_up_texture.ctx.beginPath();
    power_up_texture.ctx.rect(0,0,32,32);
    power_up_texture.ctx.fillStyle = '#ff0099';
    power_up_texture.ctx.fill();
    power_up_1 = game.add.sprite(400, 320, power_up_texture);
    game.physics.enable(power_up_1, Phaser.Physics.ARCADE);
    power_up_1.body.collideWorldBounds = true;
    power_up_1.body.maxVelocity.y = 500;
    power_up_1.body.setSize(20, 32, 5, 16);
    power_up_1.type = 'maxJump';

    power_up_3 = game.add.sprite(620, 320, power_up_texture);
    game.physics.enable(power_up_3, Phaser.Physics.ARCADE);
    power_up_3.body.collideWorldBounds = true;
    power_up_3.body.maxVelocity.y = 500;
    power_up_3.body.setSize(20, 32, 5, 16);
    power_up_3.type = 'maxJump';

    power_up_2 = game.add.sprite(250, 320, power_up_texture);
    game.physics.enable(power_up_2, Phaser.Physics.ARCADE);
    power_up_2.body.collideWorldBounds = true;
    power_up_2.body.maxVelocity.y = 500;
    power_up_2.body.setSize(20, 32, 5, 16);
    power_up_2.type = 'sprint';

    jumpButton.onDown.add(function(){
        if(jump < powers['maxJump']){
            player.body.velocity.y = -500;
            jump += 1;
        }
    });
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

    if(power_up_1 || power_up_2 || power_up_3) {
        game.physics.arcade.collide(player, power_up_1, getPowerUp);
        game.physics.arcade.collide(player, power_up_2, getPowerUp);
        game.physics.arcade.collide(player, power_up_3, getPowerUp);
    }
}

function render () {
    game.debug.bodyInfo(player, 16, 24);
}

function getPowerUp(player, power_up) {
    powers[power_up.type] += 1;
    power_up.kill();
}

var Player = function() {

}

Player.prototype.getPowerUp = function() {

}