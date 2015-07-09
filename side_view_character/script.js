var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

/*
RESSOURCES :
http://rotates.org/phaser/xv/
http://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
*/

var PI = 3.14159265359;

function preload() {
}

function create() {
    game.stage.backgroundColor = 0x2c3e50;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 0;

    var body_texture = game.add.bitmapData(128, 256);
    body_texture.ctx.beginPath();
    body_texture.ctx.rect(0,0,128,256);
    body_texture.ctx.fillStyle = "#2980b9";
    body_texture.ctx.fill();
    player = game.add.sprite(150, 200, body_texture);

    var arm_texture = game.add.bitmapData(64, 128);
    arm_texture.ctx.beginPath();
    arm_texture.ctx.rect(0, 0, 64, 128);
    arm_texture.ctx.fillStyle = "#27ae60";
    arm_texture.ctx.fill();
    arm = game.add.sprite(player.x + (player.width / 2),
                          player.y + (player.height / 3),
                          arm_texture);
    arm.anchor.set(0.5, 0);

    arm.angle = -90;
}

function update() {

    // arm rotation
    mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/PI)) - 86;
    arm.angle = mouse_angle;
    /*
    if(mouse_angle < 10 && mouse_angle > -180) {
        arm.angle = mouse_angle;
    }
    */

    // gun position and rotation
    game.debug.pixel(arm.x, arm.y, 'yellow');
    // point to the hand
    next_x = arm.x + arm.height * Math.cos(arm.rotation + 1.57);
    next_y = arm.y + arm.height * Math.sin(arm.rotation + 1.57);
    game.debug.pixel(next_x, next_y, 'blue')
}