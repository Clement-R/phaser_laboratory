var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           {preload: preload, create: create, update: update});

/*
RESSOURCES :
http://rotates.org/phaser/xv/
http://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
*/

/*
IDEAS :
Flip character when angle is blocked
*/

var PI = 3.14159265359;
var BULLET_SPEED = 50;

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

    var gun_texture = game.add.bitmapData(32, 96);
    gun_texture.ctx.beginPath();
    gun_texture.ctx.rect(0, 0, 32, 96);
    gun_texture.ctx.fillStyle = "#f39c12";
    gun_texture.ctx.fill();
    var hand_anchor = get_hand_anchor();
    gun = game.add.sprite(hand_anchor.x,
                          hand_anchor.y,
                          gun_texture);
    gun.angle = arm.angle;
    gun.anchor.set(0.5, 0);

    create_bullets();
}

function update() {
    // arm rotation
    mouse_angle = (game.physics.arcade.angleToPointer(arm) * (180/PI)) - 86;
    if(mouse_angle < 10 && mouse_angle > -180) {
        arm.angle = mouse_angle;
    }

    // Place gun and make it rotate to follow the arm
    var p = get_hand_anchor();
    gun.angle = arm.angle;
    gun.x = p.x;
    gun.y = p.y;

    fire();

    /* ** DEBUG ** */
    // gun position and rotation
    game.debug.pixel(arm.x, arm.y, 'yellow');
    // placing gun in the hand
    game.debug.pixel(p.x, p.y, 'red');
    // Place bullet
    cannon_x = gun.x + gun.height * Math.cos(arm.rotation + 1.57);
    cannon_y = gun.y + gun.height * Math.sin(arm.rotation + 1.57);
    game.debug.pixel(cannon_x, cannon_y, 'white');

    x = gun.x + 2 * (gun.height / 3) * Math.cos(arm.rotation + 1.57);
    y = gun.y + 2 * (gun.height / 3) * Math.sin(arm.rotation + 1.57);
    game.debug.pixel(x, y, 'gray');
    /* ** DEBUG ** */
}

function get_hand_anchor() {
    next_x = arm.x + arm.height * Math.cos(arm.rotation + 1.57);
    next_y = arm.y + arm.height * Math.sin(arm.rotation + 1.57);
    var point = new Phaser.Point(next_x, next_y);
    return point;
}

function create_bullets() {
    FIRERATE = 400;
    bullet_DAMAGE = 10;
    is_ready_to_fire = true;
    last_shot = 0;

    var bullet_texture = game.add.bitmapData(16, 32);
    bullet_texture.ctx.beginPath();
    bullet_texture.ctx.rect(0, 0, 16, 32);
    bullet_texture.ctx.fillStyle = "#f1c40f";
    bullet_texture.ctx.fill();

    bullets = game.add.group()
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(100, bullet_texture);

    bullets.forEach(function(bullet){
        bullet.damage = bullet_DAMAGE;
        bullet.body.gravity.allowGravity = false;
        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;
        bullet.anchor.set(0.5, 0.5);
    }, this);
}

function fire() {
    if(game.input.activePointer.isDown && is_ready_to_fire) {
        if(bullets.getFirstExists(false)) {
            bullet = bullets.getFirstExists(false);

            // Place bullet
            cannon_x = gun.x + gun.height * Math.cos(arm.rotation + 1.57);
            cannon_y = gun.y + gun.height * Math.sin(arm.rotation + 1.57);

            // Set the bullet position to the gun position
            bullet.reset(cannon_x - bullet.height, cannon_y);
            bullet.angle = gun.angle;

            // Shoot it in the right direction
            bullet.body.velocity.x = Math.cos(bullet.rotation) * BULLET_SPEED;
            bullet.body.velocity.y = Math.sin(bullet.rotation) * BULLET_SPEED;

            is_ready_to_fire = false;
            last_shot = game.time.now;
        }
    }

    // Fire cooldown checker
    if(game.time.now > last_shot + FIRERATE) {
        is_ready_to_fire = true;
    }
}